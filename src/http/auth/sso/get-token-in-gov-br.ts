'use server'

import { apiGovBr } from '@/lib/gov-br'
import { getEnv } from '@/env/server'

interface GetTokenRequest {
    code: string,
    codeVerifier: string
}

interface GetTokenResponse {
    access_token: string
    id_token: string
    token_type: string
    expires_in: number
}

export async function getToken({
    code,
    codeVerifier
}: GetTokenRequest) {
    const env = await getEnv()


    const redirectUri = env.NEXT_PUBLIC_URL_SERVICE + env.NEXT_PUBLIC_REDIRECT_PATH
    const clientId = env.CLIENT_ID
    const clientSecret = env.SECRET

    const authorization = Buffer.from(clientId + ":" + clientSecret).toString('base64');

    const response = await apiGovBr.post<GetTokenResponse>(
        '/token',
        {
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': redirectUri,
            'code_verifier': codeVerifier,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' : `Basic ${authorization}`
          },
        },
    )

    return response.data
}
