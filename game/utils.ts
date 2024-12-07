import { WebviewToBlockMessage } from "./shared";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { questionsList } from "./questions";

export const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

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

export function generateRandomQuestion(difficulty: "easy" | "medium" | "hard") {
  const filteredList = questionsList.filter(q => q.difficulty === difficulty)
  return filteredList[Math.floor(Math.random() * filteredList.length)];
}