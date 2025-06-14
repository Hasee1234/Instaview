"use client";
import React, { useState, useEffect } from "react";
import Leftbar from "@/app/Components/Leftbar/Leftbar";
import CreatePost from "@/app/Components/CreatePost/CreatePost";

export default function Page() {
  const [media, setMedia] = useState([]);
  const [active, setActive] = useState(null);
  const [showCreatePost, setShowCreatePost] = useState(false);

  useEffect(() => {
    async function fetchMedia() {
      const key = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
      const headers = { Authorization: key };

      const [photos, vids] = await Promise.all([
        fetch("https://api.pexels.com/v1/curated?per_page=15", { headers }).then(r => r.json()),
        fetch("https://api.pexels.com/videos/popular?per_page=15", { headers }).then(r => r.json())
      ]);

      const items = [
        ...photos.photos.map(p => ({ id: p.id, type: "image", url: p.src.medium })),
        ...vids.videos.map(v => ({ id: v.id, type: "video", url: v.video_files[0].link, poster: v.image }))
      ];
      items.sort(() => Math.random() - 0.5);
      setMedia(items);

    }
    fetchMedia();
  }, []);

  return (
    <>
<div className="grid grid-cols-[1fr_5fr] gap-1 h-screen">
        {/* Left Sidebar */}
        <div className="p-4 text-center">
          <Leftbar setShowCreatePost={setShowCreatePost} />
        </div>

        {/* Explore Grid */}
        <div className="p-4 overflow-y-auto">
          <div className="grid grid-cols-3 gap-1">
            {media.map(item => (
              <div key={item.id} className="aspect-square overflow-hidden cursor-pointer"
                   onClick={() => setActive(item)}>
                {item.type === "image" ? (
                  <img src={item.url} className="w-full h-full object-cover" />

                ) : (
                  <video src={item.url} muted loop playsInline poster={item.poster} className="w-full h-full object-cover" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Empty right space for 3-column layout */}
        <div></div>
      </div>

      {/* Media Modal */}
      {active && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="relative bg-white max-w-xl w-full max-h-[90vh] overflow-hidden rounded">
            <button className="absolute top-2 right-2 text-black text-xl"
                    onClick={() => setActive(null)}>✕</button>
            {active.type === "video" ? (
              <video src={active.url} poster={active.poster} controls autoPlay className="w-full object-contain" />
            ) : (
              <img src={active.url} className="w-full object-contain" />
            )}
          </div>
        </div>
      )}

      {/* Create Post Modal */}
      <CreatePost
        isOpen={showCreatePost}
        onClose={() => setShowCreatePost(false)}
      />
    </>
  );
}
