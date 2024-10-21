import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json()
    // Handle storing the contact message or sending an email here
    return NextResponse.json({ message: 'Message sent successfully!' })
  } catch (error) {
    return NextResponse.error()
  }
}
