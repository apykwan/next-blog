
import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FaHeart } from "react-icons/fa";

dayjs.extend(relativeTime);
const defaultImg = "https://cdn.pixabay.com/photo/2012/04/24/12/29/no-symbol-39767_1280.png";

async function getBlog(slug) {
  const slugAPI = `${process.env.API}/blog/${slug}`;
  const response = await fetch(slugAPI, {
    method: "GET",
    next: { reavalidate: 1 }
  });

  const data = await response.json();
  return data;
}

export default async function BlogViewPage({ params }) {
  const blog = await getBlog(params.slug);

  return (
    <main>
      <div className="container mb-5">
        <div className="card">
          <div style={{ position: "relative", height: "300px"  }} >
            <Image 
              src={blog?.image || defaultImg} 
              fill
              style={{ objectFit: 'cover' }} 
              className="card-img-top"
              alt={blog.title}
            />
          </div>
          
          <div className="card-body">
            <h5 className="card-title">
              <Link href={`/blog/${blog?.slug}`}>{blog.title}</Link>
            </h5>

            <div className="card-text">
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
            <div className="card-footer d-flex justify-content-between">
              <small className="text-muted">Category: {blog.category}</small>
              <small className="text-muted">
                Author: { blog?.postedBy.name || "Admin"}
              </small>
            </div>
            <div className="card-footer d-flex justify-content-between">
              <small className="text-muted">
                <FaHeart className="mr-1 text-danger" />
                {blog?.likes?.length} likes
              </small>
              <small className="text-muted">
                Posted: {dayjs(blog.createdAt).fromNow()}
              </small>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 