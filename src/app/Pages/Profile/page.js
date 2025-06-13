"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "@/app/Config/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const Page = () => {
  const { user } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!user?.uid) return;

    const q = query(
      collection(db, "posts"),
      where("uid", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(fetchedPosts);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
        <img
          src={user?.photoURL || "/default-avatar.png"}
          alt="Profile"
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover"
        />
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-2xl font-semibold">{user?.username || "Username"}</h2>
          <div className="flex justify-center sm:justify-start gap-6 my-2 text-sm">
            <span><strong>{posts.length}</strong> posts</span>
            <span><strong>120</strong> followers</span>
            <span><strong>180</strong> following</span>
          </div>
          <p className="text-sm text-gray-700">
            {user?.bio || "This is your bio. Add something cool!"}
          </p>
        </div>
      </div>

      {/* Post Grid */}
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-1">
          {posts.map((post) => (
            <div key={post.id} className="relative aspect-square bg-gray-100 overflow-hidden">
              {post.mediaType === "video" ? (
                <video
                  src={post.mediaUrl}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={post.mediaUrl}
                  alt="Post"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
