import Link from 'next/link'
import Image from 'next/image';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const defaultImg = "https://cdn.pixabay.com/photo/2012/04/24/12/29/no-symbol-39767_1280.png";

export default function BLogCard({ blog }) {
  return (
    <div className="card mb-4">
      <div style={{position: "relative", width: "100%", height: "200px" }} >
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
          <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
        </h5>
        <div className="card-text">
          <div dangerouslySetInnerHTML={{
            __html: blog.content.length > 160 
              ? `${blog.content.substring(0, 161)}...` 
              : blog.content
          }} />
        </div>
        <div className="card-footer d-flex justify-content-between">
          <small className="text-muted">Category: {blog.category}</small>
          <small className="text-muted">
            Author: { blog?.postedBy.name || "Admin"}
          </small>
        </div>

        <div className="card-footer d-flex justify-content-between">
          <small className="text-muted">
            {blog?.likes?.length} likes
          </small>
          <small className="text-muted">
            Posted: {dayjs(blog.createdAt).fromNow()}
          </small>
      
        </div>
      </div>
    </div>
  );
}