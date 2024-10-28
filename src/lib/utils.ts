import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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

export function getEmojiForType(type: "CC" | "FC" | "TC") {
  let emoji;
  switch (type) {
    case "CC":
      emoji = "📕";
      break;
    case "FC":
      emoji = "📘";
      break;
    case "TC":
      emoji = "📗";
      break;
  }
  return emoji;
}