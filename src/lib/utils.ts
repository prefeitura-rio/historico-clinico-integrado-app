import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {SHA256} from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
import WordArray from 'crypto-js/lib-typedarrays';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

function base64URL(value: WordArray): string {
  return value.toString(Base64)
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

export function generateCodeChallenge(codeVerifier: string): string {
  return base64URL(SHA256(codeVerifier));
}

export function generateCodeVerifier(): string {
  const rand = new Uint8Array(32);
  crypto.getRandomValues(rand);

  const wordArray = WordArray.create(rand);

  return base64URL(wordArray);
}
