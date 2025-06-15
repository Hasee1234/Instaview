"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "@/app/Store/Slices/feedSlice";
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal, Heart, MessageCircle } from "lucide-react";

export default function PostCard({ post }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user || null);
  const [showDelete, setShowDelete] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const isOwner = user?.uid === post.uid;

  const handleDelete = (id) => {
    if (user) {
      dispatch(deletePost({ postId: id, currentUserUid: user.uid }));
    }
  };

  const timeAgo = post.createdAt
    ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
    : "";

  return (
    <div className="bg-white border-x border-gray-300 rounded-md shadow-sm mb-6 w-full max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-2">
          <img
            src={post.profilePic || "/default-profile.png"}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-semibold">{post.username || "User"}</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-500 text-sm">{timeAgo}</span>
          <span className="text-gray-400">•</span>
          <button className="text-blue-500 font-semibold text-sm hover:underline">
            Follow
          </button>
        </div>

        <div className="relative">
          <button onClick={() => setShowDelete((prev) => !prev)}>
            <MoreHorizontal className="w-5 h-5 text-gray-600" />
          </button>
          {showDelete && isOwner && (
            <button
              onClick={() => handleDelete(post.id)}
              className="absolute right-0 mt-2 bg-white border border-gray-300 text-red-500 text-sm px-3 py-1 rounded shadow"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      {/* Post Media */}
      {post.imageURL && (
        <div className="w-full aspect-square bg-black flex items-center justify-center">
          <img
            src={post.imageURL}
            alt="Post"
            className="object-contain max-h-full max-w-full"
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="px-4 py-3 flex space-x-4">
        <Heart className="w-5 h-5 text-gray-600 cursor-pointer" />
        <MessageCircle className="w-5 h-5 text-gray-600 cursor-pointer" />
      </div>

      {/* Caption */}
<div className="px-4 text-left">
  <p className="text-sm">
    <span className="font-semibold">{post.username || "User"}</span>{" "}
    {post.caption}
  </p>
</div>


      {/* View all comments */}
      {post.comments?.length > 1 && (
        <div
          className="px-4 py-1 text-sm text-gray-500 cursor-pointer"
          onClick={() => setShowComments((prev) => !prev)}
        >
          View all {post.comments.length} comments
        </div>
      )}

      {/* One Sample Comment */}
      {post.comments?.length > 0 && (
        <div className="px-4 pb-4 text-sm">
          <span className="font-semibold">{post.comments[0].username}</span>{" "}
          {post.comments[0].text}
        </div>
      )}
    </div>
  );
}
