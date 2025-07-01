
// 'use client';

// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchStories } from '@/app/Store/Slices/storySlice';
// import StoryUploadModal from '../StoryUploadModal/StoryUploadModal';
// import StoryViewer from '../StoryViewer/StoryViewer';
// import defaultpic from '@/app/Assets/defaultpic.jpg';

// const StoryBar = () => {
//   const dispatch = useDispatch();
//   const { stories } = useSelector((state) => state.stories);
//   const user = useSelector((state) => state.auth.user);
//   const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
//   const [selectedStory, setSelectedStory] = useState(null);
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     dispatch(fetchStories());
//     setIsClient(true);
//   }, [dispatch]);

//   const userStory = stories.find((story) => story.uid === user?.uid);
//   const otherStories = stories.filter((story) => story.uid !== user?.uid);

//   const handleStoryClick = (story) => setSelectedStory(story);

//   return (
//     <>
//       <div className="flex space-x-4 overflow-x-auto p-4 scrollbar-hide">
//         {/* Your Story */}
//         <div className="flex flex-col items-center">
//           <div
//             className="w-16 h-16 rounded-full border-2 border-blue-500 p-1 cursor-pointer overflow-hidden"
//             onClick={() =>
//               userStory ? handleStoryClick(userStory) : setIsUploadModalOpen(true)
//             }
//           >
//             <div className="w-full h-full rounded-full overflow-hidden">
//               <Image
//                 src={isClient && user?.profilePic ? user.profilePic : defaultpic}
//                 alt="Your Story"
//                 width={64}
//                 height={64}
//                 className="object-cover w-full h-full rounded-full"
//               />
//             </div>
//           </div>
//           <p className="text-xs mt-1">Your Story</p>
//         </div>

//         {/* Other Stories */}
//         {isClient &&
//           otherStories.map((story) => (
//             <div
//               key={story.id}
//               className="flex flex-col items-center cursor-pointer"
//               onClick={() => handleStoryClick(story)}
//             >
//               <div className="w-16 h-16 rounded-full border-2 border-red-500 p-1 overflow-hidden">
//                 <div className="w-full h-full rounded-full overflow-hidden">
//                   <Image
//                     src={story.profilePic || defaultpic}
//                     alt={story.username}
//                     width={64}
//                     height={64}
//                     className="object-cover w-full h-full rounded-full"
//                   />
//                 </div>
//               </div>
//               <p className="text-xs mt-1">{story.username}</p>
//             </div>
//           ))}
//       </div>

//       {/* Upload Modal */}
//       {isUploadModalOpen && (
//         <StoryUploadModal onClose={() => setIsUploadModalOpen(false)} />
//       )}

//       {/* Story Viewer */}
//       {selectedStory && (
//         <StoryViewer story={selectedStory} onClose={() => setSelectedStory(null)} />
//       )}
//     </>
//   );
// };

// export default StoryBar;




// 'use client';

// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchStories } from '@/app/Store/Slices/storySlice';
// import StoryUploadModal from '../StoryUploadModal/StoryUploadModal';
// import StoryViewer from '../StoryViewer/StoryViewer';
// import defaultpic from '@/app/Assets/defaultpic.jpg';
// import LoaderPage from '@/app/Components/LoaderPage/LoaderPage';

// const StoryBar = ({ onLoaded }) => {
//   const dispatch = useDispatch();
//   const { stories } = useSelector((state) => state.stories);
//   const user = useSelector((state) => state.auth.user);
//   const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
//   const [selectedStory, setSelectedStory] = useState(null);
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     dispatch(fetchStories());
//     setIsClient(true);
//   }, [dispatch]);

//   useEffect(() => {
//     if (isClient && stories !== undefined && onLoaded) {
//       onLoaded();
//     }
//   }, [isClient, stories, onLoaded]);

//   // Only show stories from followed users and self, and only recent
//   const now = Date.now();
//   const isRecent = (story) => {
//     if (!story.createdAt) return false;
//     let created;
//     if (typeof story.createdAt === "object" && story.createdAt.seconds) {
  //       created = story.createdAt.seconds * 1000;
  //     } else {
//       created = new Date(story.createdAt).getTime();
//     }
//     return now - created < 24 * 60 * 60 * 1000;
//   };

//   const followedUids = Array.isArray(user?.following) ? user.following : [];
//   const visibleStories = (stories || []).filter(
//     (story) =>
//       isRecent(story) &&
//       (story.uid === user?.uid || followedUids.includes(story.uid))
//   );

//   // Your story (if exists)
//   const userStory = visibleStories.find((story) => story.uid === user?.uid);
//   // Other stories (from followed users only)
//   const otherStories = visibleStories.filter((story) => story.uid !== user?.uid);

//   // Show loader until stories are loaded (after client mount)
//   if (isClient && stories === undefined) {
//     return <LoaderPage />;
//   }

//   return (
  //     <>
