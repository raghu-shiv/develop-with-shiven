// src/app/api/services/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { services } from '@/models/service'

export async function GET(req: NextRequest) {
  return NextResponse.json(services)
}
