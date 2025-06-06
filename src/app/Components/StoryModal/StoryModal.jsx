import React from "react";

const StoryModal = ({ story, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg max-w-sm w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✕
        </button>
        {story.type === "image" ? (
          <img src={story.mediaUrl} alt="story" className="w-full rounded-lg" />
        ) : (
          <video controls className="w-full rounded-lg">
            <source src={story.mediaUrl} />
          </video>
        )}
        <p className="mt-2 text-sm text-gray-600">From: {story.username}</p>
      </div>
    </div>
  );
};

export default StoryModal;
