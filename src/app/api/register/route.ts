import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()
    // Handle user registration here
    return NextResponse.json({ message: 'Registered successfully!' })
  } catch (error) {
    return NextResponse.error()
  }
}
