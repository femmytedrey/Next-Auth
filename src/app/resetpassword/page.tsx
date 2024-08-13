"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  // Extract token from URL
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    if (!urlToken) {
      toast.error("Invalid token");
    } else {
      setToken(urlToken);
    }
  }, []);

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.patch("/api/users/resetpassword", {
        token,
        password,
      });
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Failed to reset password.");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-4">Reset Your Password</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "No token"}
      </h2>

      {loading ? (
        <div className="w-full max-w-md text-center">
          <p className="text-gray-600 mb-4">Processing...</p>
        </div>
      ) : token ? (
        <div className="w-full max-w-md">
          <label
            htmlFor="password"
            className="block text-white text-sm font-bold mb-2"
          >
            New Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your new password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setPassword(e.target.value)}
          />

          <label
            htmlFor="confirm-password"
            className="block text-white text-sm font-bold mb-2"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm your new password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            onClick={handleResetPassword}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md text-center">
          <p className="text-red-500 mb-4">Invalid or expired token.</p>
          <Link
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            href="/forgot-password"
          >
            Go Back
          </Link>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
