// components/StoryBar.jsx
'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStories } from '@/app/Store/Slices/storySlice';
import StoryUploadModal from './StoryUploadModal';
import StoryViewer from './StoryViewer';

const StoryBar = () => {
  const dispatch = useDispatch();
  const { stories } = useSelector((state) => state.stories);
  const user = useSelector((state) => state.auth.user);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    dispatch(fetchStories());
  }, [dispatch]);

  const userStory = stories.find((story) => story.uid === user?.uid);
  const otherStories = stories.filter((story) => story.uid !== user?.uid);

  return (
    <div className="flex space-x-4 overflow-x-auto p-4 scrollbar-hide">
      <div className="flex flex-col items-center">
        <div
          className="w-16 h-16 rounded-full border-2 border-blue-500 p-1 cursor-pointer"
          onClick={() => {
            if (userStory) {
              setSelectedStory(userStory);
            } else {
              setIsUploadModalOpen(true);
            }
          }}
        >
          <Image
            src={userStory ? userStory.mediaUrl : user?.profilePic || '/default.jpg'}
            alt="Your Story"
            width={64}
            height={64}
            className="rounded-full object-cover"
          />
        </div>
        <p className="text-xs mt-1">Your Story</p>
      </div>

      {otherStories.map((story) => (
        <div
          key={story.id}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => setSelectedStory(story)}
        >
          <div className="w-16 h-16 rounded-full border-2 border-red-500 p-1">
            <Image
              src={story.mediaUrl}
              alt={story.username}
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
          </div>
          <p className="text-xs mt-1">{story.username}</p>
        </div>
      ))}

      {isUploadModalOpen && (
        <StoryUploadModal onClose={() => setIsUploadModalOpen(false)} />
      )}

      {selectedStory && (
        <StoryViewer story={selectedStory} onClose={() => setSelectedStory(null)} />
      )}
    </div>
  );
};

export default StoryBar;
