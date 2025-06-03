"use client";
import { getposts } from "@/app/Store/Slices/feedSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../PostCard/PostCard";
export default function FeedListing() {
  const feed = useSelector((store) => store.feed.feed);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getposts());
  }, []);

  return (
    <div className="flex flex-col items-center px-4">
      {feed?.length === 0 && <p>No posts available</p>}
      {feed?.map((post,index) => (
        <PostCard key={post.id || index} post={post} />
      ))}
    </div>
  );
}
