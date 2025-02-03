'use client'
import { env } from '@/env/client'

const { govbrOauth } = require("govbr-oauth");


export async function signInWithGovBr() {
    console.log("Trying to sign in with gov.br")
    console.log(env.CLIENT_ID)

    const url = govbrOauth.authorize({
      URL_PROVIDER: env.URL_PROVIDER,
      URL_SERVICE: env.URL_SERVICE,
      REDIRECT_URI: env.NEXT_PUBLIC_HCI_API_URL + env.REDIRECT_PATH,
      SCOPES: env.SCOPES,
      CLIENT_ID: env.CLIENT_ID,
      SECRET: env.SECRET
    }) || "";
  
    window.open(url, "_self");
  }