//       <div className="flex space-x-4 overflow-x-auto p-4 scrollbar-hide">
//         {/* Your Story */}
//         <div className="flex flex-col items-center">
//           <div
//             className="w-16 h-16 rounded-full border-2 border-blue-500 p-1 cursor-pointer overflow-hidden"
//             onClick={() =>
//               userStory ? setSelectedStory(userStory) : setIsUploadModalOpen(true)
//             }
//           >
//             <div className="w-full h-full rounded-full overflow-hidden">
//               <Image
//                 src={isClient && user?.profilePic ? user.profilePic : defaultpic}
//                 alt="Your Story"
//                 width={64}
//                 height={64}
//                 className="object-cover w-full h-full rounded-full"
//               />
//             </div>
//           </div>
//           <p className="text-xs mt-1">Your Story</p>
//         </div>

//         {/* Other Stories */}
//         {isClient &&
//           otherStories.map((story) => (
//             <div
//               key={story.id}
//               className="flex flex-col items-center cursor-pointer"
//               onClick={() => setSelectedStory(story)}
//             >
//               <div className="w-16 h-16 rounded-full border-2 border-red-500 p-1 overflow-hidden">
//                 <div className="w-full h-full rounded-full overflow-hidden">
//                   <Image
//                     src={story.profilePic || defaultpic}
//                     alt={story.username}
//                     width={64}
//                     height={64}
//                     className="object-cover w-full h-full rounded-full"
//                   />
//                 </div>
//               </div>
//               <p className="text-xs mt-1">{story.username}</p>
//             </div>
//           ))}
//       </div>

//       {/* Upload Modal */}
//       {isUploadModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//           <StoryUploadModal onClose={() => setIsUploadModalOpen(false)} />
//         </div>
//       )}

//       {/* Story Viewer */}
//       {selectedStory && (
//         <StoryViewer story={selectedStory} onClose={() => setSelectedStory(null)} />
//       )}
//     </>
//   );
// };


'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStories } from '@/app/Store/Slices/storySlice';
import StoryUploadModal from '../StoryUploadModal/StoryUploadModal';
import StoryViewer from '../StoryViewer/StoryViewer';
import defaultpic from '@/app/Assets/defaultpic.jpg';
import LoaderPage from '@/app/Components/LoaderPage/LoaderPage';

const StoryBar = ({ onLoaded }) => {
  const dispatch = useDispatch();
  const { stories } = useSelector((state) => state.stories);
  const user = useSelector((state) => state.auth.user);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [isClient, setIsClient] = useState(false);

  
  useEffect(() => {
    dispatch(fetchStories());
    setIsClient(true);
  }, [dispatch]);

  // Call onLoaded as soon as stories is defined (even if empty)
  // useEffect(() => {
  //   if (isClient && stories !== undefined && onLoaded) {
  //     onLoaded();
  //   }
  // }, [isClient, stories, onLoaded]);


  useEffect(() => {
  if (stories !== undefined && onLoaded) {
    onLoaded();
  }
}, [stories, onLoaded]);

  // Filter stories: only those from followed users (and self) and not older than 24h
  const now = Date.now();
  const isRecent = (story) => {
    if (!story.createdAt) return false;
    let created;
    if (typeof story.createdAt === "object" && story.createdAt.seconds) {
      created = story.createdAt.seconds * 1000;
    } else {
      created = new Date(story.createdAt).getTime();
    }
    return now - created < 24 * 60 * 60 * 1000;
  };

  // Only show stories from followed users and self
  const followedUids = Array.isArray(user?.following) ? user.following : [];
  const visibleStories = stories?.filter(
    (story) =>
      isRecent(story) &&
      (story.uid === user?.uid || followedUids.includes(story.uid))
  ) || [];

  const userStory = visibleStories.find((story) => story.uid === user?.uid);
  const otherStories = visibleStories.filter((story) => story.uid !== user?.uid);

  const handleStoryClick = (story) => setSelectedStory(story);

  // Show loader until stories are loaded (after client mount)
  if (isClient && stories === undefined) {
    return <LoaderPage />;
  }

  return (
    <>
      <div className="flex space-x-4 overflow-x-auto p-4 scrollbar-hide">
        {/* Your Story */}
        <div className="flex flex-col items-center">
          <div
            className="w-16 h-16 rounded-full border-2 border-blue-500 p-1 cursor-pointer overflow-hidden"
            onClick={() =>
              userStory ? handleStoryClick(userStory) : setIsUploadModalOpen(true)
            }
          >
            <div className="w-full h-full rounded-full overflow-hidden">
              <Image
                src={isClient && user?.profilePic ? user.profilePic : defaultpic}
                alt="Your Story"
                width={64}
                height={64}
                className="object-cover w-full h-full rounded-full"
              />
            </div>
          </div>
          <p className="text-xs mt-1">Your Story</p>
        </div>

        {/* Other Stories */}
        {isClient &&
          otherStories.map((story) => (
            <div
              key={story.id}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleStoryClick(story)}
            >
              <div className="w-16 h-16 rounded-full border-2 border-red-500 p-1 overflow-hidden">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={story.profilePic || defaultpic}
                    alt={story.username}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
              </div>
              <p className="text-xs mt-1">{story.username}</p>
            </div>
          ))}
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <StoryUploadModal onClose={() => setIsUploadModalOpen(false)} />
      )}

      {/* Story Viewer */}
      {selectedStory && (
        <StoryViewer story={selectedStory} onClose={() => setSelectedStory(null)} />
      )}
    </>
  );
};

export default StoryBar;
