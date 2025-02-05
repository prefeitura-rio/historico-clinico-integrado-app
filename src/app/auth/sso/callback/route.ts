import { NextResponse } from "next/server";
import { getEnv } from '@/env/server'
import { cookies } from 'next/headers'
import { getToken } from '@/http/auth/sso/get-token-in-gov-br'

import { STATE_COOKIE, CODE_VERIFIER_COOKIE } from '@/lib/gov-br'


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

  // Acquire the token
  // const tokenResponse = await getToken({code, codeVerifier});
  // console.log(tokenResponse);

  return NextResponse.redirect(new URL("/", env.NEXT_PUBLIC_HCI_API_URL));

}
