import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function TopNav() {
  const { data, status } = useSession();
  console.log("data: ", data, "status: ", status);

  return (
    <nav className="nav shadow p-2 justify-content-between mb-3">
      <Link className="nav-link" href="/">BLOG</Link>
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