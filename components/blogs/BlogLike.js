'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FaHeart } from "react-icons/fa";

const blogLikeAPI = `${process.env.API}/user/blog/like`;
const blogUnlikeAPI = `${process.env.API}/user/blog/unlike`;

export default function BlogLike({ blog }) {
  const { data, status } = useSession();
  const [likes, setLikes] = useState(blog?.likes);

  const router = useRouter();
  const pathname = usePathname();
  const isLiked = likes?.includes(data?.user?._id);

  async function handleLike() {
    if (status !== "authenticated") {
      toast.error("Please login to like this blog");
      router.push(`/login?callbackUrl=${pathname}`);
      return;
    }

    try {
      if (isLiked) {
        // already liked? unlike
        const answer = window.confirm("Are you sure you want to unlike?");
        if (answer) {
          await handleUnlike();
        }
      } else {
        // like
        const response = await fetch(blogLikeAPI, {
          method: "PUT",
          headers: {
            "Content-Type": "appilcation/json"
          },
          body: JSON.stringify({ blogId: blog?._id })
        });

        if (!response.ok) {
          toast.error('Failed to like blog');
          throw new Error(`Failed to like blog`);
        } 

        const data = await response.json();
        setLikes(data.likes);
        toast.success("You liked the blog");
        router.refresh();
      }
    } catch (err) {
      console.log(err);
      toast.error("Error liking blog");
    }
  }

  async function handleUnlike () {
    try {
      const response = await fetch(blogUnlikeAPI, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blogId: blog?._id }),
      });

      if (!response.ok) {
        toast.error("Failed to like blog");
        throw new Error(`Failed to like blog`);
      } 

      const data = await response.json();
      setLikes(data.likes);
      toast.success("You Unliked the blog");
      router.refresh();
    } catch (err) {
      console.log(err);
      toast.error("Error liking blog");
    }
  }

  return (
    <>
      <small className="text-muted">
        <span onClick={handleLike}>
          <FaHeart className="text-danger" /> {blog?.likes?.length} likes
        </span>
      </small>
    </>
  );
}