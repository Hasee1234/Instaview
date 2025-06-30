"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const StoryViewer = ({
  story,
  onClose,
  onPrev,
  onNext,
  hasPrev = false,
  hasNext = false,
}) => {
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const isVideo =
    story.mediaUrl?.endsWith(".mp4") ||
    story.mediaType === "video" ||
    story.mediaUrl?.includes("/video/upload");

  // Progress timer
  useEffect(() => {
    let interval;
    if (!isPaused && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 1, 100));
      }, 50); // 5 seconds
    }
    return () => clearInterval(interval);
  }, [isPaused, progress]);

  // Call onClose when progress reaches 100
  useEffect(() => {
    if (progress >= 100 && onNext) {
      onNext();
    } else if (progress >= 100) {
      onClose();
    }
  }, [progress, onClose, onNext]);

  const handleMouseDown = () => setIsPaused(true);
  const handleMouseUp = () => setIsPaused(false);

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
     
       <span
    className="fixed top-4 left-6 text-2xl font-logo italic text-white z-[100] max-[1233px]:hidden select-none"
  >
    Instaview
  </span>

      <div
        className="relative w-[95vw] max-w-[400px] h-[600px] bg-black rounded-xl overflow-hidden shadow-2xl flex flex-col group"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-700/60 z-20">
          <div
            className="h-full bg-white transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Top Bar: Avatar & Username, Close */}
        <div className="absolute top-3 left-0 w-full flex items-center justify-between px-4 z-20">
          {/* User */}
          <div className="flex items-center">
            <Image
              src={story.profilePic || "/user-placeholder.jpg"}
              alt={story.username}
              width={36}
              height={36}
              className="rounded-full object-cover border-2 border-white"
            />
            <span className="ml-3 text-white font-semibold text-base drop-shadow">
              {story.username}
            </span>
          </div>
          {/* Close */}
          <button
            className="text-white text-2xl bg-black/50 rounded-full w-9 h-9 flex items-center justify-center hover:bg-black/80 transition"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Navigation Buttons */}
        {hasPrev && (
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center transition"
            onClick={() => {
              setProgress(0);
              if (onPrev) onPrev();
            }}
            aria-label="Previous Story"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}
        {hasNext && (
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center transition"
            onClick={() => {
              setProgress(0);
              if (onNext) onNext();
            }}
            aria-label="Next Story"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        )}

        {/* Story Media */}
        <div className="w-full h-full flex items-center justify-center">
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
    </div>
  );
};

export default StoryViewer;