# Relief Track Aid (RTA) - Backend Development Specification

## Project Overview

Relief Track Aid (RTA) is a humanitarian aid management platform designed to improve fairness, transparency, and efficiency in aid distribution within Gaza.

The backend system is responsible for:

* Authentication & Authorization
* Beneficiary Management
* Donor Management
* Aid Management
* Aid Distribution
* Verification Workflow
* Donation Tracking
* Notifications
* Reporting & Analytics
* Audit Logging
* Offline Synchronization Support

---

# Technology Stack

## Runtime

* Node.js 

## Framework

* Express.js

## Database

* MySQL 8

## Authentication

* JWT Authentication
* Refresh Token Strategy

## Validation

* Zod

## ORM

Prisma ORM

## Security

* bcrypt
* helmet
* cors
* express-rate-limit

## Logging

* Winston

## Environment Variables

* dotenv

---

# Architecture

Use Feature-Based Architecture.

```text
src/

├── config/
├── database/
├── middleware/
├── shared/
├── modules/
│
├── auth/
├── users/
├── beneficiaries/
├── donors/
├── organizations/
├── campaigns/
├── aid-categories/
├── aid-types/
├── aids/
├── distributions/
├── distribution-cycles/
├── donations/
├── donation-tracking/
├── beneficiary-verifications/
├── complaints/
├── notifications/
├── reports/
├── audit-logs/
├── sync/
│
└── app.js
```

Each module must contain:

```text
controller
service
repository
routes
validation
dto
```

---

# Roles

The system contains 4 roles:

```text
admin
donor
beneficiary
local_org
```

Implement Role-Based Access Control (RBAC).

---

# Authentication Module

## Features

* Login
* Logout
* Refresh Token
* Change Password

## Endpoints

POST /api/auth/login

POST /api/auth/logout

POST /api/auth/refresh-token

POST /api/auth/change-password

---

# User Module

## Responsibilities

Manage all system users.

## Endpoints

POST /api/users

GET /api/users

GET /api/users/:id

PUT /api/users/:id

DELETE /api/users/:id

PATCH /api/users/:id/status

---

# Beneficiary Module

## Responsibilities

Manage beneficiary records.

## Endpoints

POST /api/beneficiaries

GET /api/beneficiaries

GET /api/beneficiaries/:id

PUT /api/beneficiaries/:id

DELETE /api/beneficiaries/:id

GET /api/beneficiaries/:id/history

---

# Beneficiary Verification Module

## Database Table

beneficiary_verifications

## Responsibilities

Verify beneficiary eligibility.

## Business Rules

Check:

* National ID uniqueness
* Eligibility status
* Previous aid history

## Endpoints

POST /api/verifications

GET /api/verifications

GET /api/verifications/:id

---

# Donor Module

## Endpoints

POST /api/donors

GET /api/donors

GET /api/donors/:id

PUT /api/donors/:id

DELETE /api/donors/:id

---

# Campaign Module

## Database Table

campaigns

## Endpoints

POST /api/campaigns

GET /api/campaigns

GET /api/campaigns/:id

PUT /api/campaigns/:id

DELETE /api/campaigns/:id

---

# Donations Module

## Database Table

donations

## Features

Support:

* Registered Donors
* Guest Donors

Generate:

tracking_code

Automatically.

## Endpoints

POST /api/donations

GET /api/donations

GET /api/donations/:id

GET /api/donations/track/:trackingCode

---

# Donation Tracking Module

## Database Table

donation_tracking

## Features

Track donation lifecycle.

Possible statuses:

```text
Donation Received
Transferred To Organization
Aid Purchased
Aid Distributed
```

## Endpoints

POST /api/donation-tracking

GET /api/donation-tracking/:donationId

---

# Aid Categories Module

## Endpoints

POST /api/aid-categories

GET /api/aid-categories

PUT /api/aid-categories/:id

DELETE /api/aid-categories/:id

---

# Aid Types Module

## Endpoints

POST /api/aid-types

GET /api/aid-types

PUT /api/aid-types/:id

DELETE /api/aid-types/:id

---

# Aid Inventory Module

## Database Table

aids

## Features

Manage aid batches.

Fields:

* quantity
* remaining_quantity
* batch_code
* expiry_date

## Endpoints

POST /api/aids

GET /api/aids

GET /api/aids/:id

PUT /api/aids/:id

DELETE /api/aids/:id

---

# Distribution Cycles Module

## Database Table

distribution_cycles

## Examples

* Ramadan 2026
* Winter Campaign
* Emergency Relief

## Endpoints

POST /api/distribution-cycles

GET /api/distribution-cycles

PUT /api/distribution-cycles/:id

DELETE /api/distribution-cycles/:id

---

# Distribution Module

## Database Table

distributions

## Core Business Logic

When distributing aid:

1. Verify beneficiary eligibility.
2. Verify available quantity.
3. Reduce remaining_quantity.
4. Create distribution record.
5. Create notification.
6. Create audit log.

## Endpoints

POST /api/distributions

GET /api/distributions

GET /api/distributions/:id

PUT /api/distributions/:id

DELETE /api/distributions/:id

---

# Complaints Module

## Endpoints

POST /api/complaints

GET /api/complaints

GET /api/complaints/:id

PUT /api/complaints/:id

---

# Notification Module

## Database Table

notifications

## Features

Create notifications for:

* Aid approval
* Aid distribution
* Verification result
* Donation updates

## Endpoints

GET /api/notifications

PATCH /api/notifications/:id/read

---

# Audit Log Module

## Database Table

audit_logs

## Must Log

* Login
* User Creation
* User Update
* Verification
* Donation
* Distribution
* Complaint Resolution

---

# Sync Module

## Database Table

sync_logs

## Purpose

Support future Offline-First synchronization.

For every offline operation:

Store:

* operation_type
* table_name
* record_id
* sync_status

---

# Reports Module

## Dashboard Statistics

Generate:

* Total Beneficiaries
* Total Donations
* Total Aid Batches
* Total Distributed Aid
* Total Organizations

## Endpoints

GET /api/reports/dashboard

GET /api/reports/donations

GET /api/reports/distributions

GET /api/reports/beneficiaries

---

# Middleware Requirements

## Auth Middleware

Verify JWT.

## Role Middleware

Verify permissions.

Example:

```text
Admin → Full Access

Donor → Donation APIs Only

Beneficiary → Own Data Only

Organization → Distribution + Verification
```

## Error Middleware

Global Error Handler.

## Validation Middleware

Zod Validation.

---

# Security Requirements

Implement:

* Password Hashing (bcrypt)
* JWT Authentication
* Rate Limiting
* Input Validation
* SQL Injection Protection
* CORS Configuration
* Helmet Security Headers

---

# Development Standards

## Code Style

* ESLint
* Prettier

## Commit Convention

```text
feat:
fix:
refactor:
docs:
test:
```

---

# Deliverables

The backend must deliver:

* Fully documented REST API
* Swagger Documentation
* Prisma Schema
* MySQL Database Integration
* JWT Authentication
* RBAC Authorization
* Validation Layer
* Logging Layer
* Audit Layer
* Production Ready Folder Structure

The implementation should follow real-world software engineering practices and be maintainable, scalable, and production-oriented.
