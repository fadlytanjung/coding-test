# Backend – AI-Enabled User Management API

This is the FastAPI backend service for managing users, authentication, and AI-powered routes.

---

## 🚀 How to Run

### 1. Install Requirements

```bash
cd backend
pip install -r requirements.txt
```

### 2. Run Development Server

```bash
uvicorn app.main:app --reload
```

> Or, from the root project directory (with frontend):
```bash
npm run dev
```

---

## 🔐 Default Admin Credentials

- **Username:** `sysadmin`
- **Password:** `admin123`

These are seeded automatically on first run via `seed_initial_sysadmin()`.

---

## ✅ Features

- ✅ **JWT Authentication** (with Basic Auth login endpoint)
- ✅ **User CRUD API** with:
  - Validation rules (e.g. unique username, password change rules)
  - Role-based access (`user`, `sysadmin`)
  - Pagination, search (`fullname`, `username`)
- ✅ **AI Endpoint** for streaming responses
- ✅ **JWT Middleware** to protect routes
- ✅ **Unified JSON API responses** (`status`, `message`, `data`, `meta`)
- ✅ **CORS enabled** for frontend integration
- ✅ **Health Check & Dummy API**

---

## 📦 API Base URL

```
http://localhost:8000/api/
```

### Key Routes

| Endpoint                   | Method | Description                     |
|---------------------------|--------|---------------------------------|
| `/api/v1/auth/login`      | POST   | Login using Basic Auth header   |
| `/api/v1/users/`          | GET    | List users (paginated)          |
| `/api/v1/users/{user_id}` | GET    | Get user by ID                  |
| `/api/v1/users/`          | POST   | Create user                     |
| `/api/v1/users/{user_id}` | PUT    | Update user                     |
| `/api/v1/users/{user_id}` | DELETE | Delete user                     |
| `/api/ai/`                | POST   | AI chat response (streaming)    |

---

## 🛠️ Next TODO

- [ ] Add **unit tests** for routes, models, utils
- [ ] Add **Dockerfile** for containerization
- [ ] Add **OpenAPI enhancements** (tags, examples)
- [ ] Add **Rate limiting / throttling**
- [ ] Add **Role-based access control decorators**
- [ ] Add **API versioning**

---

## 📁 Project Structure

```
backend/
├── app/
│   ├── core/          # Config & constants
│   ├── database/      # DB setup & seeding
│   ├── features/      # Modular features (user, auth, ai)
│   ├── middleware/    # Custom JWT middleware
│   ├── utils/         # Response formatting, serialization
│   └── main.py        # FastAPI app entry point
├── .env
├── requirements.txt
└── README.md          # You're here!
```

---

## 🧪 Example Request (Login)

```http
POST /api/v1/auth/login
Authorization: Basic <base64>
Content-Type: application/json
```

---
