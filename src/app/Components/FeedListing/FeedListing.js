// "use client"
// import { getposts } from '@/app/Store/Slices/feedSlice'
// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'

// export default function FeedListing() {
//   const feed=useSelector(store=>store.feed.feed)
//   const  dispatch=useDispatch()
//   console.log("feed",feed);
  
//   useEffect(() => {
//     console.log("useffect");
//     dispatch(getposts())
  
//   }, [])
  
//   return (
//     <div>
//       feed
//       {
//         feed?.map((post)=>{
//           return(
//             <div className="bg-white shadow-md rounded-lg p-4 mb-4 ">
//       {/* User Info */}
//       <div className="flex items-center mb-2">
//         <div className="w-10 h-10 rounded-full bg-gray-300"></div>
//         <span className="ml-2 font-semibold">{post.username}</span>
//       </div>

//       {/* Post Image */}
//       <div className="relative w-full h-64">
//         <img
//           src={post?.imageURL} 
//           alt="Post Image" 
//           layout="fill" 
//           objectFit="cover" 
//           className="rounded-md"
//         />
//       </div>

//       {/* Caption */}
//       <p className="mt-2"><strong>{post.username}</strong> {post?.caption}</p>
//     </div>
//           )
//         })
//       }
//     </div>
//   )
// }


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
      {feed?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
