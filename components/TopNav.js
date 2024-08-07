import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

import { useSearch } from '@/context/search';

export default function TopNav() {
  const { data, status } = useSession();
  // console.log("data: ", data, "status: ", status);

  const { searchQuery, setSearchQuery, fetchSearchResults } = useSearch();

  return (
    <nav className="nav shadow p-2 justify-content-between mb-3">
      <Link className="nav-link" href="/">BLOG</Link>

      <form className="d-flex mb-0" role="search" onSubmit={fetchSearchResults}>
        <input 
          type="search" 
          className="form-control" 
          placeholder="search" 
          aria-label="search" 
          onChange={e => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        <button className="btn">
          &#128270;
        </button>
      </form>
      {status === "loading" 
        ? null 
        : status === "authenticated" ? (
          <div className="d-flex">
            <Link 
              className="nav-link" 
              href={`/dashboard/${data?.user?.role === "admin" ? "admin" : "user"}`}
            >
              {data?.user?.name || "Dashboard"} ({ data?.user?.role })
            </Link>
            <a 
              className="nav-link pointer"
              style={{ color: "crimson" }} 
              onClick={signOut.bind(null, { callbackUrl: "/login" })}
            >
              Logout
            </a>
          </div>
        ): (
          <div className="d-flex">
            <Link className="nav-link" href="/login">Login</Link>
            <Link className="nav-link" href="/register">Register</Link>
          </div>
        )
      }
    </nav>
  );
}