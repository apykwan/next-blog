"use client";

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

import BlogList from '@/components/blogs/BlogList';

const fetchBlogsAPI = `${process.env.NEXT_PUBLIC_API_URL}/user/liked-blogs`;

export default function UserDashboard() {
  const [likedBlogs, setLikedBlogs] = useState([]);

  async function fetchBlogs () {
    try {
      const response = await fetch(fetchBlogsAPI);

      if (!response.ok) {
        toast.error("Failed to fetch liked blogs");
        throw new Error("Failed to fetch liked blogs");
      }

      const data = await response.json();
      setLikedBlogs(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <p className="lead mb-2">Liked Blogs</p>
          <BlogList blogs={likedBlogs} />
        </div>
      </div>
    </div>
  )
}