"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const resetEmail = async () => {
    try {
      setLoading(true);
      const result = await axios.post("/api/users/sendresetpassword", { email });
      toast.success(result.data.message);
      setEmailSent(true);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to send reset link.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {loading && <h1>Sending reset link...</h1>}
      {!emailSent ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">Forgot Your Password?</h1>
          <p className="text-gray-600 mb-6">
            No worries, we’ll send you a reset link.
          </p>

          <div className="w-full max-w-md">
            <label
              htmlFor="email"
              className="block text-white text-sm font-bold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your registered email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={resetEmail}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${
                buttonDisabled ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              disabled={buttonDisabled}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Check Your Email</h1>
          <p className="text-gray-600 mb-6">
            We have sent you a reset link. Please check your email and follow
            the instructions to reset your password.
          </p>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
