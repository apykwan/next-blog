import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

import dbConnect from '@/utils/dbConnect';
import Blog from '@/models/blog';

export async function PUT(req, context) {
  await dbConnect();
  // console.log('context params => ', context.params);

  const _req = await req.json();

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      context.params.id, 
      _req, 
      { new: true }
    );

    revalidatePath('/dashboard/admin/blog/list');
    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err: "An error occurred. Try again." }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  await dbConnect();
  try {
    const deleteBlog = await Blog.findByIdAndDelete(context.params.id);

    revalidatePath('/dashboard/admin/blog/list');
    return NextResponse.json(deleteBlog, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err: "An error occurred. Try again." }, { status: 500 });
  }
}