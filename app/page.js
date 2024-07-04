import Link from "next/link";

import BlogList from '@/components/blogs/BlogList';
import * as actions from '@/actions';

export default async function Home({ searchParams }) {
  const queryPage = searchParams?.page || "1";
  const data = await actions.getBlogs({ page: queryPage });
  // console.log('data in home page => ', data);
  const { blogs, currentPage, totalPages } = data;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return (
    <div className="container">
      <p className="lead text-primary text-center">Home</p>
      <BlogList blogs={blogs} />

      <div className="d-flex justify-content-center">
        <nav aria-label="Page navigation">
          <ul className="pagination">
            {hasPreviousPage && (
              <li className="page-item">
                <Link className="page-link px-3" href={`?page=${currentPage - 1}`}>
                  Previous
                </Link>
              </li>
            )}
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;

              return (
                <li 
                  key={page} 
                  className={`page-item ${currentPage === page ? "active" : ""}`}
                >
                  <Link className="page-link px-3" href={`?page=${page}`}>{page}</Link>
                </li>
              );
            })}
            {hasNextPage && (
              <li className="page-item">
                <Link className="page-link px-3" href={`?page=${currentPage + 1}`}>
                  Next
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
      
    </div>
  );
}
