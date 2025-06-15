// "use client";
// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { logout, fetchAllUsers } from "@/app/Store/Slices/authSlice";
// import { useRouter } from "next/navigation";

// export default function Rightbar() {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const currentUser = useSelector((state) => state.auth.user);
//   const users = useSelector((state) => state.auth.allUsers);

//   // Fetch all users on mount
//   useEffect(() => {
//     dispatch(fetchAllUsers());
//   }, [dispatch]);

//   const handleLogout = async () => {
//     await dispatch(logout());
//     router.push("/Pages/Signup");
//   };

//   // Filter out current user and limit to 5
//   const otherUsers = users
//     ?.filter((user) => user.uid !== currentUser?.uid)
//     .slice(0, 5);

//   return (
//     <div className="px-2 pt-4">
//       {/* Current User */}
//       <div className="flex items-center justify-between w-[319px] h-[44px] mb-4">
//         <div className="flex items-center">
//           <img
//             src={currentUser?.profilePic || "/default-profile.png"}
//             alt="profile"
//             className="w-10 h-10 rounded-full object-cover"
//           />
//           <span className="ml-3 font-semibold">{currentUser?.name || currentUser?.username}</span>
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
//               <span className="ml-3 font-semibold text-sm">{user.name || user.username}</span>
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
import { logout, fetchAllUsers } from "@/app/Store/Slices/authSlice";
import { useRouter } from "next/navigation";

export default function Rightbar() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  const currentUser = useSelector((state) => state.auth.user);
  const users = useSelector((state) => state.auth.allUsers);

  useEffect(() => {
    dispatch(fetchAllUsers());
    setMounted(true); // Ensures client-only rendering
  }, [dispatch]);

  const handleLogout = async () => {
    await dispatch(logout());
    router.push("/Pages/Signup");
  };

  const otherUsers = users
    ?.filter((user) => user.uid !== currentUser?.uid)
    .slice(0, 5);

  if (!mounted) return null; // Skip rendering until mounted on client

  return (
    <div className="px-2 pt-4">
      {/* Current User */}
      <div className="flex items-center justify-between w-[319px] h-[44px] mb-4">
        <div className="flex items-center">
          <img
            src={currentUser?.profilePic || "/default-profile.png"}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="ml-3 font-semibold">
            {currentUser?.name || currentUser?.username || "User"}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="text-blue-500 text-sm hover:underline"
        >
          Logout
        </button>
      </div>

      {/* Suggested Section */}
      <p className="text-sm text-gray-500 mb-2">Suggested for you</p>

      {/* Other Users */}
      {otherUsers?.length > 0 ? (
        otherUsers.map((user) => (
          <div
            key={user.uid}
            className="flex items-center justify-between w-[319px] h-[44px] mb-2"
          >
            <div className="flex items-center">
              <img
                src={user.profilePic || "/default-profile.png"}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="ml-3 font-semibold text-sm">
                {user.name || user.username}
              </span>
            </div>
            <button className="text-blue-500 text-sm hover:underline">
              Follow
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-sm">No users found.</p>
      )}
    </div>
  );
}
