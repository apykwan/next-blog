import { NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt";

import dbConnect from '@/utils/dbConnect';
import Blog from '@/models/blog';

export async function PUT(req) {
  await dbConnect();
  const { blogId } = await req.json();

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  try {
    const updated = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: token.user._id },
      },
      { new: true }
    );
    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { err: "Server error. Try again." },
      { status: 500 }
    );
  }
}