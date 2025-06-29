// "use client";
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { db } from "@/app/Config/firebase";
// import { collection, query, where, onSnapshot } from "firebase/firestore";
// import Leftbar from "@/app/Components/Leftbar/Leftbar";
// import CreatePost from "@/app/Components/CreatePost/CreatePost";
// import { Heart, MessageCircle, X } from "lucide-react";
// import Link from "next/link";
// import defaultPic from "@/app/Assets/defaultpic.jpg";

// const isVideoPost = (post) => {
//   const url = post.mediaUrl || post.imageURL || "";
//   return (
//     post.mediaType === "video" ||
//     /\.(mp4|webm|ogg)$/i.test(url)
//   );
// };

// const Page = () => {
//   const { user } = useSelector((state) => state.auth);
//   const [posts, setPosts] = useState([]);
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [showCreatePost, setShowCreatePost] = useState(false);
//   const [hydrated, setHydrated] = useState(false);

//   useEffect(() => {
//     setHydrated(true);
//     if (!user?.uid) return;

//     const q = query(collection(db, "Posts"), where("uid", "==", user.uid));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const fetchedPosts = snapshot.docs.map((doc) => {
//         const data = doc.data();
//         let createdAt = null;
        
//         // Handle different createdAt formats
//         if (data.createdAt) {
//           if (typeof data.createdAt.toDate === 'function') {
//             createdAt = data.createdAt.toDate();
//           } else if (typeof data.createdAt === 'string') {
//             createdAt = new Date(data.createdAt);
//           } else if (data.createdAt.seconds) {
//             // Handle timestamp object {seconds, nanoseconds}
//             createdAt = new Date(data.createdAt.seconds * 1000);
//           }
//         }
        
//         return {
//           id: doc.id,
//           ...data,
//           createdAt
//         };
//       });
//       setPosts(fetchedPosts);
//     });

//     return () => unsubscribe();
//   }, [user]);

//   const formatTimeAgo = (date) => {
//     if (!date) return "";
//     const seconds = Math.floor((new Date() - date) / 1000);
    
//     if (seconds < 60) return `${seconds}s`;
//     if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
//     if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
//     return `${Math.floor(seconds / 86400)}d`;
//   };

//   if (!hydrated) return null;

//   return (
//     <>
//       <>
//       <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 h-screen">
//         {/* Left Sidebar */}
//         <div className="p-4 text-center hidden md:block">
//           <Leftbar setShowCreatePost={setShowCreatePost} />
//         </div>

//         {/* Profile Content - Enhanced Header */}
//         <div className="col-span-1 md:col-span-1 lg:col-span-1 overflow-y-auto p-6">
//           <div className="max-w-4xl mx-auto">
//             {/* Enhanced Profile Header */}
//             <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-10">
//               <img
//                 src={user?.profilePic || defaultPic}
//                 alt="Profile"
//                 className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-gray-200"
//               />
//               <div className="flex-1 w-full">
//                 <div className="flex items-center justify-center sm:justify-start gap-6 mb-4">
//                   <h2 className="text-2xl font-semibold">{user?.name || "Username"}</h2>
//                   <Link href="/Pages/EditProfile">
//                     <button className="px-4 py-1.5 text-sm font-medium bg-gray-100 hover:bg-gray-200 rounded-md">
//                       Edit Profile
//                     </button>
//                   </Link>
//                   <button
//                     onClick={() => setShowCreatePost(true)}
//                     className="p-2 rounded-full hover:bg-gray-100"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5 text-gray-600"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                   </button>
//                 </div>

//                 <div className="flex justify-center sm:justify-start gap-8 my-4 text-sm">
//                   <span className="text-center">
//                     <strong className="block text-lg">{posts.length}</strong>
//                     posts
//                   </span>
//                   <span className="text-center">
//                     <strong className="block text-lg">{user?.followers?.length || 0}</strong>
//                     followers
//                   </span>
//                   <span className="text-center">
//                     <strong className="block text-lg">{user?.following?.length || 0}</strong>
//                     following
//                   </span>
//                 </div>

