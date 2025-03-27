import { NextResponse } from "next/server";
import { getEnv } from '@/env/server'
import { cookies } from 'next/headers'
import { AxiosError } from "axios";

import { STATE_COOKIE, CODE_VERIFIER_COOKIE } from '@/lib/gov-br'
import { ACCESS_TOKEN_COOKIE, ACCESS_TOKEN_EXPIRATION_DATE_COOKIE, api } from '@/lib/api'


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
    return NextResponse.redirect(new URL("/", env.NEXT_PUBLIC_URL_SERVICE));
  }

  if (receivedState !== state) {
    console.error("State mismatch");
    return NextResponse.redirect(new URL("/", env.NEXT_PUBLIC_URL_SERVICE));
  }

  try {
    // Call HCI API and get the token
    const response = await api.post(
      'auth/govbr/login/',
      { code, state, code_verifier: codeVerifier },
      { headers: { 'Content-Type': 'application/json' } }
    );
    
    // If Status is 200, set the token and expiration time
    if (response.status === 200) {
      const expirationTime = Date.now() + 1000 * 60 * response.data.token_expire_minutes // In miliseconds

      cookieStore.set(
        ACCESS_TOKEN_COOKIE, 
        response.data.access_token,
        {
          path: '/',
          expires: new Date(expirationTime)
        }
      );

      cookieStore.set(
        ACCESS_TOKEN_EXPIRATION_DATE_COOKIE,
        new Date(expirationTime).toISOString(),
        {
          path: '/',
          expires: new Date(expirationTime)
        },
      )
    } else {
      // Logout in the SSO
      const noAccessUrl = new URL('/auth/no-access', env.NEXT_PUBLIC_URL_SERVICE);
      const url = `/logout?post_logout_redirect_uri=${noAccessUrl.toString()}/`;
      console.log('Logout in the SSO:', JSON.stringify(new URL(url, env.NEXT_PUBLIC_URL_PROVIDER)));

      return NextResponse.redirect(new URL(url, env.NEXT_PUBLIC_URL_PROVIDER));
    }
  
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Erro na API: ", error.response?.data || error.message);
    } else if (error instanceof Error) {
      console.error("Erro inesperado: ", error.message);
    } else {
      console.error("Erro desconhecido", error);
    }
  }
  
  return NextResponse.redirect(new URL("/", env.NEXT_PUBLIC_URL_SERVICE));
}
