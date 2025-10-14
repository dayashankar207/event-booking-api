# Event Booking System (Backend)

![Node.js](https://img.shields.io/badge/Node.js-v22.17.0-green)
![Bun](https://img.shields.io/badge/Bun-v1.0-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v15-blue)
![Prisma](https://img.shields.io/badge/Prisma-v6.16.2-lightgrey)
![JWT](https://img.shields.io/badge/JWT-Secure-orange)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Cron Jobs](#cron-jobs)
- [Examples](#json-api-examples)
- [Future Enhancements](#future-enhancements)

---

## Project Overview

A backend API for an **Event Booking System** that allows users to book seats for events. Features include:

- Seat reservation and auto-expiration
- JWT-based authentication and role-based authorization (USER / ADMIN)
- Booking lifecycle: `PENDING → CONFIRMED → CANCELLED / EXPIRED`
- Cron job for auto-cancelling expired bookings
- Prevents double-booking of seats

---

## Tech Stack

- **Runtime:** Bun
- **Backend:** Node.js + Express
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT (access + refresh tokens)
- **Task Scheduling:** Cron jobs for booking expiration
- **Validation:** express-validator

---

## Setup & Installation

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Prisma migrations
bunx prisma migrate dev --name init
bunx prisma generate
```

## Environment Variables

Create a .env file in the root directory:

DATABASE_URL="postgresql://postgres:password@localhost:5432/booking"
REDIS_URL="redis://127.0.0.1:6379"
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
PORT=5000
NODE_ENV=production
CRON_ENABLED=true
DEFAULT_PENDING_MS=600000 # 10 mins
ADMIN_EMAIL= example@admin.com
ADMIN_PASSWORD= examplePassword123

## API Endpoints

| Method | Endpoint                   | Description                         | Auth Required |
| ------ | -------------------------- | ----------------------------------- | ------------- |
| GET    | `/api/booking`             | List all bookings                   | USER / ADMIN  |
| POST   | `/api/booking`             | Create a new booking (seat PENDING) | USER          |
| PATCH  | `/api/booking/:id/confirm` | Confirm a booking                   | USER          |
| PATCH  | `/api/booking/:id/cancel`  | Cancel a booking                    | USER          |
| GET    | `/api/booking/:id`         | Get booking by ID                   | USER / ADMIN  |


## Cron Jobs

Booking Expiration: Every minute, checks for bookings with status PENDING that have passed expiresAt.

Automatically cancels expired bookings and sets seat status back to AVAILABLE.

Controlled via CRON_ENABLED=true.

## JSON API Examples

1. Create Booking

Request

POST /api/booking
Authorization: Bearer <ACCESS_TOKEN>
Content-Type: application/json

```{
  "eventId": "89688e8e-2c6c-46d7-9c84-044c7ec78dc7",
  "seatId": "47afdf10-bcf7-4b1f-9c28-d310c1c6f452"
}```

Response (201 Created)

```{
  "success": true,
  "message": "Booking created successfully (PENDING)",
  "data": {
    "id": "a1f5ed23-1c91-4874-8ed3-c00803d65dc6",
    "userId": "b5f2ed01-7c12-41a2-bc45-12345",
    "eventId": "89688e8e-2c6c-46d7-9c84-044c7ec78dc7",
    "seatId": "47afdf10-bcf7-4b1f-9c28-d310c1c6f452",
    "status": "PENDING",
    "expiresAt": "2025-10-11T10:48:49.022Z",
    "seat": { "number": "A1", "status": "RESERVED" },
    "event": { "title": "Rock Concert", "date": "2025-10-15T19:00:00.000Z" }
  }
}```

2. Confirm Booking

Request

PATCH /api/booking/a1f5ed23-1c91-4874-8ed3-c00803d65dc6/confirm
Authorization: Bearer <ACCESS_TOKEN>

Response (200 OK)

```{
  "success": true,
  "message": "Booking confirmed",
  "data": {
    "id": "a1f5ed23-1c91-4874-8ed3-c00803d65dc6",
    "status": "CONFIRMED",
    "seat": { "number": "A1", "status": "BOOKED" },
    "event": { "title": "Rock Concert", "date": "2025-10-15T19:00:00.000Z" }
  }
}```

3. Cancel Booking

Request

PATCH /api/booking/a1f5ed23-1c91-4874-8ed3-c00803d65dc6/cancel
Authorization: Bearer <ACCESS_TOKEN>

Response (200 OK)

```{
  "success": true,
  "message": "Booking cancelled",
  "data": {
    "id": "a1f5ed23-1c91-4874-8ed3-c00803d65dc6",
    "status": "CANCELLED",
    "seat": { "number": "A1", "status": "AVAILABLE" }
  }
}```

4. Get Booking by ID

Request

GET /api/booking/a1f5ed23-1c91-4874-8ed3-c00803d65dc6
Authorization: Bearer <ACCESS_TOKEN>

Response (200 OK)

```{
  "id": "a1f5ed23-1c91-4874-8ed3-c00803d65dc6",
  "status": "CONFIRMED",
  "user": { "name": "Daya Shankar" },
  "seat": { "number": "A1", "status": "BOOKED" },
  "event": { "title": "Rock Concert", "date": "2025-10-15T19:00:00.000Z" },
  "createdAt": "2025-10-11T10:48:49.022Z",
  "updatedAt": "2025-10-11T10:50:00.000Z",
  "expiresAt": "2025-10-11T10:53:49.022Z"
}```

