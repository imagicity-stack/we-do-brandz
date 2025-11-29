import { useCallback, useEffect, useState } from 'react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const RAZORPAY_SCRIPT = 'https://checkout.razorpay.com/v1/checkout.js';

export const useRazorpay = (enabled = true) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') {
      return;
    }
    const existingScript = document.querySelector(`script[src="${RAZORPAY_SCRIPT}"]`);
    if (existingScript) {
      if (window.Razorpay) {
        setIsLoaded(true);
      } else {
        existingScript.addEventListener('load', () => setIsLoaded(true));
      }
      return;
    }

    const script = document.createElement('script');
    script.src = RAZORPAY_SCRIPT;
    script.async = true;
    script.onload = () => setIsLoaded(true);
    script.onerror = () => setIsLoaded(false);
    document.body.appendChild(script);
  }, [enabled]);

  const openCheckout = useCallback(
    (options: Record<string, unknown>) => {
      if (!enabled || !isLoaded || typeof window === 'undefined' || !window.Razorpay) {
        throw new Error('Razorpay checkout script is not ready yet.');
      }
      const checkout = new window.Razorpay(options);
      checkout.open();
    },
    [enabled, isLoaded]
  );

  return { isLoaded: enabled ? isLoaded : false, openCheckout };
};
