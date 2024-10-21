import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/user';
import { getToken } from 'next-auth/jwt';

export async function PUT(req: NextRequest) {
  await dbConnect();

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { name, age, gender, location } = await req.json();

    // Basic validation
    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Invalid name' }, { status: 400 });
    }
    if (age && typeof age !== 'number') {
      return NextResponse.json({ error: 'Invalid age' }, { status: 400 });
    }
    if (gender && typeof gender !== 'string') {
      return NextResponse.json({ error: 'Invalid gender' }, { status: 400 });
    }
    if (location && typeof location !== 'string') {
      return NextResponse.json({ error: 'Invalid location' }, { status: 400 });
    }

    const user = await User.findOneAndUpdate(
      { email: token.email },
      { name, age, gender, location },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}