
"use client";
import React, { useState } from "react";
import Leftbar from "./Components/Leftbar/Leftbar";
import StoryBar from "./Components/StoryBar/StoryBar";
import FeedListing from "./Components/FeedListing/FeedListing";
import CreatePost from "./Components/CreatePost/CreatePost";
import Rightbar from "./Components/Rightbar/Rightbar";
import MobileNavbar from "./Components/MobileNavbar/MobileNavbar";
import SearchDialog from "./Components/SearchDialog/SearchDialog";
import LoaderPage from "./Components/LoaderPage/LoaderPage";

export default function Page() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showSearchDialog, setShowSearchDialog] = useState(false);

  // Loader state
  const [storiesLoaded, setStoriesLoaded] = useState(false);
  const [feedLoaded, setFeedLoaded] = useState(false);

  const allLoaded = storiesLoaded && feedLoaded;

  return (
    <>
      {!allLoaded && <LoaderPage />}
      <div className={`grid grid-cols-1 md:grid-cols-[1fr_2.5fr] lg:grid-cols-[1fr_2.5fr_1.5fr] gap-1 h-screen ${!allLoaded ? "invisible" : ""}`}>
        {/* Left Sidebar - hidden on screens < 768px */}
        <div className="hidden md:block p-4 text-center">
          <Leftbar setShowCreatePost={setShowCreatePost} />
        </div>

        {/* Middle Section (StoryBar + Feed) */}
        <div className="flex flex-col">
          <div className="p-4 text-center">
            <StoryBar onLoaded={() => setStoriesLoaded(true)} />
          </div>
          <div className="p-4 text-center flex-grow overflow-y-auto">
            <FeedListing onLoaded={() => setFeedLoaded(true)} />
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

      {/* Mobile Navbar */}
      <MobileNavbar
        onCreatePost={() => setShowCreatePost(true)}
        onShowSearch={() => setShowSearchDialog(true)}
      />

      {/* Search Dialog for mobile */}
      {showSearchDialog && (
        <SearchDialog
          isMobile={true}
          onClose={() => setShowSearchDialog(false)}
        />
      )}
    </>
  );
}









// "use client";
// import React, { useState, useEffect } from "react";
// import Leftbar from "./Components/Leftbar/Leftbar";
// import StoryBar from "./Components/StoryBar/StoryBar";
// import FeedListing from "./Components/FeedListing/FeedListing";
// import CreatePost from "./Components/CreatePost/CreatePost";
// import Rightbar from "./Components/Rightbar/Rightbar";
// import MobileNavbar from "./Components/MobileNavbar/MobileNavbar";
// import SearchDialog from "./Components/SearchDialog/SearchDialog";
// import LoaderPage from "./Components/LoaderPage/LoaderPage";

// export default function Page() {
//   const [showCreatePost, setShowCreatePost] = useState(false);
//   const [showSearchDialog, setShowSearchDialog] = useState(false);

//   // Loader state
//   const [storiesLoaded, setStoriesLoaded] = useState(false);
//   const [feedLoaded, setFeedLoaded] = useState(false);
//   const [showLoader, setShowLoader] = useState(true);
//   const [minDelayPassed, setMinDelayPassed] = useState(false);

//   // Minimum loader delay (1 second)
//   useEffect(() => {
//     const timer = setTimeout(() => setMinDelayPassed(true), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   // Only show loader on first visit in this tab
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       if (sessionStorage.getItem("homeLoadedOnce")) {
//         setShowLoader(false);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     if (storiesLoaded && feedLoaded && minDelayPassed && typeof window !== "undefined") {
//       sessionStorage.setItem("homeLoadedOnce", "true");
//       setShowLoader(false);
//     }
//   }, [storiesLoaded, feedLoaded, minDelayPassed]);

//   return (
//     <>
//       {showLoader && <LoaderPage />}
//       {!showLoader && (
//         <div className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] lg:grid-cols-[1fr_2.5fr_1.5fr] gap-1 h-screen">
//           {/* Left Sidebar - hidden on screens < 768px */}
//           <div className="hidden md:block p-4 text-center">
//             <Leftbar setShowCreatePost={setShowCreatePost} />
//           </div>
//           {/* Middle Section (StoryBar + Feed) */}
//           <div className="flex flex-col">
//             <div className="p-4 text-center">
//               <StoryBar onLoaded={() => setStoriesLoaded(true)} />
//             </div>
//             <div className="p-4 text-center flex-grow overflow-y-auto">
//               <FeedListing onLoaded={() => setFeedLoaded(true)} />
//             </div>
//           </div>
//           {/* Right Sidebar - hidden on screens ≤ 1160px */}
//           <div className="hidden lg:block p-4 text-center">
//             <Rightbar />
//           </div>
//         </div>
//       )}
//       {/* Modal Overlay */}
//       <CreatePost
//         isOpen={showCreatePost}
//         onClose={() => setShowCreatePost(false)}
//       />
//       {/* Mobile Navbar */}
//       <MobileNavbar
//         onCreatePost={() => setShowCreatePost(true)}
//         onShowSearch={() => setShowSearchDialog(true)}
//       />
//       {/* Search Dialog for mobile */}
//       {showSearchDialog && (
//         <SearchDialog
//           isMobile={true}
//           onClose={() => setShowSearchDialog(false)}
//         />
//       )}
//     </>
//   );
// }



