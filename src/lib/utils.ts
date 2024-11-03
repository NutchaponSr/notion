import { twMerge } from "tailwind-merge"
import { clsx, type ClassValue } from "clsx"
import { formatDistanceToNowStrict } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateCode(length: number) {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";

  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

export function formatTimeElapsed(date: string) {
  let timeElapsed = formatDistanceToNowStrict(new Date(date));

  timeElapsed = timeElapsed
    .replace(' seconds', 's')
    .replace(' second', 's')
    .replace(' minutes', 'm')
    .replace(' minute', 'm')
    .replace(' hours', 'hr')
    .replace(' hour', 'hr')
    .replace(' days', 'd')
    .replace(' day', 'd');

  return `${timeElapsed} ago`;
}