//                 <div className="text-center sm:text-left">
//                   <p className="text-sm text-gray-700 mt-1">
//                     {user?.bio || "No bio yet"}
//                   </p>
//                 </div>
//               </div>
//             </div>

      

//              {posts.length === 0 ? (
//               <p className="text-center text-gray-500">No posts yet.</p>
//             ) : (
//               <div className="grid grid-cols-3 gap-1">
//                 {posts.map((post) => {
//                   const mediaUrl = post.mediaUrl || post.imageURL || "";
//                   const isVideo = isVideoPost(post);
//                   return (
//                     <div
//                       key={post.id}
//                       onClick={() => setSelectedPost(post)}
//                       className="relative aspect-square bg-gray-100 overflow-hidden group cursor-pointer"
//                     >
//                       {isVideo ? (
//                         <video
//                           src={mediaUrl}
//                           className="w-full h-full object-cover bg-black"
//                           muted
//                           loop
//                           playsInline
//                           preload="metadata"
//                         />
//                       ) : (
//                         <img
//                           src={mediaUrl}
//                           alt="Post"
//                           className="w-full h-full object-cover"
//                         />
//                       )}
//                       <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
//                         <div className="flex items-center text-white space-x-6">
//                           <div className="flex items-center">
//                             <Heart className="w-5 h-5 fill-white" />
//                             <span className="ml-1">{post.likes?.length || 0}</span>
//                           </div>
//                           <div className="flex items-center">
//                             <MessageCircle className="w-5 h-5" />
//                             <span className="ml-1">{post.comments?.length || 0}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>


//       {/* Create Post Modal */}
//       <CreatePost
//         isOpen={showCreatePost}
//         onClose={() => setShowCreatePost(false)}
//       />

//       {/* Enhanced Post Modal */}
//          {selectedPost && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row">
//             {/* Media Section */}
//             <div className="md:w-2/3 bg-black flex items-center justify-center">
//               {isVideoPost(selectedPost) ? (
//                 <video
//                   src={selectedPost.mediaUrl || selectedPost.imageURL || ""}
//                   className="max-h-[80vh] object-contain"
//                   controls
//                   autoPlay
//                 />
//               ) : (
//                 <img
//                   src={selectedPost.mediaUrl || selectedPost.imageURL || ""}
//                   alt="Post"
//                   className="max-h-[80vh] object-contain"
//                 />
//               )}
//             </div>

            
//             {/* Details Section */}
//             <div className="md:w-1/3 flex flex-col border-l">
//               {/* Header */}
//               <div className="p-4 border-b flex items-center">
//                 <img
//                   src={user?.profilePic || "/default-avatar.png"}
//                   alt="Profile"
//                   className="w-8 h-8 rounded-full object-cover mr-3"
//                 />
//                 <span className="font-semibold">{user?.name || "User"}</span>
//               </div>
              
//               {/* Caption */}
//               <div className="p-4 border-b">
//                 <p className="text-sm">
//                   <span className="font-semibold">{user?.name || "User"}</span>{" "}
//                   {selectedPost.caption}
//                 </p>
//                 <p className="text-xs text-gray-500 mt-1">
//                   {formatTimeAgo(selectedPost.createdAt)}
//                 </p>
//               </div>
              
//               {/* Comments Section */}
//               <div className="flex-1 overflow-y-auto p-4">
//                 {selectedPost.comments?.length > 0 ? (
//                   selectedPost.comments.map((comment, index) => (
//                     <div key={index} className="mb-3 text-sm">
//                       <span className="font-semibold">{comment.username}</span>{" "}
//                       {comment.text}
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-gray-500 text-sm">No comments yet</p>
//                 )}
//               </div>
              
//               {/* Liked By Section - Added below comments */}
//               {selectedPost.likes?.length > 0 && (
//                 <div className="p-4 border-t text-sm">
//                   <p className="font-semibold mb-1">Liked by</p>
//                   <div className="flex items-center">
//                     <img
//                       src={user?.profilePic || "/default-avatar.png"}
//                       alt="Profile"
//                       className="w-6 h-6 rounded-full object-cover mr-2"
//                     />
//                     <span>{user?.name || "User"}</span>
//                     {selectedPost.likes.length > 1 && (
//                       <span className="text-gray-500 ml-1">
//                         and {selectedPost.likes.length - 1} others
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               )}
              
