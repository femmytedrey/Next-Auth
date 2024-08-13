"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      toast.success(response.data.message)
      router.push("/profile")
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to login.")
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div> {loading && <h1>Logging in...</h1>}</div>
      <h1>Login</h1>
      <hr />

      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="text-black p-2 border boder-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        placeholder="email"
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="text-black p-2 border boder-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        placeholder="password"
      />
      <button
        onClick={onLogin}
        className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600  ${
          buttonDisabled ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        disabled={buttonDisabled}
      >
        {buttonDisabled ? "enter credentials" : "Login"}
      </button>
      <Link href="/signup">Signup here</Link>
      <p>Don't remember your password? <Link className="text-blue-500" href="/forgotpassword">click here</Link></p>
    </div>
  );
};

export default LoginPage;
