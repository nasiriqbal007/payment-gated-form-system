# Frontend

This frontend is a Next.js app that implements the payment-gated form experience.
Users pay with Stripe before accessing the multi-step registration form.

## What it does

- Shows a payment page that creates a Stripe checkout session.
- Redirects users to `/form?sessionId=...` after Stripe checkout.
- Verifies payment status via the backend before rendering the form.
- Loads and saves draft data while the user completes the form.
- Submits the form only after verification succeeds.

## Requirements

- Node.js 20+ (recommended)
- npm
- Backend API running locally or deployed

## Environment variables

Create a `.env.local` file in `frontend/` or set these values in your environment.

- `NEXT_PUBLIC_API_URL` — backend base URL, for example `http://localhost:3001`

If `NEXT_PUBLIC_API_URL` is not provided, the frontend defaults to `http://localhost:3001`.

## Local setup

```bash
cd frontend
npm install
```

## Run locally

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Application flow

1. User lands on the home page and clicks the payment button.
2. The frontend requests a checkout session from the backend.
3. Stripe handles payment and redirects back to `/form?sessionId=...`.
4. The frontend verifies the payment session via the backend.
5. If payment is confirmed, the registration form appears.

## Important files

- `app/page.tsx` — payment landing page
- `app/form/page.tsx` — payment verification and form access gate
- `services/paymentService.ts` — frontend API calls to backend payment endpoints
- `services/apiClient.ts` — fetch wrapper and auth token handling

## Useful commands

```bash
npm run lint
npm run build
npm run start
```

## Notes

- The backend must be running on the configured `NEXT_PUBLIC_API_URL`.
- In development, the frontend expects the backend at `http://localhost:3001` by default.
- Update the Stripe success/cancel URLs before deploying to production.
