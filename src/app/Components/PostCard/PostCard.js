"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "@/app/Store/Slices/feedSlice";

export default function PostCard({ post }) {
  const dispatch = useDispatch();
const user = useSelector((state) => state.auth?.user || null);

  const handleDelete = (id) => {
  if (user) {
    dispatch(deletePost({ postId: id, currentUserUid: user.uid }));
  }
};


  const isOwner = user?.uid === post.uid; // check ownership

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 w-full max-w-md relative mx-auto">
      {/* User Info */}
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
        <span className="ml-3 font-semibold">{post.username || "Anonymous"}</span>

        {isOwner && (
          <button
            className="bg-gray-300 absolute right-0 mr-5 hover:bg-gray-500 px-2 py-1 rounded"
            onClick={() => handleDelete(post.id)}
          >
            Delete post
          </button>
        )}
      </div>

      {/* Post Image */}
      {post.imageURL && (
        <div className="w-full h-64 overflow-hidden rounded-md mb-3">
          <img
            src={post.imageURL}
            alt="Post"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Caption */}
      <p className="text-sm text-gray-700">
        <strong>{post.username || "User"}:</strong> {post.caption}
      </p>

      {/* Location & Date */}
      {post.location && (
        <p className="text-xs text-gray-500 mt-1">📍 {post.location}</p>
      )}
      {post.createdAt && (
        <p className="text-xs text-gray-400 mt-1">
          {new Date(post.createdAt).toLocaleString()}
        </p>
      )}
    </div>
  );
}
