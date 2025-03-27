'use client'

export async function signInWithGovBr() {
  const response = await fetch("/auth/sso/authenticate")
  const data = await response.json()
  const url = data.url

  window.open(url, "_self");
}