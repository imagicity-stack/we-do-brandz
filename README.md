# We do Brandz

Multi-page marketing agency experience built with a TypeScript React frontend and a Node.js backend for Razorpay payment
handling.

## Apps

- `frontend/` — Vite + React + TypeScript single page application with multiple routes (About, Services, FAQ, Contact, policy
  pages, and detailed booking forms for each service).
- `brandz-back/` — Express API that creates Razorpay orders using the provided live keys and enforces an origin allowlist.

## Getting started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The development server runs on `http://localhost:5173`.

### Backend

```bash
cd brandz-back
npm install
npm run dev
```

The API is available on `http://localhost:4000`. Update `.env` if you need to use different Razorpay keys or allow additional
origins during development.

## Deploying on Vercel

Set these environment variables in the Vercel dashboard (Project Settings → Environment Variables) for **Production**,
**Preview**, and **Development**:

- `NEXT_PUBLIC_RAZORPAY_KEY_ID` – Razorpay key ID exposed to the client for checkout.
- `NEXT_PUBLIC_N8N_WEBHOOK_GET_CALL_URL` – n8n webhook URL for "Get a CALL" form submissions.
- `RAZORPAY_KEY_ID` – Same Razorpay key ID for the server-side order endpoint (optional if the public key is set).
- `RAZORPAY_KEY_SECRET` – Razorpay key secret used to sign orders.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` – SMTP credentials for contact/booking emails.
- `META_PIXEL_ID`, `META_ACCESS_TOKEN` (optional) – Meta Conversions API credentials for server-side events.

After saving the variables, trigger a redeploy so the Serverless API routes (`/api/create-order`, `/api/send-email`, and
`/api/meta-events`) pick up the new values. The payment flow relies on the Razorpay variables; missing keys will cause
order creation to fail.
