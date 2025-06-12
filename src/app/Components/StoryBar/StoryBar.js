// components/StoryBar.jsx
'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStories } from '@/app/Store/Slices/storySlice';
import StoryUploadModal from '../StoryUploadModal/StoryUploadModal';
import StoryViewer from '../StoryViewer/StoryViewer';

const StoryBar = () => {
  const dispatch = useDispatch();
  const { stories } = useSelector((state) => state.stories); // ✅ fixed typo: stanpmte → state
  const user = useSelector((state) => state.auth.user);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    dispatch(fetchStories());
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
            className="w-16 h-16 rounded-full border-2 border-blue-500 p-1 cursor-pointer"
            onClick={() =>
              userStory ? handleStoryClick(userStory) : setIsUploadModalOpen(true)
            }
          >
            <Image
              src={userStory?.mediaUrl || user?.profilePic || '/default.jpg'}
              alt="Your Story"
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
          </div>
          <p className="text-xs mt-1">Your Story</p>
        </div>

        {/* Other Stories */}
        {otherStories.map((story) => (
          <div
            key={story.id}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleStoryClick(story)}
          >
            <div className="w-16 h-16 rounded-full border-2 border-red-500 p-1">
              <Image
                src={story.profilePic || '/default.jpg'}
                alt={story.username}
                width={64}
                height={64}
                className="rounded-full object-cover"
              />
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
