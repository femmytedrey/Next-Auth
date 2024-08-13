"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      toast.success(response.data.message);
      router.push("/profile");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to login.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {loading && <h1>Logging in...</h1>}
      <h1 className="text-2xl mb-4">Login</h1>
      <hr className="my-4" />

      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="text-black p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        placeholder="Email"
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="text-black p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        placeholder="Password"
      />
      <button
        onClick={onLogin}
        className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${buttonDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
        disabled={buttonDisabled}
      >
        {buttonDisabled ? "Enter credentials" : "Login"}
      </button>
      <Link href="/signup" className="text-blue-500">Signup here</Link>
      <p className="mt-4">Dont remember your password? <Link className="text-blue-500" href="/forgotpassword">Click here</Link></p>
    </div>
  );
};

export default LoginPage;
