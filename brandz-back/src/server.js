import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Razorpay from 'razorpay';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { logNote } from './utils/notes.js';
import { isMetaConfigured, sendMetaEvent } from './utils/metaConversions.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',').filter(Boolean);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../../frontend/dist');
const indexHtmlPath = path.join(distPath, 'index.html');

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

const razorpayKeyId = process.env.RAZORPAY_KEY_ID ?? 'rzp_live_ReprOUvcLlsQpx';

const razorpay = new Razorpay({
  key_id: razorpayKeyId,
  key_secret: process.env.RAZORPAY_KEY_SECRET ?? 'rj0631Zd4SFgC2pKfcuTfhVV'
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'brandz-back' });
});

app.post('/api/meta-events', async (req, res) => {
  if (!isMetaConfigured()) {
    res.status(503).json({ error: 'Meta Pixel configuration is missing on the server.' });
    return;
  }

  try {
    const response = await sendMetaEvent(req.body, req);
    res.json({ success: true, response });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to send Meta event.';
    logNote('Meta event forwarding failed', { error: message });
    res.status(400).json({ error: message });
  }
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

    res.json({ ...order, key: razorpayKeyId });
  } catch (error) {
    logNote('Failed to create order', { error: error instanceof Error ? error.message : 'unknown' });
    res.status(500).json({ error: 'Unable to create Razorpay order.' });
  }
});

app.use(express.static(distPath, { index: false }));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || path.extname(req.path)) {
    next();
    return;
  }

  if (!fs.existsSync(indexHtmlPath)) {
    res.status(404).send('Frontend build not found. Run "npm run build" inside the frontend project.');
    return;
  }

  res.sendFile(indexHtmlPath, (error) => {
    if (error) {
      next(error);
    }
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`brandz-back server running on port ${PORT}`);
});
