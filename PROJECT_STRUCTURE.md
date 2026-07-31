# Smart Barber System - Project Structure

## Overview

The Smart Barber System is organized into two main applications:

- `client/` - React frontend
- `server/` - Flask REST API backend

---

## Frontend Structure

```
client/
└── src/
    ├── assets/
    ├── components/
    ├── context/
    ├── hooks/
    ├── layouts/
    ├── pages/
    │   ├── auth/
    │   ├── customer/
    │   ├── barber/
    │   └── admin/
    ├── routes/
    ├── services/
    ├── styles/
    └── utils/
```

---

## Backend Structure

```
server/
├── app/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/
├── migrations/
├── tests/
└── run.py
```

---

## Development Workflow

- Each developer works only on their assigned feature branch.
- Pull Requests target the `develop` branch.
- Only the Team Lead merges into `develop`.
- Only tested code is merged from `develop` into `main`.

---

## Database

- MySQL
- SQLAlchemy ORM
- Flask-Migrate
- JWT Authentication