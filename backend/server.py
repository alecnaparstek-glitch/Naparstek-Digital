from fastapi import FastAPI, APIRouter, HTTPException, Request, Depends
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import ipaddress
import logging
import httpx
import bcrypt
import jwt
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Email (Emergent managed Resend)
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "Naparstek Digital")
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")
OWNER_EMAIL = os.environ.get("OWNER_EMAIL")

# Auth
JWT_SECRET = os.environ["JWT_SECRET"]
JWT_ALGORITHM = "HS256"
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "admin@example.com").lower()
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "admin123")

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# ---------------- Auth helpers ----------------
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))
    except Exception:
        return False


def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "role": "admin",
        "exp": datetime.now(timezone.utc) + timedelta(days=7),
        "type": "access",
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


async def get_current_admin(request: Request) -> dict:
    auth_header = request.headers.get("Authorization", "")
    token = auth_header[7:] if auth_header.startswith("Bearer ") else None
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Session expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = await db.users.find_one({"id": payload.get("sub")}, {"_id": 0, "password_hash": 0})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user


# ---------------- Email guardrail gate ----------------
_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: str | None = None) -> str | None:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to or EMAIL_REPLY_TO:
        payload["contact_email"] = reply_to or EMAIL_REPLY_TO
    async with httpx.AsyncClient(timeout=30) as http_client:
        resp = await http_client.post(
            f"{EMAIL_BASE_URL}/api/v1/email/send",
            headers={"X-Email-Key": EMAIL_KEY},
            json=payload,
        )
    resp.raise_for_status()
    return resp.json().get("id")


# ---------------- Models ----------------
class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class InquiryCreate(BaseModel):
    name: str
    business_name: Optional[str] = ""
    email: EmailStr
    phone: Optional[str] = ""
    current_website: Optional[str] = ""
    need: Optional[str] = ""
    budget: Optional[str] = ""
    message: str


class Inquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    business_name: str = ""
    email: str
    phone: str = ""
    current_website: str = ""
    need: str = ""
    budget: str = ""
    message: str
    read: bool = False
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class ReadUpdate(BaseModel):
    read: bool


def _inquiry_email_html(inq: Inquiry) -> str:
    def row(label, value):
        return (
            f'<tr><td style="padding:6px 0;color:#888;font-size:12px;'
            f'text-transform:uppercase;letter-spacing:1px;width:150px;vertical-align:top">{escape(label)}</td>'
            f'<td style="padding:6px 0;color:#111;font-size:14px">{escape(value or "—")}</td></tr>'
        )
    return (
        '<table role="presentation" width="100%" style="max-width:560px;margin:0 auto;'
        'font-family:Arial,Helvetica,sans-serif;background:#ffffff">'
        '<tr><td style="padding:28px 28px 8px">'
        '<p style="margin:0;font-size:12px;letter-spacing:3px;color:#888;text-transform:uppercase">Naparstek Digital</p>'
        '<h1 style="margin:8px 0 0;font-size:22px;color:#111">New project inquiry</h1>'
        '</td></tr>'
        '<tr><td style="padding:8px 28px 24px">'
        '<table role="presentation" width="100%">'
        f'{row("Name", inq.name)}'
        f'{row("Business", inq.business_name)}'
        f'{row("Email", inq.email)}'
        f'{row("Phone", inq.phone)}'
        f'{row("Current site", inq.current_website)}'
        f'{row("Needs", inq.need)}'
        f'{row("Budget", inq.budget)}'
        f'{row("Message", inq.message)}'
        '</table>'
        '<p style="margin:24px 0 0;font-size:12px;color:#888">'
        'Sent by Naparstek Digital. We never ask for passwords or payment details by email.</p>'
        '</td></tr></table>'
    )


# ---------------- Public routes ----------------
@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/inquiries", response_model=Inquiry)
async def create_inquiry(input: InquiryCreate):
    inquiry = Inquiry(**input.model_dump())
    await db.inquiries.insert_one(inquiry.model_dump())

    if EMAIL_KEY and OWNER_EMAIL:
        try:
            subject = f"New inquiry — {inquiry.name}" + (f" ({inquiry.business_name})" if inquiry.business_name else "")
            await send_email(to=OWNER_EMAIL, subject=subject, html=_inquiry_email_html(inquiry), reply_to=inquiry.email)
        except Exception as e:
            logger.error(f"Inquiry notification email failed: {e}")

    return inquiry


# ---------------- Auth routes ----------------
@api_router.post("/auth/login")
async def login(payload: LoginRequest):
    user = await db.users.find_one({"email": payload.email.lower()})
    if not user or not verify_password(payload.password, user.get("password_hash", "")):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token(user["id"], user["email"])
    return {"token": token, "email": user["email"], "name": user.get("name", "Admin")}


@api_router.get("/auth/me")
async def me(admin: dict = Depends(get_current_admin)):
    return {"email": admin["email"], "name": admin.get("name", "Admin"), "role": admin.get("role", "admin")}


# ---------------- Admin inbox routes ----------------
@api_router.get("/admin/inquiries", response_model=List[Inquiry])
async def admin_list_inquiries(admin: dict = Depends(get_current_admin)):
    return await db.inquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)


@api_router.patch("/admin/inquiries/{inquiry_id}", response_model=Inquiry)
async def admin_update_inquiry(inquiry_id: str, body: ReadUpdate, admin: dict = Depends(get_current_admin)):
    result = await db.inquiries.find_one_and_update(
        {"id": inquiry_id}, {"$set": {"read": body.read}}, projection={"_id": 0}, return_document=True
    )
    if not result:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    return result


@api_router.delete("/admin/inquiries/{inquiry_id}")
async def admin_delete_inquiry(inquiry_id: str, admin: dict = Depends(get_current_admin)):
    result = await db.inquiries.delete_one({"id": inquiry_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    return {"status": "deleted"}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    # Idempotent admin seed
    existing = await db.users.find_one({"email": ADMIN_EMAIL})
    if existing is None:
        await db.users.insert_one({
            "id": str(uuid.uuid4()),
            "email": ADMIN_EMAIL,
            "password_hash": hash_password(ADMIN_PASSWORD),
            "name": "Alec Naparstek",
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        logger.info("Seeded admin user")
    elif not verify_password(ADMIN_PASSWORD, existing.get("password_hash", "")):
        await db.users.update_one({"email": ADMIN_EMAIL}, {"$set": {"password_hash": hash_password(ADMIN_PASSWORD)}})
        logger.info("Updated admin password")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
