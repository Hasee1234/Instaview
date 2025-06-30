// "use client";
// import React from "react";
// import StoryBar from "@/app/Components/StoryBar/StoryBar";
// import FeedListing from "@/app/Components/FeedListing/FeedListing";
// import Rightbar from "@/app/Components/Rightbar/Rightbar";

// export default function HomeContentPage() {
//   return (
//     <>
//       {/* Middle Section (StoryBar + Feed) */}
//       <div className="flex flex-col">
//         <div className="p-4 text-center">
//           <StoryBar />
//         </div>
//         <div className="p-4 text-center flex-grow overflow-y-auto">
//           <FeedListing />
//         </div>
//       </div>

//       {/* Right Sidebar */}
//       <div className="bg-300 p-4 text-center">
//         <Rightbar />
//       </div>
//     </>
//   );
// }



"use client";
import React, { useState } from "react";
import StoryBar from "@/app/Components/StoryBar/StoryBar";
import FeedListing from "@/app/Components/FeedListing/FeedListing";
import Rightbar from "@/app/Components/Rightbar/Rightbar";
import LoaderPage from "@/app/Components/LoaderPage/LoaderPage";

export default function HomeContentPage() {
  const [storyLoaded, setStoryLoaded] = useState(false);
  const [feedLoaded, setFeedLoaded] = useState(false);
  const [rightbarLoaded, setRightbarLoaded] = useState(false);

  const allLoaded = storyLoaded && feedLoaded && rightbarLoaded;

  return (
    <>
      {!allLoaded && <LoaderPage />}
      <div className="flex flex-col" style={{ visibility: allLoaded ? "visible" : "hidden" }}>
        <div className="p-4 text-center">
          <StoryBar onLoaded={() => setStoryLoaded(true)} />
        </div>
        <div className="p-4 text-center flex-grow overflow-y-auto">
          <FeedListing onLoaded={() => setFeedLoaded(true)} />
        </div>
      </div>
      <div className="bg-300 p-4 text-center" style={{ visibility: allLoaded ? "visible" : "hidden" }}>
        <Rightbar onLoaded={() => setRightbarLoaded(true)} />
      </div>
    </>
  );
}

