# payment-gated-form-system 

A payment-first full-stack app that requires a one-time Stripe payment before users can access and submit a registration form.

## Why this repo exists

This project is designed for use cases where form access is gated behind payment. It combines a Next.js frontend with a NestJS backend to handle:

- secure payment checkout via Stripe
- payment verification before form access
- payment-first access gating
- multi-step form progress with draft saving
- final form submission after completion
- admin review and management of draft/submitted entries

## Recommended GitHub repo name

- `payment-gated-form-system` — describes the app's purpose and functionality.

## What users see

1. The public homepage shows a payment access page.
2. The user pays a one-time fee via Stripe.
3. Stripe redirects the user to the form page with a checkout session ID.
4. The frontend verifies the payment session with the backend.
5. If payment is confirmed, the registration form appears.
6. The user completes the form in multiple steps.
7. Each step is saved as a draft to both local storage and the backend.
8. The final step submits the form and marks it as `submitted`.
9. Admin users can access the dashboard to review, delete, and manage draft and submitted entries.

## Project structure

- `backend/` — NestJS API for Stripe checkout, payment verification, form persistence, and admin endpoints
- `frontend/` — Next.js app for the payment page, form flow, and admin dashboard

## Local setup

### Backend

```bash
cd backend
npm install
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Usage

- Open the frontend homepage in your browser.
- Complete the Stripe payment step.
- After payment, you will be redirected to the form page.
- The app verifies payment and then allows the user to fill out the registration form.

## What to show on GitHub

This root `README.md` is the main landing page for visitors. It should explain:

- the app goal
- the payment-first workflow
- how to run backend and frontend locally
- where the implementation lives (`backend/` and `frontend/`)

## Helpful links

- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)

## Notes

- Keep `backend/README.md` and `frontend/README.md` for service-specific details.
- Use this root README as the GitHub repository overview.
