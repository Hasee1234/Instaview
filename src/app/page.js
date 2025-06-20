"use client";
import React, { useState } from "react";
import Leftbar from "./Components/Leftbar/Leftbar";
import StoryBar from "./Components/StoryBar/StoryBar";
import FeedListing from "./Components/FeedListing/FeedListing";
import CreatePost from "./Components/CreatePost/CreatePost";
import Rightbar from "./Components/Rightbar/Rightbar";

export default function Page() {
  const [showCreatePost, setShowCreatePost] = useState(false);

  return (
    <>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] lg:grid-cols-[1fr_2.5fr_1.5fr] gap-1 h-screen">
  {/* Left Sidebar - hidden on screens < 768px */}
  <div className="hidden md:block p-4 text-center">
    <Leftbar setShowCreatePost={setShowCreatePost} />
  </div>

  {/* Middle Section (StoryBar + Feed) */}
  <div className="flex flex-col">
    <div className="p-4 text-center">
      <StoryBar />
    </div>
    <div className="p-4 text-center flex-grow overflow-y-auto">
      <FeedListing />
    </div>
  </div>

  {/* Right Sidebar - hidden on screens ≤ 1160px */}
  <div className="hidden lg:block p-4 text-center">
    <Rightbar />
  </div>
</div>

{/* Modal Overlay */}
<CreatePost
  isOpen={showCreatePost}
  onClose={() => setShowCreatePost(false)}
/>

    </>
  );
}