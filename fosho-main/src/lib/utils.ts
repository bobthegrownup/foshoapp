import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncate = (str: string, startLength = 10, endLength = 4) => {
  if (str.length <= startLength + endLength) {
    return str;
  }
  const start = str.slice(0, startLength);
  const end = str.slice(str.length - endLength);
  return `${start}...${end}`;
};
