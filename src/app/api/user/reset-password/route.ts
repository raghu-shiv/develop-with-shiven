import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/user';
import { getToken } from 'next-auth/jwt';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { currentPassword, newPassword } = await req.json();

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: 'Current password and new password are required.' }, { status: 400 });
  }

  const user = await User.findOne({ email: token.email });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);

  if (!isMatch) {
    return NextResponse.json({ error: 'Incorrect current password' }, { status: 400 });
  }

  if (newPassword.length < 8) {
    return NextResponse.json({ error: 'New password must be at least 8 characters long.' }, { status: 400 });
  }

  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

  user.password = hashedPassword;
  await user.save();

  return NextResponse.json({ message: 'Password updated successfully' });
}
catch (error) {
  console.error('Error updating password:', error);
  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
}
}