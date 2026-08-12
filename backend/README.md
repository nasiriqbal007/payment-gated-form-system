# Backend

This backend is the NestJS API for the payment-gated form system.
It handles Stripe checkout session creation, payment verification, form persistence, and admin authentication.

## What it does

- Creates Stripe Checkout sessions when the frontend requests payment.
- Verifies that Stripe checkout sessions are paid before allowing form access.
- Saves and retrieves draft form data.
- Marks forms as submitted after final completion.
- Provides authenticated admin routes to review and manage forms.

## Requirements

- Node.js 20+ (recommended)
- npm
- PostgreSQL (configured through the local database files)
- Stripe secret key
- JWT secret for admin authentication

## Environment variables

Create a `.env` file in `backend/` or set these values in your environment.

- `STRIPE_SECRET_KEY` — your Stripe API secret key
- `JWT_SECRET` — secret used to sign admin JWT tokens
- `PORT` — optional backend port (defaults to `3001`)

## Local setup

```bash
cd backend
npm install
```

## Run locally

```bash
npm run start:dev
```

The backend listens on `http://localhost:3001` by default.

## API endpoints

### Payment
- `POST /payment/checkout-session` — create a Stripe checkout session
- `GET /payment/verify?sessionId=...` — verify Stripe payment completion

### Forms
- `PATCH /forms/:formId` — save or update a draft form
- `GET /forms/:formId` — retrieve draft or submitted form data
- `PATCH /forms/:formId/submit` — submit the form

### Admin
- `POST /auth/login` — authenticate admin and receive JWT token
- `GET /auth/profile` — retrieve current admin profile
- `GET /admin/forms` — list forms (protected)
- `GET /admin/forms/:formId` — retrieve one form (protected)
- `DELETE /admin/forms/:formId` — delete a form (protected)

## Notes

- CORS is enabled for `http://localhost:3000` and a deployed frontend origin.
- The backend uses `@nestjs/jwt`, Passport, and a database connection from `backend/src/database/db.ts`.
- Replace any hard-coded local URLs in the frontend when deploying to production.

## Useful commands

```bash
npm run lint
npm run test
npm run build
npm run start:prod
```
