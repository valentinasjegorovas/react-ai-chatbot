import { useEffect, useState } from "react";
import { type Messages } from "../types/index";


export default function useLocalStorage(
  key: string,
  initialValue: Messages
) {
  const [value, setValue] = useState<Messages>(() => {
   
    try {
      const stored = localStorage.getItem(key);

      if (!stored) return initialValue;

      const parsed = JSON.parse(stored);

      if (!Array.isArray(parsed)) return initialValue;

      return parsed;
    } catch (error) {
      
      console.warn(`Failed to parse localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
   
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
