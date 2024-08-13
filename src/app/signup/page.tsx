"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
//import toast from "react-hot-toast";

const signupPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      toast.success(response.data.message);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div> {loading && <h1>Signing up...</h1>}</div>
      <h1>Signup</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="text-black p-2 border boder-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        placeholder="username"
      />

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
        onClick={onSignUp}
        className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600  ${
          buttonDisabled ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        disabled={buttonDisabled}
      >
        {buttonDisabled ? "No available user" : "Signup here"}
      </button>
      <Link href="/login">login here</Link>
    </div>
  );
};

export default signupPage;
