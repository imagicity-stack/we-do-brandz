import { useCallback } from 'react';

export const useLocalePath = () => {
  return useCallback((path = '/') => {
    if (!path || path === '') {
      return '/';
    }

    return path.startsWith('/') ? path : `/${path}`;
  }, []);
};
