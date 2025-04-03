import { NextResponse } from "next/server";
import { getEnv } from '@/env/server'
import { cookies } from 'next/headers'

import { STATE_COOKIE, CODE_VERIFIER_COOKIE } from '@/lib/gov-br'
import { ACCESS_TOKEN_COOKIE, ACCESS_TOKEN_EXPIRATION_DATE_COOKIE, NO_ACCESS_COOKIE, api } from '@/lib/api'

export async function GET(request: Request) {
  const env = await getEnv()
  const url = new URL(request.url);

  const code = url.searchParams.get("code") as string;
  const receivedState = url.searchParams.get("state") as string;

  // Obtenha os cookies para leitura (não para escrita)
  const cookieStore = cookies();
  const state = cookieStore.get(STATE_COOKIE)?.value;
  const codeVerifier = cookieStore.get(CODE_VERIFIER_COOKIE)?.value;

  console.error('Entered Callback Route');

  if (!state || !codeVerifier) {
    console.error("State or codeVerifier not found");
    return NextResponse.redirect(new URL("/", env.NEXT_PUBLIC_URL_SERVICE));
  }

  if (receivedState !== state) {
    console.error("State mismatch");
    return NextResponse.redirect(new URL("/", env.NEXT_PUBLIC_URL_SERVICE));
  }

  // Chama a API para obter o token
  const response = await api.post(
    'auth/govbr/login/',
    { code, state, code_verifier: codeVerifier },
    { headers: { 'Content-Type': 'application/json' } }
  );

  console.error('Login response:', JSON.stringify(response.data));
  console.error('Login status:', response.status);
  
  if (response.status === 200) {
    const expirationTime = Date.now() + 1000 * 60 * response.data.token_expire_minutes;
    
    // Cria uma resposta de redirecionamento
    const redirectResponse = NextResponse.redirect(new URL("/", env.NEXT_PUBLIC_URL_SERVICE));

    // Define os cookies usando o objeto de resposta
    redirectResponse.cookies.set(
      ACCESS_TOKEN_COOKIE, 
      response.data.access_token,
      {
        path: '/',
        expires: new Date(expirationTime)
      }
    );

    redirectResponse.cookies.set(
      ACCESS_TOKEN_EXPIRATION_DATE_COOKIE,
      new Date(expirationTime).toISOString(),
      {
        path: '/',
        expires: new Date(expirationTime)
      },
    );

    console.info('Token and expiration time set');
    return redirectResponse;
  } else {
    console.error('Login was not approved by the API');
    const signInUrl = new URL('/auth/sign-in', env.NEXT_PUBLIC_URL_SERVICE);
    const logoutUrl = `/logout?post_logout_redirect_uri=${signInUrl.toString()}`;
    
    // Cria a resposta de redirecionamento para o logout
    const redirectResponse = NextResponse.redirect(new URL(logoutUrl, env.NEXT_PUBLIC_URL_PROVIDER));

    // Exclui os cookies através do objeto de resposta
    redirectResponse.cookies.delete(ACCESS_TOKEN_COOKIE);
    redirectResponse.cookies.delete(ACCESS_TOKEN_EXPIRATION_DATE_COOKIE);

    // Define o cookie de acesso negado
    redirectResponse.cookies.set(
      NO_ACCESS_COOKIE,
      'true',
      {
        path: '/'
      }
    )

    console.info('Logout in the SSO:', JSON.stringify(new URL(logoutUrl, env.NEXT_PUBLIC_URL_PROVIDER)));
    return redirectResponse;
  }
}