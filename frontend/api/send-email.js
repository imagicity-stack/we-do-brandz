import nodemailer from 'nodemailer';

const REQUIRED_ENV = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'SMTP_FROM'];

function assertEnv() {
  const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(`Missing required SMTP environment variables: ${missing.join(', ')}`);
  }
}

function toKeyValueLines(payload) {
  return Object.entries(payload)
    .map(([key, value]) => `${key}: ${value ?? ''}`)
    .join('\n');
}

function toHtmlList(payload) {
  const listItems = Object.entries(payload)
    .map(
      ([key, value]) =>
        `<li style="margin-bottom:6px;"><strong>${key}:</strong> <span>${
          value !== undefined && value !== null ? String(value) : ''
        }</span></li>`
    )
    .join('');

  return `<div><h2 style="margin:0 0 12px 0;">New submission details</h2><ul style="padding:0; margin:0; list-style:none;">${listItems}</ul></div>`;
}

async function parseJsonBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }

  const raw = await new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });

  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new Error('Invalid JSON body');
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  let payload;

  try {
    assertEnv();
    payload = await parseJsonBody(req);
  } catch (error) {
    return res.status(400).json({ success: false, error: error instanceof Error ? error.message : 'Invalid request' });
  }

  if (!payload || typeof payload !== 'object') {
    return res.status(400).json({ success: false, error: 'Request body is required' });
  }

  const { formType = 'form', email, ...rest } = payload;
  const messagePayload = { formType, email, ...rest };

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

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: 'connect@wedobrandz.com',
      subject: `New ${formType} submission`,
      text: toKeyValueLines(messagePayload),
      html: toHtmlList(messagePayload),
      replyTo: email || undefined
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: error instanceof Error ? error.message : 'Unable to send email at this time' });
  }
}
