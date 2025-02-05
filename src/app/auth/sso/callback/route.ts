import { NextResponse } from "next/server";
import { getEnv } from '@/env/server'
import { cookies } from 'next/headers'
import { getToken } from '@/http/auth/sso/get-token-in-gov-br'

import { STATE_COOKIE, CODE_CHALLENGE_COOKIE } from '@/lib/gov-br'


export async function GET(request: Request) {
  const env = await getEnv()
  const url = new URL(request.url);
  const code = url.searchParams.get("code") as string;

  const cookieStore = await cookies();
  const state = cookieStore.get(STATE_COOKIE);
  const codeChallenge = cookieStore.get(CODE_CHALLENGE_COOKIE);

  // Acquire the token
  const tokenResponse = await getToken({code});
  console.log(tokenResponse);

  return NextResponse.redirect(new URL("/", env.NEXT_PUBLIC_HCI_API_URL));

}
