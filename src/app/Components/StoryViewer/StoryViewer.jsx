'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image'; // ✅ Import Next.js Image

const StoryViewer = ({ story, onClose }) => {
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progressRef = useRef(null);

  const isVideo = story.mediaUrl?.endsWith('.mp4') || story.mediaType === 'video';

  useEffect(() => {
    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            onClose();
            return 100;
          }
          return prev + 1;
        });
      }, 50); // 5 seconds
    }
    return () => clearInterval(interval);
  }, [isPaused, onClose]);

  const handleMouseDown = () => setIsPaused(true);
  const handleMouseUp = () => setIsPaused(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div
        className="relative w-[90%] md:w-[400px] max-w-full h-[600px] rounded-xl overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-700">
          <div
            ref={progressRef}
            className="h-full bg-white transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-white text-xl z-10"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Story Media */}
        {isVideo ? (
          <video
            src={story.mediaUrl}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={story.mediaUrl}
            alt={story.username}
            fill
            className="object-cover"
            priority
          />
        )}
      </div>
    </div>
  );
};

export default StoryViewer;
