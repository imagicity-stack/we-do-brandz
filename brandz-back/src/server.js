import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Razorpay from 'razorpay';

import { logNote } from './utils/notes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',').filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Origin not allowed by CORS'));
      }
    }
  })
);
app.use(express.json());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'brandz-back' });
});

app.post('/api/create-order', async (req, res) => {
  const { amount, currency = 'INR', name, email, contactNumber, brand, message, serviceId, serviceName, categoryName } =
    req.body || {};

  if (!amount || amount <= 0) {
    res.status(400).json({ error: 'Amount is required to create an order.' });
    return;
  }

  try {
    const order = await razorpay.orders.create({
      amount,
      currency,
      payment_capture: 1,
      notes: {
        name,
        email,
        contactNumber,
        brand,
        message,
        serviceId,
        serviceName,
        categoryName
      }
    });

    logNote('Created Razorpay order', {
      orderId: order.id,
      amount,
      serviceId,
      serviceName,
      name,
      email
    });

    res.json(order);
  } catch (error) {
    logNote('Failed to create order', { error: error instanceof Error ? error.message : 'unknown' });
    res.status(500).json({ error: 'Unable to create Razorpay order.' });
  }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`brandz-back server running on port ${PORT}`);
});
