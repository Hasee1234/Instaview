"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, fetchAllUsers, followUser, unfollowUser } from "@/app/Store/Slices/authSlice";
import { useRouter } from "next/navigation";
import defaultPic from "@/app/Assets/defaultpic.jpg";
import { UserPlus, UserCheck } from "lucide-react";
import LoaderPage from "@/app/Components/LoaderPage/LoaderPage";

export default function Rightbar({ onLoaded }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [localFollowing, setLocalFollowing] = useState([]);

  const currentUser = useSelector((state) => state.auth.user);
  const users = useSelector((state) => state.auth.allUsers);

  useEffect(() => {
    dispatch(fetchAllUsers());
    setMounted(true);
  }, [dispatch]);

  useEffect(() => {
    if (currentUser?.following) {
      setLocalFollowing(currentUser.following);
    }
  }, [currentUser]);

  // Redirect to login immediately if user is null
  useEffect(() => {
    if (mounted && !currentUser) {
      router.replace("/Pages/Login");
    }
  }, [mounted, currentUser, router]);

  // Call onLoaded when users are loaded (even if empty)
  useEffect(() => {
    if (mounted && users !== undefined && onLoaded) {
      onLoaded();
    }
  }, [mounted, users, onLoaded]);

  const handleFollow = async (targetUserId, e) => {
    e.stopPropagation();
    if (!currentUser?.uid) return;
    try {
      if (localFollowing.includes(targetUserId)) {
        await dispatch(unfollowUser({
          currentUserId: currentUser.uid,
          targetUserId
        })).unwrap();
        setLocalFollowing(prev => prev.filter(id => id !== targetUserId));
      } else {
        await dispatch(followUser({
          currentUserId: currentUser.uid,
          targetUserId
        })).unwrap();
        setLocalFollowing(prev => [...prev, targetUserId]);
      }
    } catch (error) {
      console.error("Follow action failed:", error);
    }
  };

  const handleLogout = async () => {
    await dispatch(logout());
    // router.replace will be triggered by the useEffect above
  };

  // const otherUsers = users
  //   ?.filter((user) => user.uid !== currentUser?.uid)
  //   .slice(0, 5);

  const otherUsers = users
  ?.filter(
    (u) =>
      u.uid !== currentUser?.uid &&
      !(Array.isArray(currentUser?.following) && currentUser.following.includes(u.uid))
  )
  .slice(0, 5);

  // Show loader until users are loaded (even if empty array)
  if (!mounted || users === undefined || !currentUser) {
    return <LoaderPage />;
  }

  return (
    <div className="px-2 pt-4">
      {/* Current User */}
      <div className="flex items-center justify-between w-[319px] h-[44px] mb-4">
        <div className="flex items-center">
          <img
            src={currentUser?.profilePic || defaultPic}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="ml-3 font-semibold">
            {currentUser?.name || currentUser?.username}
          </span>
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
      {otherUsers?.length > 0 ? (
        otherUsers.map((user) => {
          const isFollowing = localFollowing.includes(user.uid);
          return (
            <div 
              key={user.uid} 
              className="flex items-center justify-between w-[319px] h-[44px] mb-2 hover:bg-gray-100 rounded-md p-1 cursor-pointer"
              onClick={() => router.push(`/Pages/SearchProfile/${user.uid}`)}
            >
              <div className="flex items-center">
                <img
                  src={user.profilePic || defaultPic}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="ml-3">
                  <p className="font-semibold text-sm">
                    {user.name || user.username}
                  </p>
                  <p className="text-xs text-gray-500">Suggested for you</p>
                </div>
              </div>
              <button 
                onClick={(e) => handleFollow(user.uid, e)}
                className={`text-sm flex items-center gap-1 px-3 py-1 rounded-md ${
                  isFollowing 
                    ? 'text-gray-600 bg-gray-100 hover:bg-gray-200' 
                    : 'text-blue-500 hover:text-blue-600'
                }`}
              >
                {isFollowing ? (
                  <>
                    <UserCheck className="w-4 h-4" />
                    <span className="hidden sm:inline">Following</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span className="hidden sm:inline">Follow</span>
                  </>
                )}
              </button>
            </div>
          );
        })
      ) : (
        <p className="text-gray-400 text-sm">No users found.</p>
      )}
    </div>
  );
}