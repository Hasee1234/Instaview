


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