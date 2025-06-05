"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/app/Store/Slices/authSlice";
import { useRouter } from "next/navigation";

export default function Rightbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const currentUser = useSelector((state) => state.auth.user);
  const users = useSelector((state) => state.auth.allUsers);

  const handleLogout = async () => {
    await dispatch(logout());
    router.push("/Pages/Signup");
  };

  const otherUsers = users
    ?.filter((user) => user.uid !== currentUser?.uid)
    .slice(0, 5); // Show only 5 users

  return (
    <div className="px-2 pt-4">
      {/* Current User */}
      <div className="flex items-center justify-between w-[319px] h-[44px] mb-4">
        <div className="flex items-center">
          <img
            src={currentUser?.profilePic || "/default-profile.png"}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="ml-3 font-semibold">{currentUser?.username}</span>
        </div>
        <button
          onClick={handleLogout}
          className="text-blue-500 text-sm hover:underline"
        >
          Logout
        </button>
      </div>

      {/* Suggested Section */}
      <p className="text-sm text-gray-500 mb-2">Suggested for you</p>

      {/* Other Users */}
      {otherUsers?.map((user) => (
        <div
          key={user.uid}
          className="flex items-center justify-between w-[319px] h-[44px] mb-2"
        >
          <div className="flex items-center">
            <img
              src={user.profilePic || "/default-profile.png"}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="ml-3 font-semibold text-sm">{user.username}</span>
          </div>
          <button className="text-blue-500 text-sm hover:underline">
            Follow
          </button>
        </div>
      ))}
    </div>
  );
}
