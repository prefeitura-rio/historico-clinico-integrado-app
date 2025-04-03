import { NextResponse } from "next/server";
import { getEnv } from '@/env/server'
import { cookies } from 'next/headers'

import { STATE_COOKIE, CODE_VERIFIER_COOKIE } from '@/lib/gov-br'
import { generateCodeChallenge, generateCodeVerifier} from '@/lib/utils'

export async function GET() {
  const env = await getEnv()

  const redirectUri = new URL(env.NEXT_PUBLIC_REDIRECT_PATH, env.NEXT_PUBLIC_URL_SERVICE).toString();
  const randomNonce = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  const randomState = Math.floor(Math.random() * 1000).toString();
  const codeVerifier = generateCodeVerifier();

  const cookieStore = await cookies()
  cookieStore.set(STATE_COOKIE, randomState)
  cookieStore.set(CODE_VERIFIER_COOKIE, codeVerifier)

  const params: Record<string, string> = {
    response_type: 'code',
    client_id: env.CLIENT_ID,
    scope: env.NEXT_PUBLIC_SCOPES,
    redirect_uri: redirectUri,
    nonce: randomNonce,
    state: randomState,
    code_challenge: generateCodeChallenge(codeVerifier),
    code_challenge_method: 'S256',
  };

  const url = new URL('/authorize', env.NEXT_PUBLIC_URL_PROVIDER);
  Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));

  // Return the url to the client
  return NextResponse.json({ url })

}
