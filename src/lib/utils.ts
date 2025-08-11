import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CoreMessage, ToolModelMessage, generateId, UIMessage } from "ai";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
