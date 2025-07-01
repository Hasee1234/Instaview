// "use client";
// import { getposts } from "@/app/Store/Slices/feedSlice";
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import PostCard from "../PostCard/PostCard";
// export default function FeedListing() {
//   const feed = useSelector((store) => store.feed.feed);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getposts());
//   }, []);

//   return (
//     <div className="flex flex-col items-center px-4">
//       {feed?.length === 0 && <p>No posts available</p>}
//       {feed?.map((post,index) => (
//         <PostCard key={post.id || index} post={post} />
//       ))}
//     </div>
//   );
// }




"use client";
import { getposts } from "@/app/Store/Slices/feedSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../PostCard/PostCard";

export default function FeedListing({ onLoaded }) {
  const feed = useSelector((store) => store.feed.feed);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getposts());
  }, [dispatch]);


useEffect(() => {
  if (Array.isArray(feed) && onLoaded) {
    const timer = setTimeout(() => {
      onLoaded();
    }, 1000); // 1 second minimum loader
    return () => clearTimeout(timer);
  }
}, [feed, onLoaded]);

  return (
    <div className="flex flex-col items-center px-4">
      {feed?.length === 0 && <p>No posts available</p>}
      {feed?.map((post, index) => (
        <PostCard key={post.id || index} post={post} />
      ))}
    </div>
  );
}



// import { useSelector, useDispatch } from "react-redux";
// import React, { useEffect } from "react";
// import PostCard from "../PostCard/PostCard";
// import { getposts } from "@/app/Store/Slices/feedSlice";

// export default function FeedListing({ onLoaded, showLoader }) {
//   const feed = useSelector((store) => store.feed.feed);
//   const dispatch = useDispatch();


//   useEffect(() => {
//     if (Array.isArray(feed) && onLoaded) {
//       const timer = setTimeout(() => {
//         onLoaded();
//       }, 1000); // 1 second minimum loader
//       return () => clearTimeout(timer);
//     }
//   }, [feed, onLoaded]);

//   useEffect(() => {
//   if (Array.isArray(feed) && onLoaded) {
//     onLoaded();
//   }
// }, [feed, onLoaded]);

//   return (
//     <div className="flex flex-col items-center px-4">
//       {/* Only show "No posts available" if loader is NOT showing */}
//       {/* {feed?.length === 0 && !showLoader && <p>No posts available</p>} */}
//       {feed?.map((post, index) => (
//         <PostCard key={post.id || index} post={post} />
//       ))}
//     </div>
//   );
// }