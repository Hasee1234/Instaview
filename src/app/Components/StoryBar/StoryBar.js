// 'use client';

// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchStories } from '@/app/Store/Slices/storySlice';
// import StoryUploadModal from '../StoryUploadModal/StoryUploadModal';
// import StoryViewer from '../StoryViewer/StoryViewer';
// import defaultpic from '@/app/Assets/defaultpic.jpg'; // Make sure this is a local image

// const StoryBar = () => {
//   const dispatch = useDispatch();
//   const { stories } = useSelector((state) => state.stories);
//   const user = useSelector((state) => state.auth.user);
//   const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
//   const [selectedStory, setSelectedStory] = useState(null);
//   const [isClient, setIsClient] = useState(false); // 👈 Track client-side rendering

//   useEffect(() => {
//     dispatch(fetchStories());
//     setIsClient(true); // 👈 Enable dynamic content only after client-side mount
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
//             className="w-16 h-16 rounded-full border-2 border-blue-500 p-1 cursor-pointer"
//             onClick={() =>
//               userStory ? handleStoryClick(userStory) : setIsUploadModalOpen(true)
//             }
//           >
//             {isClient && user?.profilePic ? (
//               <Image
//                 src={user.profilePic}
//                 alt="Your Story"
//                 width={64}
//                 height={64}
//                 className="rounded-full object-cover"
//               />
//             ) : (
//               <Image
//                 src={defaultpic}
//                 alt="Default Story"
//                 width={64}
//                 height={64}
//                 className="rounded-full object-cover"
//               />
//             )}
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
//               <div className="w-16 h-16 rounded-full border-2 border-red-500 p-1">
//                 <Image
//                   src={story.profilePic || defaultpic}
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
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStories } from '@/app/Store/Slices/storySlice';
import StoryUploadModal from '../StoryUploadModal/StoryUploadModal';
import StoryViewer from '../StoryViewer/StoryViewer';
import defaultpic from '@/app/Assets/defaultpic.jpg';

const StoryBar = () => {
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

  const userStory = stories.find((story) => story.uid === user?.uid);
  const otherStories = stories.filter((story) => story.uid !== user?.uid);

  const handleStoryClick = (story) => setSelectedStory(story);

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
