# brandz-back

Backend service for the **We do Brandz** marketing agency experience. It exposes a small API surface for creating Razorpay
orders used by the frontend booking flow.

## Tech stack

- Node.js + Express
- Razorpay SDK
- CORS with allowlist support
- Environment configuration via `.env`

## Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Duplicate `.env` and update secrets if needed. The sample values are production keys provided by the client.
3. Run the development server:

   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:4000`.

## Environment variables

| Key                   | Description                                      |
| --------------------- | ------------------------------------------------ |
| `PORT`                | Port on which the API server listens.            |
| `RAZORPAY_KEY_ID`     | Razorpay public key for order creation.          |
| `RAZORPAY_KEY_SECRET` | Razorpay secret key (keep this value protected). |
| `ALLOWED_ORIGINS`     | Comma-separated list of domains allowed via CORS |

## API

### `POST /api/create-order`

Create a Razorpay order for a selected service.

**Body**

```json
{
  "amount": 499900,
  "currency": "INR",
  "name": "Aditi Sharma",
  "email": "aditi@example.com",
  "contactNumber": "+91 98765 43210",
  "brand": "Brandz Labs",
  "message": "We need a new website",
  "serviceId": "basic-business-website",
  "serviceName": "Basic Business Website",
  "categoryName": "Website Development"
}
```

**Response**

Returns the Razorpay order payload on success.
