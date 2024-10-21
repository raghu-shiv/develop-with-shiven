import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  console.log('Request Pathname:', pathname);
  
  return NextResponse.next();
}