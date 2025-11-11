export const logNote = (message, context = {}) => {
  const timestamp = new Date().toISOString();
  // eslint-disable-next-line no-console
  console.log(`[${timestamp}] ${message}`, context);
};
