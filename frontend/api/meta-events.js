const REQUIRED_ENV = ['META_PIXEL_ID', 'META_ACCESS_TOKEN'];

function parseJsonBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }

  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      if (!data) {
        resolve(null);
        return;
      }
      try {
        resolve(JSON.parse(data));
      } catch (error) {
        reject(new Error('Invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

function buildEvent(payload) {
  if (!payload || typeof payload !== 'object') return null;

  const event = {
    event_name: payload.event_name,
    event_time: payload.event_time ?? Math.floor(Date.now() / 1000),
    event_source_url: payload.event_source_url,
    action_source: payload.action_source ?? 'website',
    custom_data: payload.custom_data,
    user_data: payload.user_data
  };

  return Object.fromEntries(Object.entries(event).filter(([, value]) => value !== undefined && value !== null));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  let payload;

  try {
    payload = await parseJsonBody(req);
  } catch (error) {
    return res.status(400).json({ success: false, error: error instanceof Error ? error.message : 'Invalid request' });
  }

  const missingEnv = REQUIRED_ENV.filter((key) => !process.env[key]);
  if (missingEnv.length) {
    return res.status(200).json({ success: false, skipped: true });
  }

  const event = buildEvent(payload);
  if (!event || !event.event_name) {
    return res.status(400).json({ success: false, error: 'event_name is required' });
  }

  const url = `https://graph.facebook.com/v19.0/${process.env.META_PIXEL_ID}/events`;
  const body = {
    data: [event]
  };

  if (payload?.test_event_code) {
    body.test_event_code = payload.test_event_code;
  }

  try {
    const response = await fetch(`${url}?access_token=${process.env.META_ACCESS_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const responseText = await response.text();
      return res.status(502).json({
        success: false,
        error: 'Meta Conversions API error',
        details: responseText
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
  }
}
