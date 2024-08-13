"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const userProfile = () => {
  const [data, setData] = useState("nothing");
  const [name, setName] = useState("user");
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    setData(res.data.info._id);
    setName(res.data.info.username);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Profile Page</h1>
      <p>Welcome to <span>{name === "user" ? "user's" : `${name}'s`}</span> profile</p>

      <h2 className="mt-4">
        {data === "nothing" ? (
          "No Id"
        ) : (
          <Link className="p-3 bg-teal-600 rounded " href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>

      <hr />
      <Link
        className="p-2 rounded bg-white text-black mt-4 hover:bg-white/90"
        href="/login"
        onClick={logout}
      >
        Logout
      </Link>
      <button className="p-2 bg-red-500 mt-4 rounded" onClick={getUserDetails}>Get user</button>
    </div>
  );
};

export default userProfile;
