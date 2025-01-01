import { twMerge } from "tailwind-merge"
import { clsx, type ClassValue } from "clsx"
import { formatDistanceToNowStrict } from "date-fns";

import { IconBaseProps, IconDefinition, IconVariant } from "@/types";
import React from "react";

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

export function sortBy<T extends Record<string, string | number | boolean | null>>(
  arr: T[], 
  header: keyof T, 
  direction: "asc" | "desc"
) {
  return [...arr].sort((a, b) => {
    const aValue = a[header];
    const bValue = b[header];
    
    if (typeof aValue === "string" && typeof bValue === "string") {
      return direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return direction === "asc" 
        ? aValue - bValue
        : bValue - aValue;
    }

    if (aValue instanceof Date && bValue instanceof Date) {
      return direction === "asc"
        ? aValue.getTime() - bValue.getTime()
        : bValue.getTime() - aValue.getTime();
    }

    return 0;
  });
}

export function createIcon(iconDefinition: IconDefinition) {
  return ({ variant = "STROKE", fill = "currentColor", className, ...svgProps }: IconBaseProps) => {
    const icons: Record<IconVariant, JSX.Element> = iconDefinition;
    const baseIcon = icons[variant];
    
    const originalProps = baseIcon.props || {};
    
    const mergedProps = {
      ...originalProps,
      ...svgProps,
      className: className || originalProps.className,
      ...(variant === "STROKE" 
        ? { stroke: fill, fill: "none" } 
        : { fill: fill }
      )
    };

    return React.cloneElement(baseIcon, mergedProps);
  };
};