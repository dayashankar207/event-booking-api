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
- [Project Structure](#project-structure)
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
