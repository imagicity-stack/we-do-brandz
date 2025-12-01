import type { NextApiRequest, NextApiResponse } from 'next';
import Razorpay from 'razorpay';

const resolveRazorpayKeyId = () => process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

const buildClient = () => {
  const key_id = resolveRazorpayKeyId();
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    throw new Error('Razorpay environment variables are not configured.');
  }

  return new Razorpay({ key_id, key_secret });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const key_id = resolveRazorpayKeyId();
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    res.status(500).json({ error: 'Razorpay environment variables are missing.' });
    return;
  }

  const { amount, currency = 'INR', name, email, contactNumber, brand, message, serviceId, serviceName, categoryName } =
    req.body || {};

  const normalizedAmount = Math.round(Number(amount));

  if (!Number.isFinite(normalizedAmount) || normalizedAmount <= 0) {
    res.status(400).json({ error: 'Amount is required to create an order.' });
    return;
  }

  try {
    const razorpay = buildClient();
    const order = await razorpay.orders.create({
      amount: normalizedAmount,
      currency: typeof currency === 'string' ? currency.toUpperCase() : 'INR',
      payment_capture: true,
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

    res.status(200).json({ ...order, key: key_id });
  } catch (error) {
    res
      .status(500)
      .json({ error: error instanceof Error ? error.message : 'Unable to create Razorpay order at the moment.' });
  }
}
