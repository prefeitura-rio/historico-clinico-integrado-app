import { NextResponse } from "next/server";
import { getEnv } from '@/env/server'
const { govbrOauth } = require("govbr-oauth");


export async function GET(request: Request) {
  const env = await getEnv()
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  console.log(code);

  const config = {
    URL_PROVIDER: env.URL_PROVIDER,
    URL_SERVICE: env.URL_SERVICE,
    REDIRECT_URI: env.NEXT_PUBLIC_HCI_API_URL + env.REDIRECT_PATH,
    SCOPES: env.SCOPES,
    CLIENT_ID: env.CLIENT_ID,
    SECRET: env.SECRET
  }
  // Acquire the token
  const token = await govbrOauth.getToken(config, code);
  console.log(token);

  // Acquire the user info
  const user = await govbrOauth.getUserInfo(token);
  console.log(user);

  return NextResponse.redirect(new URL("/", env.NEXT_PUBLIC_HCI_API_URL));

}
