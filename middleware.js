import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose';

export async function middleware(request) {

  const token = request.cookies.get('authUserToken')

  if (token === undefined) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode('secretkey'))
    return NextResponse.next()
  } catch (error) {
    console.log(error)
    return NextResponse.redirect(new URL('/login', request.url))
  }

}

export const config = {
  matcher: ['/dashboard', '/']
}