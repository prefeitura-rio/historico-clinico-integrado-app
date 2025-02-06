import { NextResponse } from "next/server";
import { getEnv } from '@/env/server'
import { cookies } from 'next/headers'
import { getToken } from '@/http/auth/sso/get-token-in-gov-br'

import { STATE_COOKIE, CODE_VERIFIER_COOKIE } from '@/lib/gov-br'
import { ACCESS_TOKEN_COOKIE } from '@/lib/api'


export async function GET(request: Request) {
  const env = await getEnv()
  const url = new URL(request.url);

  const code = url.searchParams.get("code") as string;
  const receivedState = url.searchParams.get("state") as string;

  const cookieStore = await cookies();
  const state = cookieStore.get(STATE_COOKIE)?.value;
  const codeVerifier = cookieStore.get(CODE_VERIFIER_COOKIE)?.value;

  if (!state || !codeVerifier) {
    console.error("State or codeVerifier not found");
    return NextResponse.redirect(new URL("/", env.NEXT_PUBLIC_HCI_API_URL));
  }

  if (receivedState !== state) {
    console.error("State mismatch");
    return NextResponse.redirect(new URL("/", env.NEXT_PUBLIC_HCI_API_URL));
  }

  // Call HCI API and get the token
  const tokenResponse = await fetch(`${env.NEXT_PUBLIC_HCI_API_URL}/auth/govbr/login`, {
    method: "POST",
    body: JSON.stringify({ code, state, codeVerifier }),
  });

  if (!tokenResponse.ok) {
    console.error("Failed to get token");
  }else{
    const result = await tokenResponse.json()
    const token = result.access_token;
    const expirationTime = result.expires_in;
    console.log(token, expirationTime);

    cookieStore.set(ACCESS_TOKEN_COOKIE, token, {
      path: '/',
      expires: new Date(expirationTime),
    })
  }

  return NextResponse.redirect(new URL("/", env.NEXT_PUBLIC_HCI_API_URL));
}
