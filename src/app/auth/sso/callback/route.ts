import { NextResponse } from "next/server";
import { getEnv } from '@/env/server'
import { cookies } from 'next/headers'

import { STATE_COOKIE, CODE_VERIFIER_COOKIE } from '@/lib/gov-br'
import { ACCESS_TOKEN_COOKIE, api } from '@/lib/api'


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
  
    console.log("Response: ", response?.data);
  
    if (response?.data?.access_token) {
      cookieStore.set(
        ACCESS_TOKEN_COOKIE, 
        response.data.access_token,
        {
          path: '/',
          expires: response.data.expirationTime ? new Date(response.data.expirationTime) : undefined
        }
      );
    } else {
      console.warn("Resposta sem access_token:", response?.data);
      alert("Erro ao processar resposta do Gov.br");
    }
  
  } catch (error: any) {
    console.error("Failed in: ", JSON.stringify({ code, state, code_verifier: codeVerifier }));
    console.error("Error: ", error.response?.data || error.message);
    alert("Erro ao tentar logar com o Gov.br");
  }
  

  return NextResponse.redirect(new URL("/", env.NEXT_PUBLIC_URL_SERVICE));
}
