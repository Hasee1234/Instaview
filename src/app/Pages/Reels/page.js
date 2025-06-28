

"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "@/app/Config/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import ReelCard from "@/app/Components/ReelCard/ReelCard";
import Leftbar from "@/app/Components/Leftbar/Leftbar";
import CreatePost from "@/app/Components/CreatePost/CreatePost";

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
  const [openComments, setOpenComments] = useState(null); 
  const [showCreatePost, setShowCreatePost] = useState(false);

  useEffect(() => {
    setHydrated(true);
    if (!user?.uid) return;

    const q = query(
      collection(db, "Posts"),
      // where("uid", "==", user.uid)
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
    <>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] h-screen">
        {/* Left Sidebar (same width as profile page) */}
        <div className="p-4 text-center hidden md:block">
          <Leftbar setShowCreatePost={setShowCreatePost}/>
        </div>

        {/* Reels Feed */}
        <div className="flex flex-col items-center  overflow-y-auto bg-gray-50 min-h-screen">
          {reels.length === 0 ? (
            <p className="text-gray-500">No reels posted yet.</p>
          ) : (
            <div className="w-full flex flex-col items-center">
              {reels.map((reel, idx) => (
  <div
    key={reel.id}
    className={idx === 0 ? "mb-8" : "-mt-24 mb-8"} // overlap by 24px, but add 8 margin below
  >
    <ReelCard
      post={reel}
      activeReel={activeReel}
      setActiveReel={setActiveReel}
      openComments={openComments === reel.id}
      setOpenComments={() =>
        setOpenComments(openComments === reel.id ? null : reel.id)
      }
      autoPlay
    />
  </div>
))}
            </div>
          )}
        </div>
      </div>
      <CreatePost
        isOpen={showCreatePost}
        onClose={() => setShowCreatePost(false)}
      />
    </>
  );
};

export default Page;