import nodemailer from 'nodemailer';

const requiredEnv = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'SMTP_FROM'];
const ALLOWED_FORM_TYPES = new Set(['contact', 'service-booking']);

function validateEnv() {
  const missing = requiredEnv.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(`Missing required SMTP environment variables: ${missing.join(', ')}`);
  }
}

function parseBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }

  if (!req.body || typeof req.body !== 'string') {
    return null;
  }

  try {
    return JSON.parse(req.body);
  } catch (error) {
    throw new Error('Invalid JSON body');
  }
}

function createEmailContent(payload) {
  const entries = Object.entries(payload ?? {});
  const text = entries.map(([key, value]) => `${key}: ${value ?? ''}`).join('\n');
  const html = `
    <div>
      <h2 style="margin:0 0 12px 0;">New submission details</h2>
      <ul style="padding:0; margin:0; list-style:none;">
        ${entries
          .map(
            ([key, value]) =>
              `<li style="margin-bottom:6px;"><strong>${key}:</strong> <span>${
                value !== undefined && value !== null ? String(value) : ''
              }</span></li>`
          )
          .join('')}
      </ul>
    </div>
  `;

  return { text, html };
}

function buildAmount(payload) {
  if (payload.totalAmountLabel) return payload.totalAmountLabel;
  if (payload.checkoutDisplayAmount && payload.checkoutDisplayCurrency)
    return `${payload.checkoutDisplayAmount} ${payload.checkoutDisplayCurrency}`;
  if (payload.checkoutAmount && payload.checkoutCurrency) return `${payload.checkoutAmount} ${payload.checkoutCurrency}`;
  return payload.amount ?? payload.totalAmount ?? undefined;
}

function buildMessagePayload(formType, payload) {
  if (formType === 'service-booking') {
    const filtered = {
      formType,
      name: payload.name,
      contactNumber: payload.contactNumber,
      email: payload.email,
      brand: payload.brand,
      message: payload.message,
      category: payload.categoryName ?? payload.category,
      subCategory: payload.serviceName ?? payload.subServiceName ?? payload.subServiceSlug,
      amount: buildAmount(payload)
    };

    return Object.fromEntries(Object.entries(filtered).filter(([, value]) => value !== undefined && value !== null));
  }

  const { email, ...rest } = payload;
  return { formType, email, ...rest };
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');

  let payload;

  try {
    validateEnv();
    payload = parseBody(req);
  } catch (error) {
    return res.status(400).json({ success: false, error: error instanceof Error ? error.message : 'Invalid request' });
  }

  if (!payload || typeof payload !== 'object') {
    return res.status(400).json({ success: false, error: 'Request body is required' });
  }

  const { formType = 'form', email } = payload;

  if (!ALLOWED_FORM_TYPES.has(formType)) {
    return res.status(400).json({ success: false, error: 'Unsupported form type' });
  }
  const messagePayload = buildMessagePayload(formType, payload);

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const { text, html } = createEmailContent(messagePayload);

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: 'connect@wedobrandz.com',
      subject: `New ${formType} submission`,
      text,
      html,
      replyTo: email || undefined
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: error instanceof Error ? error.message : 'Unable to send email at this time' });
  }
}
