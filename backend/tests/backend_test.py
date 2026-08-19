"""Backend API tests for alec.studio inquiries endpoints."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://studio-build-23.preview.emergentagent.com").rstrip("/")


@pytest.fixture
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---- Health ----
def test_root(api):
    r = api.get(f"{BASE_URL}/api/")
    assert r.status_code == 200
    assert r.json().get("message") == "Hello World"


# ---- Inquiries CRUD-lite ----
def test_create_inquiry_and_persistence(api):
    marker = f"TEST_{uuid.uuid4().hex[:8]}"
    payload = {
        "name": f"{marker} Tester",
        "business_name": "Acme Co",
        "email": f"{marker}@example.com",
        "phone": "555-1234",
        "current_website": "acme.com",
        "need": "New Website",
        "budget": "$2,500 – $5,000",
        "message": "Please build me a beautiful site.",
    }
    r = api.post(f"{BASE_URL}/api/inquiries", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["name"] == payload["name"]
    assert data["email"] == payload["email"]
    assert data["need"] == payload["need"]
    assert data["budget"] == payload["budget"]
    assert data["message"] == payload["message"]
    assert "id" in data and isinstance(data["id"], str)
    assert "_id" not in data
    assert "created_at" in data

    # Verify persistence via GET
    r2 = api.get(f"{BASE_URL}/api/inquiries")
    assert r2.status_code == 200
    items = r2.json()
    assert isinstance(items, list)
    match = [i for i in items if i.get("email") == payload["email"]]
    assert len(match) >= 1, "Created inquiry not returned by GET /api/inquiries"
    assert match[0]["name"] == payload["name"]
    assert "_id" not in match[0]


def test_create_inquiry_minimal_required(api):
    marker = f"TEST_{uuid.uuid4().hex[:8]}"
    payload = {
        "name": f"{marker} Min",
        "email": f"{marker}@example.com",
        "message": "Minimal inquiry",
    }
    r = api.post(f"{BASE_URL}/api/inquiries", json=payload)
    assert r.status_code == 200, r.text
    d = r.json()
    assert d["business_name"] == ""
    assert d["need"] == ""
    assert d["budget"] == ""


def test_create_inquiry_invalid_email(api):
    payload = {"name": "Bad", "email": "not-an-email", "message": "hi"}
    r = api.post(f"{BASE_URL}/api/inquiries", json=payload)
    assert r.status_code == 422


def test_create_inquiry_missing_required(api):
    r = api.post(f"{BASE_URL}/api/inquiries", json={"email": "a@b.com"})
    assert r.status_code == 422


def test_get_inquiries_sorted_desc(api):
    r = api.get(f"{BASE_URL}/api/inquiries")
    assert r.status_code == 200
    items = r.json()
    if len(items) >= 2:
        # sort desc by created_at
        assert items[0]["created_at"] >= items[-1]["created_at"]