//               {/* Action Buttons */}
//               <div className="p-4 border-t flex space-x-4">
//                 <button className="flex items-center">
//                   <Heart className="w-5 h-5" />
//                   <span className="ml-1">{selectedPost.likes?.length || 0}</span>
//                 </button>
//                 <button className="flex items-center">
//                   <MessageCircle className="w-5 h-5" />
//                   <span className="ml-1">{selectedPost.comments?.length || 0}</span>
//                 </button>
//               </div>
//             </div>
            
//             {/* Close Button */}
//             <button
//               onClick={() => setSelectedPost(null)}
//               className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//     </>
//   );
// };

// export default Page;

"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "@/app/Config/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import Leftbar from "@/app/Components/Leftbar/Leftbar";
import CreatePost from "@/app/Components/CreatePost/CreatePost";
import { Heart, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import defaultPic from "@/app/Assets/defaultpic.jpg";
import MobileNavbar from "@/app/Components/MobileNavbar/MobileNavbar";

const isVideoPost = (post) => {
  const url = post.mediaUrl || post.imageURL || "";
  return (
    post.mediaType === "video" ||
    /\.(mp4|webm|ogg)$/i.test(url)
  );
};

const Page = () => {
  const { user } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    if (!user?.uid) return;

    const q = query(collection(db, "Posts"), where("uid", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs.map((doc) => {
        const data = doc.data();
        let createdAt = null;
        if (data.createdAt) {
          if (typeof data.createdAt.toDate === 'function') {
            createdAt = data.createdAt.toDate();
          } else if (typeof data.createdAt === 'string') {
            createdAt = new Date(data.createdAt);
          } else if (data.createdAt.seconds) {
            createdAt = new Date(data.createdAt.seconds * 1000);
          }
        }
        return {
          id: doc.id,
          ...data,
          createdAt
        };
      });
      setPosts(fetchedPosts);
    });

    return () => unsubscribe();
  }, [user]);

  const formatTimeAgo = (date) => {
    if (!date) return "";
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
    return `${Math.floor(seconds / 86400)}d`;
  };

  if (!hydrated) return null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 h-screen">
        {/* Left Sidebar */}
        <div className="p-4 text-center hidden md:block">
          <Leftbar setShowCreatePost={setShowCreatePost} />
        </div>

        {/* Profile Content - Enhanced Header */}
        <div className="col-span-1 md:col-span-1 lg:col-span-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {/* Enhanced Profile Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-10">
              <img
                src={user?.profilePic || defaultPic}
                alt="Profile"
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-gray-200"
              />
              <div className="flex-1 w-full">
                <div className="flex items-center justify-center sm:justify-start gap-6 mb-4">
                  <h2 className="text-2xl font-semibold">{user?.name || "Username"}</h2>
                  <Link href="/Pages/EditProfile">
                    <button className="px-4 py-1.5 text-sm font-medium bg-gray-100 hover:bg-gray-200 rounded-md">
                      Edit Profile
                    </button>
                  </Link>
                  <button
                    onClick={() => setShowCreatePost(true)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>

                <div className="flex justify-center sm:justify-start gap-8 my-4 text-sm">
                  <span className="text-center">
                    <strong className="block text-lg">{posts.length}</strong>
                    posts
                  </span>
                  <span className="text-center">
                    <strong className="block text-lg">{user?.followers?.length || 0}</strong>
                    followers
                  </span>
                  <span className="text-center">
                    <strong className="block text-lg">{user?.following?.length || 0}</strong>
                    following
                  </span>
                </div>

                <div className="text-center sm:text-left">
                  <p className="text-sm text-gray-700 mt-1">
                    {user?.bio || "No bio yet"}
                  </p>
                </div>
              </div>
            </div>

            {posts.length === 0 ? (
              <p className="text-center text-gray-500">No posts yet.</p>
            ) : (
              <div className="grid grid-cols-3 gap-1">
                {posts.map((post) => {
                  const mediaUrl = post.mediaUrl || post.imageURL || "";
                  const isVideo = isVideoPost(post);
                  return (
                    <div
                      key={post.id}
                      onClick={() => setSelectedPost(post)}
                      className="relative aspect-square bg-gray-100 overflow-hidden group cursor-pointer"
                    >
                      {isVideo ? (
                        <video
                          src={mediaUrl}
                          className="w-full h-full object-cover bg-black"
                          muted
                          loop
                          playsInline
                          preload="metadata"
                        />
                      ) : (
                        <img
                          src={mediaUrl}
                          alt="Post"
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="flex items-center text-white space-x-6">
                          <div className="flex items-center">
                            <Heart className="w-5 h-5 fill-white" />
                            <span className="ml-1">{post.likes?.length || 0}</span>
                          </div>
                          <div className="flex items-center">
                            <MessageCircle className="w-5 h-5" />
                            <span className="ml-1">{post.comments?.length || 0}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      <CreatePost
        isOpen={showCreatePost}
        onClose={() => setShowCreatePost(false)}
      />

      {/* Enhanced Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row">
            {/* Media Section */}
            <div className="md:w-2/3 bg-black flex items-center justify-center">
              {isVideoPost(selectedPost) ? (
                <video
                  src={selectedPost.mediaUrl || selectedPost.imageURL || ""}
                  className="max-h-[80vh] object-contain"
                  controls
                  autoPlay
                />
              ) : (
                <img
                  src={selectedPost.mediaUrl || selectedPost.imageURL || ""}
                  alt="Post"
                  className="max-h-[80vh] object-contain"
                />
              )}
            </div>

            {/* Details Section */}
            <div className="md:w-1/3 flex flex-col border-l">
              {/* Header */}
              <div className="p-4 border-b flex items-center">
                <img
                  src={user?.profilePic || "/default-avatar.png"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover mr-3"
                />
                <span className="font-semibold">{user?.name || "User"}</span>
              </div>
              
              {/* Caption */}
              <div className="p-4 border-b">
                <p className="text-sm">
                  <span className="font-semibold">{user?.name || "User"}</span>{" "}
                  {selectedPost.caption}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatTimeAgo(selectedPost.createdAt)}
                </p>
              </div>
              
              {/* Comments Section */}
              <div className="flex-1 overflow-y-auto p-4">
                {selectedPost.comments?.length > 0 ? (
                  selectedPost.comments.map((comment, index) => (
                    <div key={index} className="mb-3 text-sm">
                      <span className="font-semibold">{comment.username}</span>{" "}
                      {comment.text}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No comments yet</p>
                )}
              </div>
              
              {/* Liked By Section */}
              {selectedPost.likes?.length > 0 && (
                <div className="p-4 border-t text-sm">
                  <p className="font-semibold mb-1">Liked by</p>
                  <div className="flex items-center">
                    <img
                      src={user?.profilePic || "/default-avatar.png"}
                      alt="Profile"
                      className="w-6 h-6 rounded-full object-cover mr-2"
                    />
                    <span>{user?.name || "User"}</span>
                    {selectedPost.likes.length > 1 && (
                      <span className="text-gray-500 ml-1">
                        and {selectedPost.likes.length - 1} others
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="p-4 border-t flex space-x-4">
                <button className="flex items-center">
                  <Heart className="w-5 h-5" />
                  <span className="ml-1">{selectedPost.likes?.length || 0}</span>
                </button>
                <button className="flex items-center">
                  <MessageCircle className="w-5 h-5" />
                  <span className="ml-1">{selectedPost.comments?.length || 0}</span>
                </button>
              </div>
            </div>
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Navbar */}
      <MobileNavbar
        onCreatePost={() => setShowCreatePost(true)}
        onShowSearch={() => {}} // No search dialog on profile page
      />
    </>
  );
};

export default Page;