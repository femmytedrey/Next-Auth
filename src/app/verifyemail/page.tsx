"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const [verified, setVerified] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      toast.success(response?.data?.message);
      setError(false);
    } catch (error: any) {
      setError(true);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  //check if theres token and verify the user
  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "No token"}
      </h2>

      {verified && (
        <div className="bg-green-500 p-2 text-white">
          <p>Email verified successfully</p>
          <Link href="/login">Login</Link>
        </div>
      )}

      {error && (
        <div className="bg-red-500 p-2 text-white">
          <p>Invalid token</p>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
