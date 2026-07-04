import { useState, useEffect } from 'react';

/**
 * useLocalStorage — behaves exactly like useState but persists to
 * localStorage so cart / orders / wishlist survive a page refresh,
 * closing the tab, etc. This is what makes the storefront feel like
 * a real app instead of resetting every time you reload.
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage full or unavailable — fail silently, app still works in-memory
    }
  }, [key, value]);

  return [value, setValue];
}
