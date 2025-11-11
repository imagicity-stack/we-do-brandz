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
