"use server";

import { revalidatePath } from 'next/cache';

export async function getBlogs(searchParams) {
  const urlParams = {
    page: searchParams.page,
  };

  const searchQuery =  new URLSearchParams(urlParams).toString();
  const searchQueryAPI = `${process.env.api}/blog?${searchQuery}`;
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