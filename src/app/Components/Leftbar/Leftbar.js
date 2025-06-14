// "use client"
// import Link from 'next/link'; 
// import React, { useState, useEffect } from 'react';

// const Leftbar = ({ setShowCreatePost }) => {
//   const [activeItem, setActiveItem] = useState('home'); // default active is 'home'

//   const getButtonClass = (item) =>
//     `flex items-center w-full p-3 text-base hover:bg-gray-200 rounded-md transition ${
//       activeItem === item ? 'font-bold text-black' : 'text-gray-700'
//     }`;

//   const getIconClass = (item) =>
//     `w-5 h-5 ${activeItem === item ? 'text-black' : 'text-gray-700'}`;

//   return (
//     <aside className="w-56 h-screen fixed bg-white border-r border-gray-300 p-4 flex flex-col max-[1233px]:w-20">
//       {/* Logo */}
//       <div className="flex justify-start items-center mb-8">
//         <label className="text-2xl font-logo italic max-[1233px]:hidden">Instaview</label>
//       </div>

//       <ul className="space-y-4">
//         <li>
//           <Link href="/">
//           <button className={getButtonClass('home')} onClick={() => setActiveItem('home')}>
//             <span className="mr-3">
//               <svg className={getIconClass('home')} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                 <path d="M3 9.5L12 4l9 5.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5Z" />
//               </svg>
//             </span>
//             <span className="max-[1233px]:hidden">Home</span>
//           </button>
//           </Link>
//         </li>
//         <li>
//           <button className={getButtonClass('search')} onClick={() => setActiveItem('search')}>
//             <span className="mr-3">
//               <svg className={getIconClass('search')} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                 <circle cx="11" cy="11" r="8" />
//                 <line x1="21" y1="21" x2="16.65" y2="16.65" />
//               </svg>
//             </span>
//             <span className="max-[1233px]:hidden">Search</span>
//           </button>
//         </li> 
//         <li>
//           <button className={getButtonClass('explore')} onClick={() => setActiveItem('explore')}>
//             <span className="mr-3">
//               <svg className={getIconClass('explore')} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                 <polygon points="12 2 2 7 12 12 22 7 12 2" />
//                 <polyline points="2 17 12 22 22 17" />
//                 <polyline points="2 12 12 17 22 12" />
//               </svg>
//             </span>
//             <span className="max-[1233px]:hidden">Explore</span>
//           </button>
//         </li>
//         <li>
//           <button className={getButtonClass('reels')} onClick={() => setActiveItem('reels')}>
//             <span className="mr-3">
//               <svg className={getIconClass('reels')} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                 <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
//                 <line x1="7" y1="2" x2="7" y2="22" />
//                 <line x1="17" y1="2" x2="17" y2="22" />
//                 <line x1="2" y1="12" x2="22" y2="12" />
//                 <line x1="2" y1="7" x2="22" y2="7" />
//                 <line x1="2" y1="17" x2="22" y2="17" />
//               </svg>
//             </span>
//             <span className="max-[1233px]:hidden">Reels</span>
//           </button>
//         </li>
//         <li>
//           <button className={getButtonClass('messages')} onClick={() => setActiveItem('messages')}>
//             <span className="mr-3">
//               <svg className={getIconClass('messages')} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                 <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />
//               </svg>
//             </span>
//             <span className="max-[1233px]:hidden">Messages</span>
//           </button>
//         </li>
//         <li>
//           <button className={getButtonClass('notifications')} onClick={() => setActiveItem('notifications')}>
//             <span className="mr-3">
//               <svg className={getIconClass('notifications')} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                 <path d="M20 13V9A8 8 0 1 0 4 9v4l-1 2h18l-1-2z" />
//                 <path d="M12 23a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2z" />
//               </svg>
//             </span>
//             <span className="max-[1233px]:hidden">Notifications</span>
//           </button>
//         </li>
//         {/* <li>
//           <Link href='/Pages/CreatePost'>
//           <button className={getButtonClass('create')} onClick={() => setActiveItem('create')}>
//             <span className="mr-3">
//               <svg className={getIconClass('create')} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                 <line x1="12" y1="5" x2="12" y2="19" />
//                 <line x1="5" y1="12" x2="19" y2="12" />
//               </svg>
//             </span>
//             <span className="max-[1233px]:hidden">Create</span>
//           </button>
//           </Link>
//         </li>
//          */}
//         <li>
//   <button
//     className={getButtonClass('create')}
//     onClick={() => {
//       setActiveItem('create');
//       setShowCreatePost(true); // trigger modal
//     }}
//   >
//     <span className="mr-3">
//       <svg className={getIconClass('create')} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//         <line x1="12" y1="5" x2="12" y2="19" />
//         <line x1="5" y1="12" x2="19" y2="12" />
//       </svg>
//     </span>
//     <span className="max-[1233px]:hidden">Create</span>
//   </button>
// </li>

