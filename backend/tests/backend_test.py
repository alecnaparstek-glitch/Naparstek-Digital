"""Backend tests: public inquiries + admin auth + admin inbox CRUD (Naparstek Digital)."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/")
ADMIN_EMAIL = "a.naparstek@icloud.com"
ADMIN_PASSWORD = "NaparstekInbox2026!"


@pytest.fixture(scope="session")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="session")
def admin_token(api):
    r = api.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200, f"admin login failed: {r.status_code} {r.text}"
    data = r.json()
    assert "token" in data and isinstance(data["token"], str) and len(data["token"]) > 0
    assert data["email"].lower() == ADMIN_EMAIL
    return data["token"]


@pytest.fixture(scope="session")
def auth_headers(admin_token):
    return {"Authorization": f"Bearer {admin_token}"}


# ---------- Health ----------
def test_root(api):
    r = api.get(f"{BASE_URL}/api/")
    assert r.status_code == 200
    assert r.json().get("message") == "Hello World"


# ---------- Auth ----------
def test_login_wrong_password(api):
    r = api.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": "wrong-password!"})
    assert r.status_code == 401
    assert "detail" in r.json()


def test_login_unknown_email(api):
    r = api.post(f"{BASE_URL}/api/auth/login", json={"email": "nobody@example.com", "password": "whatever"})
    assert r.status_code == 401


def test_login_invalid_email_format(api):
    r = api.post(f"{BASE_URL}/api/auth/login", json={"email": "not-an-email", "password": "x"})
    assert r.status_code == 422


def test_auth_me_requires_token(api):
    r = api.get(f"{BASE_URL}/api/auth/me")
    assert r.status_code == 401


def test_auth_me_with_token(api, auth_headers):
    r = api.get(f"{BASE_URL}/api/auth/me", headers=auth_headers)
    assert r.status_code == 200
    d = r.json()
    assert d["email"].lower() == ADMIN_EMAIL
    assert d["role"] == "admin"


def test_auth_me_invalid_token(api):
    r = api.get(f"{BASE_URL}/api/auth/me", headers={"Authorization": "Bearer not.a.jwt"})
    assert r.status_code == 401


# ---------- Public inquiries ----------
def test_create_inquiry_invalid_email(api):
    r = api.post(f"{BASE_URL}/api/inquiries", json={"name": "x", "email": "bad", "message": "hi"})
    assert r.status_code == 422


def test_create_inquiry_missing_required(api):
    r = api.post(f"{BASE_URL}/api/inquiries", json={"email": "a@b.com"})
    assert r.status_code == 422


# ---------- Admin inquiries protection ----------
def test_admin_list_requires_token(api):
    r = api.get(f"{BASE_URL}/api/admin/inquiries")
    assert r.status_code == 401


def test_admin_patch_requires_token(api):
    r = api.patch(f"{BASE_URL}/api/admin/inquiries/does-not-exist", json={"read": True})
    assert r.status_code == 401


def test_admin_delete_requires_token(api):
    r = api.delete(f"{BASE_URL}/api/admin/inquiries/does-not-exist")
    assert r.status_code == 401


# ---------- Full flow: create -> list -> patch -> delete ----------
def test_full_inquiry_admin_flow(api, auth_headers):
    marker = f"TEST_{uuid.uuid4().hex[:8]}"
    payload = {
        "name": f"{marker} Tester",
        "business_name": "Acme Co",
        "email": f"{marker}@example.com",
        "phone": "",
        "current_website": "acme.com",
        "need": "New Website",
        "budget": "$500 – $1,000",
        "message": "Please build me a beautiful site.",
    }
    # Create (public)
    r = api.post(f"{BASE_URL}/api/inquiries", json=payload)
    assert r.status_code == 200, r.text
    created = r.json()
    assert created["email"] == payload["email"]
    assert created["budget"] == "$500 – $1,000"
    assert created["read"] is False
    assert "_id" not in created
    inq_id = created["id"]

    try:
        # List (admin)
        r = api.get(f"{BASE_URL}/api/admin/inquiries", headers=auth_headers)
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        assert any(i["id"] == inq_id for i in items), "created inquiry not in admin list"
        # Sorted desc: newest first should match our just-created id
        assert items[0]["id"] == inq_id
        assert all("_id" not in i for i in items)

        # PATCH -> mark read
        r = api.patch(f"{BASE_URL}/api/admin/inquiries/{inq_id}", json={"read": True}, headers=auth_headers)
        assert r.status_code == 200
        assert r.json()["read"] is True

        # GET verifies persistence
        r = api.get(f"{BASE_URL}/api/admin/inquiries", headers=auth_headers)
        match = [i for i in r.json() if i["id"] == inq_id][0]
        assert match["read"] is True

        # PATCH -> mark unread
        r = api.patch(f"{BASE_URL}/api/admin/inquiries/{inq_id}", json={"read": False}, headers=auth_headers)
        assert r.status_code == 200 and r.json()["read"] is False
    finally:
        # DELETE (cleanup + assertion)
        r = api.delete(f"{BASE_URL}/api/admin/inquiries/{inq_id}", headers=auth_headers)
        assert r.status_code == 200
        assert r.json().get("status") == "deleted"

    # Verify removal
    r = api.get(f"{BASE_URL}/api/admin/inquiries", headers=auth_headers)
    assert all(i["id"] != inq_id for i in r.json()), "inquiry still present after delete"

    # Second delete -> 404
    r = api.delete(f"{BASE_URL}/api/admin/inquiries/{inq_id}", headers=auth_headers)
    assert r.status_code == 404


def test_admin_patch_nonexistent(api, auth_headers):
    r = api.patch(
        f"{BASE_URL}/api/admin/inquiries/nonexistent-{uuid.uuid4().hex[:6]}",
        json={"read": True},
        headers=auth_headers,
    )
    assert r.status_code == 404
