// "use client";
// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { db } from "@/app/Config/firebase";

// import {
//   collection,
//   query,
//   where,
//   onSnapshot,
//   doc,
//   updateDoc,
//   getDoc,
// } from "firebase/firestore";
// import Leftbar from "@/app/Components/Leftbar/Leftbar";
// import CreatePost from "@/app/Components/CreatePost/CreatePost";
// import ProfilePostModal from "@/app/Components/ProfilePostModal/ProfilePostModal";
// import Link from "next/link";

// const Page = () => {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const [posts, setPosts] = useState([]);
//   const [showCreatePost, setShowCreatePost] = useState(false);
//   const [bioInput, setBioInput] = useState(user?.bio || "");
//   const [editingBio, setEditingBio] = useState(false);
//   const [hydrated, setHydrated] = useState(false);
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [showEditProfile, setShowEditProfile] = useState(false);
//   const [showSettings, setShowSettings] = useState(false);

//   useEffect(() => {
//     setHydrated(true);
//   }, []);

//   useEffect(() => {
//     if (!user?.uid) return;

//     const q = query(collection(db, "Posts"), where("uid", "==", user.uid));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const fetchedPosts = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setPosts(fetchedPosts);
//     });

//     const fetchUserBio = async () => {
//       try {
//         const userRef = doc(db, "users", user.uid);
//         const docSnap = await getDoc(userRef);
//         if (docSnap.exists()) {
//           const data = docSnap.data();
//           if (data.bio) {
//             setBioInput(data.bio);
//             const updatedUser = { ...user, bio: data.bio };
//             localStorage.setItem("user", JSON.stringify(updatedUser));
//             dispatch({ type: "auth/setUser", payload: updatedUser });
//           }
//         }
//       } catch (error) {
//         console.error("Failed to fetch bio:", error);
//       }
//     };

//     fetchUserBio();
//     return () => unsubscribe();
//   }, [user, dispatch]);

//   const handleBioSave = async () => {
//     try {
//       const userRef = doc(db, "users", user.uid);
//       await updateDoc(userRef, { bio: bioInput });

//       const updatedUser = { ...user, bio: bioInput };
//       localStorage.setItem("user", JSON.stringify(updatedUser));
//       dispatch({ type: "auth/setUser", payload: updatedUser });
//       setEditingBio(false);
//     } catch (error) {
//       console.error("Failed to update bio:", error);
//     }
//   };

//   if (!hydrated) return null;

//   return (
//     <>
//       <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 h-screen">
//         {/* Left Sidebar */}
//         <div className="p-4 text-center hidden md:block">
//           <Leftbar setShowCreatePost={setShowCreatePost} />
//         </div>

//         {/* Profile Content */}
//         <div className="col-span-1 md:col-span-1 lg:col-span-1 overflow-y-auto p-6">
//           <div className="max-w-4xl mx-auto">
//             {/* Profile Header */}
//             <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
//               <img
//                 src={user?.profilePic || "/default-avatar.png"}
//                 alt="Profile"
//                 className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover"
//               />
//               <div className="flex-1 w-full">
//                 <div className="flex items-center justify-center sm:justify-start gap-4 mb-2">
//                   <h2 className="text-2xl font-semibold">{user?.name || "Username"}</h2>
//                   <Link href="/Pages/EditProfile">
//                   <button
//                     onClick={() => setShowEditProfile(true)}
//                     className="px-4 py-1 text-sm font-medium bg-gray-200 hover:bg-gray-300 rounded-md"
//                   >
//                     Edit Profile
//                   </button>
//                   </Link>
//                   <button
//                   onClick={() => setShowSettings(true)}
//                   className="p-2 rounded-full hover:bg-gray-100"
//                   title="Settings"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5 text-gray-600"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       strokeWidth={2}
//                       >
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v.01M12 12v.01M12 18v.01" />
//                     </svg>
//                   </button>
//                 </div>

//                 <div className="flex justify-center sm:justify-start gap-6 my-2 text-sm">
//                   <span><strong>{posts.length}</strong> posts</span>
//                   <span><strong>{user?.followers?.length || 0}</strong> followers</span>
//                   <span><strong>{user?.following?.length || 0}</strong> following</span>
//                 </div>

//                 {/* Bio Section */}
//                 {editingBio ? (
//                   <div className="flex items-center gap-2 mt-1">
//                     <input
//                       type="text"
//                       value={bioInput}
//                       onChange={(e) => setBioInput(e.target.value)}
//                       placeholder="Enter your bio..."
//                       className="border px-2 py-1 rounded text-sm w-full sm:w-auto"
//                     />
//                     <button
//                       onClick={handleBioSave}
//                       className="text-sm bg-blue-500 text-white px-3 py-1 rounded"
//                     >
//                       Save
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="flex justify-between items-center mt-1">
//                     <p className="text-sm text-gray-700">
//                       {user?.bio || "This is your bio. Add something cool!"}
//                     </p>
//                     <button
//                       onClick={() => setEditingBio(true)}
//                       className="text-sm text-blue-500"
//                     >
//                       {user?.bio ? "Edit Bio" : "Add Bio"}
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Post Grid */}
//             {posts.length === 0 ? (
//               <p className="text-center text-gray-500">No posts yet.</p>
//             ) : (
//               <div className="grid grid-cols-3 gap-1">
//                 {posts.map((post) => (
//                   <div
//                     key={post.id}
//                     onClick={() => setSelectedPost(post)}
//                     className="relative aspect-square bg-gray-100 overflow-hidden group cursor-pointer"
//                   >
//                     {post.mediaType === "video" ? (
//                       <video
//                         src={post.mediaUrl}
//                         className="w-full h-full object-cover"
//                         muted
//                         loop
//                         playsInline
//                       />
//                     ) : (
//                       <img
//                         src={post.mediaUrl || post.imageURL}
//                         alt="Post"
//                         className="w-full h-full object-cover"
//                       />
//                     )}
//                     <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition">
//                       <div className="flex justify-between items-center">
//                         <span>@{post.username}</span>
//                         <span>{new Date(post.createdAt?.seconds * 1000).toLocaleDateString()}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Right Sidebar / Placeholder */}
//         <div></div>
//       </div>

