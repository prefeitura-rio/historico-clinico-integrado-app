import { NextResponse } from "next/server";
import { getEnv } from '@/env/server'
const { govbrOauth } = require("govbr-oauth");


export async function GET() {
  const env = await getEnv()

  console.log("Opening gov.br login page")
  console.log(env.CLIENT_ID)

  const url = govbrOauth.authorize({
    URL_PROVIDER: env.URL_PROVIDER,
    URL_SERVICE: env.URL_SERVICE,
    REDIRECT_URI: env.NEXT_PUBLIC_HCI_API_URL + env.REDIRECT_PATH,
    SCOPES: env.SCOPES,
    CLIENT_ID: env.CLIENT_ID,
    SECRET: env.SECRET
  }) || "";

  // Return the url to the client
  return NextResponse.json({ url })
}
