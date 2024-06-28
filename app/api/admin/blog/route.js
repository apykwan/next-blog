import { NextResponse } from 'next/server';
import slugify from 'slugify';
import { getToken } from "next-auth/jwt";

import dbConnect from '@/utils/dbConnect';
import Blog from '@/models/blog';

export async function POST(req) {
  const _req = await req.json();
  await dbConnect();

  try {
    const { title, content, category, image } = _req;

    if (!title)
      return NextResponse.json({ err: "Title is required" }, { status: 400 });

    if (!content)
      return NextResponse.json({ err: "Content is required" }, { status: 400 });

    if (!category)
      return NextResponse.json({ err: "Category is required" }, { status: 400 });

    // check if blog title is taken
    const existingBlog = await Blog.findOne({ slug: slugify(title?.toLowerCase()) });
    if (existingBlog) {
      return NextResponse.json(
        { err: "Blog title is taken" },
        { status: 400 }
      );
    }

    // get current user's id
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET
    });

    console.log("token: ", token)
    // create blog
    const blog = await Blog.create({
      title,
      content,
      category,
      image: image ? image : "",
      postedBy: token.user._id,
      slug: slugify(title)
    });

    return NextResponse.json(blog, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}