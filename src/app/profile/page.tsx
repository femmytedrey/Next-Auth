"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserProfile = () => {
  const [data, setData] = useState<string | null>(null);
  const [name, setName] = useState<string>("user");
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setData(res.data.info._id);
      setName(res.data.info.username);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch user details");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl mb-4">Profile Page</h1>
      <p className="mt-5">
        Welcome to <span>{name === "user" ? "users" : `${name}s`}</span> profile
      </p>

      <h2 className="mt-4">
        {data ? (
          <Link className="p-3 bg-teal-600 text-white rounded" href={`/profile/${data}`}>
            {data}
          </Link>
        ) : (
          "No Id"
        )}
      </h2>

      <hr className="my-4" />
      <button
        className="p-2 bg-red-500 text-white rounded mt-4"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
