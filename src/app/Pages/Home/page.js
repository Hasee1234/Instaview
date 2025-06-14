// app/HomeContentPage.jsx or app/home/HomeContentPage.jsx
"use client";
import React from "react";
// import StoryBar from "./Components/StoryBar/StoryBar";
import StoryBar from "@/app/Components/StoryBar/StoryBar";
// import FeedListing from "./Components/FeedListing/FeedListing";
import FeedListing from "@/app/Components/FeedListing/FeedListing";
// import Rightbar from "./Components/Rightbar/Rightbar";
import Rightbar from "@/app/Components/Rightbar/Rightbar";

export default function HomeContentPage() {
  return (
    <>
      {/* Middle Section (StoryBar + Feed) */}
      <div className="flex flex-col">
        <div className="p-4 text-center">
          <StoryBar />
        </div>
        <div className="p-4 text-center flex-grow overflow-y-auto">
          <FeedListing />
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="bg-300 p-4 text-center">
        <Rightbar />
      </div>
    </>
  );
}
