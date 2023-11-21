import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const char_set =
  "abcdefghijlkmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
export function max_random_number(max: number) {
  return Math.floor(Math.random() * max);
}
export function gen_random_string(length: number) {
  let random_string = "";
  for (let i = 0; i < length; i++) {
    random_string += char_set[max_random_number(char_set.length - 1)];
  }

  return random_string;
}