//       {/* Create Post Modal */}
//       <CreatePost
//         isOpen={showCreatePost}
//         onClose={() => setShowCreatePost(false)}
//       />

//       {/* Post Modal */}
//       <ProfilePostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
//     </>
//   );
// };

// export default Page;
"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { db } from "@/app/Config/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import Leftbar from "@/app/Components/Leftbar/Leftbar";
import CreatePost from "@/app/Components/CreatePost/CreatePost";
import ProfilePostModal from "@/app/Components/ProfilePostModal/ProfilePostModal";
import Link from "next/link";
import LogoutDialog from "@/app/Components/LogoutDialog/LogoutDialog";

const Page = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);
  const [showCreatePost, setShowCreatePost] = useState(false); // Add this state back
  const [bioInput, setBioInput] = useState(user?.bio || "");
  const [editingBio, setEditingBio] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!user?.uid) return;

    const q = query(collection(db, "Posts"), where("uid", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(fetchedPosts);
    });

    const fetchUserBio = async () => {
      try {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.bio) {
            setBioInput(data.bio);
            const updatedUser = { ...user, bio: data.bio };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            dispatch({ type: "auth/setUser", payload: updatedUser });
          }
        }
      } catch (error) {
        console.error("Failed to fetch bio:", error);
      }
    };

    fetchUserBio();
    return () => unsubscribe();
  }, [user, dispatch]);

  const handleBioSave = async () => {
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { bio: bioInput });

      const updatedUser = { ...user, bio: bioInput };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      dispatch({ type: "auth/setUser", payload: updatedUser });
      setEditingBio(false);
    } catch (error) {
      console.error("Failed to update bio:", error);
    }
  };

  if (!hydrated) return null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 h-screen">
        {/* Left Sidebar */}
        <div className="p-4 text-center hidden md:block">
          <Leftbar setShowCreatePost={setShowCreatePost} />
        </div>

        {/* Profile Content */}
        <div className="col-span-1 md:col-span-1 lg:col-span-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
              <img
                src={user?.profilePic || "/default-avatar.png"}
                alt="Profile"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover"
              />
              <div className="flex-1 w-full">
                <div className="flex items-center justify-center sm:justify-start gap-4 mb-2">
                  <h2 className="text-2xl font-semibold">{user?.name || "Username"}</h2>
                  <Link href="/Pages/EditProfile">
                    <button className="px-4 py-1 text-sm font-medium bg-gray-200 hover:bg-gray-300 rounded-md">
                      Edit Profile
                    </button>
                  </Link>
                  <button
                    onClick={() => setShowLogoutDialog(true)}
                    className="p-2 rounded-full hover:bg-gray-100"
                    title="Settings"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                </div>

                <div className="flex justify-center sm:justify-start gap-6 my-2 text-sm">
                  <span><strong>{posts.length}</strong> posts</span>
                  <span><strong>{user?.followers?.length || 0}</strong> followers</span>
                  <span><strong>{user?.following?.length || 0}</strong> following</span>
                </div>

                {/* Bio Section */}
                {/* {editingBio ? (
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="text"
                      value={bioInput}
                      onChange={(e) => setBioInput(e.target.value)}
                      placeholder="Enter your bio..."
                      className="border px-2 py-1 rounded text-sm w-full sm:w-auto"
                    />
                    <button
                      onClick={handleBioSave}
                      className="text-sm bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-gray-700">
                      {user?.bio || "This is your bio. Add something cool!"}
                    </p>
                    <button
                      onClick={() => setEditingBio(true)}
                      className="text-sm text-blue-500"
                    >
                      {user?.bio ? "Edit Bio" : "Add Bio"}
                    </button>
                  </div>
                )} */}
              </div>
            </div>

            {/* Post Grid */}
            {posts.length === 0 ? (
              <p className="text-center text-gray-500">No posts yet.</p>
            ) : (
              <div className="grid grid-cols-3 gap-1">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className="relative aspect-square bg-gray-100 overflow-hidden group cursor-pointer"
                  >
                    {post.mediaType === "video" ? (
                      <video
                        src={post.mediaUrl}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <img
                        src={post.mediaUrl || post.imageURL}
                        alt="Post"
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition">
                      <div className="flex justify-between items-center">
                        <span>@{post.username}</span>
                        <span>{new Date(post.createdAt?.seconds * 1000).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
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

      {/* Post Modal */}
      <ProfilePostModal post={selectedPost} onClose={() => setSelectedPost(null)} />

      {/* Logout Dialog */}
      <LogoutDialog
        isOpen={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
      />
    </>
  );
};

export default Page;