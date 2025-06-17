
// "use client";
// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { logout, fetchAllUsers } from "@/app/Store/Slices/authSlice";
// import { useRouter } from "next/navigation";
// import defaultPic from "@/app/Assets/defaultpic.jpg"; // Ensure you have a default image in your assets
// export default function Rightbar() {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const [mounted, setMounted] = useState(false);

//   const currentUser = useSelector((state) => state.auth.user);
//   const users = useSelector((state) => state.auth.allUsers);

//   useEffect(() => {
//     dispatch(fetchAllUsers());
//     setMounted(true); // Ensures client-only rendering
//   }, [dispatch]);

//   const handleLogout = async () => {
//     await dispatch(logout());
//     router.push("/Pages/Signup");
//   };
//   const otherUsers = users
//     ?.filter((user) => user.uid !== currentUser?.uid)
//     .slice(0, 5);

//   if (!mounted) return null; // Skip rendering until mounted on client

//   return (
//     <div className="px-2 pt-4">
//       {/* Current User */}
//       <div className="flex items-center justify-between w-[319px] h-[44px] mb-4">
//         <div className="flex items-center">
//           <img
//             src={currentUser?.profilePic || defaultPic}
//             alt="profile"
//             className="w-10 h-10 rounded-full object-cover"
//           />
//           <span className="ml-3 font-semibold">
//             {currentUser?.name || currentUser?.username || "User"}
//           </span>
//         </div>
//         <button
//           onClick={handleLogout}
//           className="text-blue-500 text-sm hover:underline"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Suggested Section */}
//       <p className="text-sm text-gray-500 mb-2">Suggested for you</p>

//       {/* Other Users */}
//       {otherUsers?.length > 0 ? (
//         otherUsers.map((user) => (
//           <div
//             key={user.uid}
//             className="flex items-center justify-between w-[319px] h-[44px] mb-2"
//           >
//             <div className="flex items-center">
//               <img
//                 src={user.profilePic || "/default-profile.png"}
//                 alt="profile"
//                 className="w-10 h-10 rounded-full object-cover"
//               />
//               <span className="ml-3 font-semibold text-sm">
//                 {user.name || user.username}
//               </span>
//             </div>
//             <button className="text-blue-500 text-sm hover:underline">
//               Follow
//             </button>
//           </div>
//         ))
//       ) : (
//         <p className="text-gray-400 text-sm">No users found.</p>
//       )}
//     </div>
//   );
// }
"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, fetchAllUsers, followUser, unfollowUser } from "@/app/Store/Slices/authSlice";
import { useRouter } from "next/navigation";
import defaultPic from "@/app/Assets/defaultpic.jpg";
import { UserPlus, UserCheck } from "lucide-react";

export default function Rightbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const currentUser = useSelector((state) => state.auth.user);
  const users = useSelector((state) => state.auth.allUsers);

  useEffect(() => {
    dispatch(fetchAllUsers());
    setMounted(true);
  }, [dispatch]);

  const handleFollow = async (targetUserId) => {
    if (!currentUser?.uid) return;
    
    try {
      if (currentUser.following?.includes(targetUserId)) {
        await dispatch(unfollowUser({
          currentUserId: currentUser.uid,
          targetUserId
        })).unwrap();
      } else {
        await dispatch(followUser({
          currentUserId: currentUser.uid,
          targetUserId
        })).unwrap();
      }
    } catch (error) {
      console.error("Follow action failed:", error);
    }
  };

  const otherUsers = users
    ?.filter((user) => user.uid !== currentUser?.uid)
    .slice(0, 5);

  if (!mounted) return null;

  return (
    <div className="px-2 pt-4">
      {/* Current User */}
      <div className="flex items-center justify-between w-[319px] h-[44px] mb-4">
        {/* ... existing current user code ... */}
      </div>

      {/* Suggested Section */}
      <p className="text-sm text-gray-500 mb-2">Suggested for you</p>

      {/* Other Users */}
      {otherUsers?.length > 0 ? (
        otherUsers.map((user) => {
          const isFollowing = currentUser?.following?.includes(user.uid);
          return (
            <div
              key={user.uid}
              className="flex items-center justify-between w-[319px] h-[44px] mb-2"
            >
              <div className="flex items-center">
                <img
                  src={user.profilePic || defaultPic}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="ml-3 font-semibold text-sm">
                  {user.name || user.username}
                </span>
              </div>
              <button 
                onClick={() => handleFollow(user.uid)}
                className={`text-sm flex items-center gap-1 ${
                  isFollowing ? 'text-gray-600' : 'text-blue-500'
                }`}
              >
                {isFollowing ? (
                  <>
                    <UserCheck className="w-4 h-4" />
                    <span>Following</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Follow</span>
                  </>
                )}
              </button>
            </div>
          );
        })
      ) : (
        <p className="text-gray-400 text-sm">No users found.</p>
      )}
    </div>
  );
}