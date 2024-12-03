import { WebviewToBlockMessage } from "./shared";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sendToDevvit(event: WebviewToBlockMessage) {
  window.parent?.postMessage(event, "*");
}

export const VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);

export function isVowel(char: string): boolean {
  return VOWELS.has(char.toUpperCase());
};