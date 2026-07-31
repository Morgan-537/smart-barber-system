# Smart Barber System API Specification

## Authentication

| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| POST | /api/auth/register | No | Register a new user |
| POST | /api/auth/login | No | User login |
| POST | /api/auth/forgot-password | No | Request password reset |
| POST | /api/auth/reset-password | No | Reset password |

---

## Users

| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| GET | /api/users/profile | Yes | View logged-in user profile |
| PUT | /api/users/profile | Yes | Update profile |

---

## Services

| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| GET | /api/services | No | View all services |
| POST | /api/services | Yes (Admin) | Add a service |
| PUT | /api/services/:id | Yes (Admin) | Update a service |
| DELETE | /api/services/:id | Yes (Admin) | Delete a service |

---

## Bookings

| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| GET | /api/bookings | Yes | View bookings |
| POST | /api/bookings | Yes | Create booking |
| PUT | /api/bookings/:id | Yes | Reschedule booking |
| DELETE | /api/bookings/:id | Yes | Cancel booking |

---

## Payments

| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| POST | /api/payments/mpesa | Yes | Initiate M-Pesa payment |
| GET | /api/payments/history | Yes | View payment history |

---

## Reviews

| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| GET | /api/reviews | No | View reviews |
| POST | /api/reviews | Yes | Submit a review |

---

## Inventory

| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| GET | /api/inventory | Yes (Admin) | View inventory |
| POST | /api/inventory | Yes (Admin) | Add inventory item |
| PUT | /api/inventory/:id | Yes (Admin) | Update inventory item |
| DELETE | /api/inventory/:id | Yes (Admin) | Delete inventory item |

---

## Notifications

| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| GET | /api/notifications | Yes | View notifications |
| PUT | /api/notifications/:id | Yes | Mark notification as read |