//         <li>
//           <Link href="/Pages/Profile">
//           <button className={getButtonClass('profile')} onClick={() => setActiveItem('profile')}>
//             <span className="mr-3">
//               <svg className={getIconClass('profile')} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                 <circle cx="12" cy="7" r="4" />
//                 <path d="M5.5 21a9 9 0 0 1 13 0" />
//               </svg>
//             </span>
//             <span className="max-[1233px]:hidden">Profile</span>
//           </button>
//           </Link>
//         </li>
//       </ul>
//     </aside>
//   );
// };

// export default Leftbar;"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Leftbar = ({ setShowCreatePost }) => {
  const pathname = usePathname();

  const isActive = (itemPath) => {
    if (itemPath === "/") return pathname === "/";
    return pathname.startsWith(itemPath);
  };

  const getButtonClass = (itemPath) =>
    `flex items-center w-full p-3 text-base hover:bg-gray-200 rounded-md transition ${
      isActive(itemPath) ? "font-bold text-black" : "text-gray-700"
    }`;

  const getIconClass = (itemPath) =>
    `w-5 h-5 ${isActive(itemPath) ? "text-black" : "text-gray-700"}`;

  return (
    <aside className="w-56 h-screen fixed bg-white border-r border-gray-300 p-4 flex flex-col max-[1233px]:w-20">
      {/* Logo */}
      <div className="flex justify-start items-center mb-8">
        <label className="text-2xl font-logo italic max-[1233px]:hidden">
          Instaview
        </label>
      </div>

      <ul className="space-y-4">
        {/* Home */}
        <li>
          <Link href="/">
            <button className={getButtonClass("/")} onClick={() => {}}>
              <span className="mr-3">
                <svg
                  className={getIconClass("/")}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 9.5L12 4l9 5.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5Z" />
                </svg>
              </span>
              <span className="max-[1233px]:hidden">Home</span>
            </button>
          </Link>
        </li>

        {/* Search */}
        <li>
          <button className={getButtonClass("/search")}>
            <span className="mr-3">
              <svg
                className={getIconClass("/search")}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <span className="max-[1233px]:hidden">Search</span>
          </button>
        </li>

        {/* Explore */}
        <li>
          <Link href="/Pages/Explore">
          <button className={getButtonClass("/Pages/Explore")}>
            <span className="mr-3">
              <svg
                className={getIconClass("/Pages/Explore")}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </span>
            <span className="max-[1233px]:hidden">Explore</span>
          </button>
          </Link>
        </li>

          
        {/* Reels */}
        <li>
          <button className={getButtonClass("/reels")}>
            <span className="mr-3">
              <svg
                className={getIconClass("/reels")}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                <line x1="7" y1="2" x2="7" y2="22" />
                <line x1="17" y1="2" x2="17" y2="22" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <line x1="2" y1="7" x2="22" y2="7" />
                <line x1="2" y1="17" x2="22" y2="17" />
              </svg>
            </span>
            <span className="max-[1233px]:hidden">Reels</span>
          </button>
        </li>

        {/* Messages */}
        <li>
          <button className={getButtonClass("/messages")}>
            <span className="mr-3">
              <svg
                className={getIconClass("/messages")}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />
              </svg>
            </span>
            <span className="max-[1233px]:hidden">Messages</span>
          </button>
        </li>

        {/* Notifications */}
        <li>
          <button className={getButtonClass("/notifications")}>
            <span className="mr-3">
              <svg
                className={getIconClass("/notifications")}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M20 13V9A8 8 0 1 0 4 9v4l-1 2h18l-1-2z" />
                <path d="M12 23a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2z" />
              </svg>
            </span>
            <span className="max-[1233px]:hidden">Notifications</span>
          </button>
        </li>

        {/* Create */}
        {typeof setShowCreatePost === "function" && (
  <li>
    <button
      className="flex items-center w-full p-3 text-base hover:bg-gray-200 rounded-md transition text-gray-700"
      onClick={() => setShowCreatePost(true)}
    >
      <span className="mr-3">
        <svg
          className="w-5 h-5 text-gray-700"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </span>
      <span className="max-[1233px]:hidden">Create</span>
    </button>
  </li>
)}

        {/* Profile */}
        <li>
          <Link href="/Pages/Profile">
            <button className={getButtonClass("/Pages/Profile")}>
              <span className="mr-3">
                <svg
                  className={getIconClass("/Pages/Profile")}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="7" r="4" />
                  <path d="M5.5 21a9 9 0 0 1 13 0" />
                </svg>
              </span>
              <span className="max-[1233px]:hidden">Profile</span>
            </button>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Leftbar;
