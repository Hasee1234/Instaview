// "use client";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { useSelector } from "react-redux";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { db } from "@/app/Config/firebase";
// import StoryModal from "../StoryModal/StoryModal";

// const StoryBar = () => {
//   const user = useSelector((state) => state.auth.user);
//   const [stories, setStories] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedStory, setSelectedStory] = useState(null);

//   const fetchStories = async () => {
//     const ref = collection(db, "Stories");
//     const timeLimit = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24h ago
//     const q = query(ref, where("timestamp", ">", timeLimit));
//     const docs = await getDocs(q);

//     const storiesData = docs.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     setStories(storiesData);
//   };

//   useEffect(() => {
//     fetchStories();
//   }, []);

//   return (
//     <>
//       <div className="flex space-x-4 overflow-x-auto p-4 scrollbar-hide">
//         {/* Your Story */}
//         <UploadStory user={user} onUpload={fetchStories} />

//         {/* Other User Stories */}
//         {stories
//           .filter((s) => s.uid !== user?.uid)
//           .map((story) => (
//             <div
//               key={story.id}
//               className="flex flex-col items-center cursor-pointer relative"
//               onClick={() => {
//                 setSelectedStory(story);
//                 setShowModal(true);
//               }}
//             >
//               <div className="w-16 h-16 rounded-full border-2 border-red-500 p-1">
//                 <Image
//                   src={story.profileImage || "/user-placeholder.jpg"}
//                   alt={story.username}
//                   width={64}
//                   height={64}
//                   className="rounded-full object-cover"
//                 />
//               </div>
//               <p className="text-xs mt-1">{story.username}</p>
//             </div>
//           ))}
//       </div>

//       {showModal && selectedStory && (
//         <StoryModal story={selectedStory} onClose={() => setShowModal(false)} />
//       )}
//     </>
//   );
// };

// export default StoryBar;


"use client";
import React, { useState } from "react";
import Image from "next/image";
import defaultpic from "@/app/Assets/defaultpic.jpg";
import StoryUploadModal from "../StoryUploadModal/StoryUploadModal";

const UploadStory = ({ user, onUpload }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center">
        <div
          className="w-16 h-16 rounded-full border-2 border-blue-500 p-1 cursor-pointer overflow-hidden"
          onClick={() => setShowModal(true)}
        >
          <div className="w-full h-full rounded-full overflow-hidden">
            <Image
              src={user?.profilePic || defaultpic}
              alt="Your Story"
              width={64}
              height={64}
              className="object-cover w-full h-full rounded-full"
            />
          </div>
        </div>
        <p className="text-xs mt-1">Your Story</p>
      </div>
      {showModal && (
        <StoryUploadModal
          user={user}
          onClose={() => setShowModal(false)}
          onUpload={onUpload}
        />
      )}
    </>
  );
};

export default UploadStory;