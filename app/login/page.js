"use client"

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState("");
  const [ password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  async function handleSubmit (e) {
    // prevent page reload
    e.preventDefault();

    try {
      setLoading(true);
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      setLoading(false);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Login successfully");
        router.push(callbackUrl);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("An error occurred. Try again.")
    }
  }

  return (
    <div className="container">
      <div className="d-flex row justify-content-center align-items-center mx-auto w-50 vh-100">
        <div className="col-lg-5 bg-light p-5 shadow">
          <p className="lead">Login</p>

          <form onSubmit={handleSubmit}>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              className="form-control mb-2"
              placeholder="Enter your email"
            />
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="form-control mb-2"
              placeholder="Enter your password"
            />

            <button 
              className="btn btn-primary" 
              disabled={loading || !email || !password}
            >
              {loading ? 'Please wait...' : 'Submit'}
            </button>
          </form>

          <button 
            className="btn btn-outline-primary" 
            onClick={signIn.bind(null, "google", { callbackUrl })}
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}