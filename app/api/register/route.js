import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import dbConnect from '@/utils/dbConnect';
import User from '@/models/user';

export async function POST(req) {
  const _req = await req.json();

  await dbConnect();
  try {
    const { name, email, password } = _req;

    // check if user with email arleady exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { err: "Email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await new User({ name, email, password: hashedPassword });
    user.save();

    return NextResponse.json(
      { success: "Registration successful" }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { err: "Server ERror. Try again!" },
      { status: 500 }
    );
  }
}