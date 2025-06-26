"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "@/app/Config/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import Leftbar from "@/app/Components/Leftbar/Leftbar";
import ReelCard from "@/app/Components/ReelCard/ReelCard";

// Helper to detect video by extension or mediaType
const isVideoPost = (post) => {
  const url = post.mediaUrl || post.imageURL || "";
  return (
    post.mediaType === "video" ||
    /\.(mp4|webm|ogg)$/i.test(url)
  );
};

const Page = () => {
  const { user } = useSelector((state) => state.auth);
  const [reels, setReels] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [activeReel, setActiveReel] = useState(null);
  const [openComments, setOpenComments] = useState(null); // Track which reel's comments are open

  useEffect(() => {
    setHydrated(true);
    if (!user?.uid) return;

    const q = query(
      collection(db, "Posts"),
      where("uid", "==", user.uid)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedReels = snapshot.docs
        .map((doc) => {
          const data = doc.data();
          let createdAt = null;
          if (data.createdAt) {
            if (typeof data.createdAt.toDate === "function") {
              createdAt = data.createdAt.toDate();
            } else if (typeof data.createdAt === "string") {
              createdAt = new Date(data.createdAt);
            } else if (data.createdAt.seconds) {
              createdAt = new Date(data.createdAt.seconds * 1000);
            }
          }
          return {
            id: doc.id,
            ...data,
            createdAt,
          };
        })
        .filter(isVideoPost);
      setReels(fetchedReels);
    });

    return () => unsubscribe();
  }, [user]);

  if (!hydrated) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] h-screen">
      {/* Left Sidebar (same width as profile page) */}
      <div className="p-4 text-center hidden md:block">
        <Leftbar />
      </div>
    

      {/* Reels Feed */}
      <div className="flex flex-col items-center overflow-y-auto pt-12 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-bold mb-6">Your Reels</h2>
        {reels.length === 0 ? (
          <p className="text-gray-500">No reels posted yet.</p>
        ) : (
          <div className="w-full flex flex-col items-center space-y-16">
            {reels.map((reel) => (
                <ReelCard
                key={reel.id}
                post={reel}
                activeReel={activeReel}
                setActiveReel={setActiveReel}
                openComments={openComments === reel.id}
                setOpenComments={() =>
                    setOpenComments(openComments === reel.id ? null : reel.id)
                }
                />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;