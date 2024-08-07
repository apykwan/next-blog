"use server";

import { revalidatePath } from 'next/cache';

export async function getBlogs(searchParams) {
  const urlParams = {
    page: searchParams.page || 1,
  };

  const searchQuery =  new URLSearchParams(urlParams).toString();
  const searchQueryAPI = `${process.env.NEXT_PUBLIC_API_URL}/blog?${searchQuery}`;
  const response = await fetch(searchQueryAPI, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    next: { revalidate: 1 }
  });

  if (!response.ok) throw new Error("Failed to fetch blogs");

  const data = await response.json();
  revalidatePath('/'); 
  return data;
}