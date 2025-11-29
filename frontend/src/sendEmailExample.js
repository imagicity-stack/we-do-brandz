// Example helper for sending a JSON payload to the serverless email endpoint.
// This file is plain JavaScript and works in Vite without additional setup.
export async function sendEmailExample(formType, fields) {
  const response = await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ formType, ...fields })
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    const message = result?.error || 'Unable to send your request right now.';
    throw new Error(message);
  }

  return result;
}

// Usage example:
// sendEmailExample('contact', { name: 'Customer', email: 'user@example.com', message: 'Hello!' })
//   .then(() => console.log('Sent'))
//   .catch((error) => console.error('Failed', error));
