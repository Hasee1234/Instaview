"use client";
import React from "react";

const ProfilePostModal = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-white rounded-lg overflow-hidden w-full max-w-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl font-bold"
        >
          ×
        </button>

        <div className="flex flex-col sm:flex-row">
          {/* Media */}
          <div className="flex-1 bg-black max-h-[500px] flex items-center justify-center">
            {post.mediaType === "video" ? (
              <video
                src={post.mediaUrl}
                controls
                autoPlay
                className="max-h-full w-full object-contain"
              />
            ) : (
              <img
                src={post.mediaUrl || post.imageURL}
                alt="Post"
                className="max-h-full w-full object-contain"
              />
            )}
          </div>

          {/* Post Details */}
          <div className="flex-1 p-4">
            <h2 className="font-semibold">@{post.username}</h2>
            <p className="mt-2 text-sm text-gray-700">{post.caption}</p>
            <p className="mt-4 text-xs text-gray-400">
              {new Date(
                post.createdAt?.seconds * 1000 || Date.now()
              ).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePostModal;
