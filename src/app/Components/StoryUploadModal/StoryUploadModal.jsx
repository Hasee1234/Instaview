'use client';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStory } from '@/app/Store/Slices/storySlice';

const StoryUploadModal = ({ onClose }) => {
  const [mediaUrl, setMediaUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
const uploadMedia = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  setLoading(true);
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'social media app');

  // Detect file type
  const isVideo = file.type.startsWith('video/');
  const uploadUrl = isVideo
    ? 'https://api.cloudinary.com/v1_1/dd22qjrpn/video/upload'
    : 'https://api.cloudinary.com/v1_1/dd22qjrpn/image/upload';

  try {
    const res = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    if (data.secure_url) {
      setMediaUrl(data.secure_url);
    }
  } catch (error) {
    console.error('Upload failed:', error);
  } finally {
    setLoading(false);
  }
};

  const handleSubmit = () => {
    if (!mediaUrl) return;
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const storyData = {
      uid: user.uid,
      username: user.name || 'User',
      profilePic: user.profilePic || null,
      mediaUrl,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
    };
    dispatch(addStory(storyData));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-96 border">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-black"
        >
          ✖
        </button>
        <h2 className="text-xl font-semibold text-center mb-4">Upload Story</h2>
        <input
          type="file"
          accept="image/*,video/*"
          className="mb-3 w-full"
          onChange={uploadMedia}
        />
        {mediaUrl && (
          <div className="mb-3">
            {mediaUrl.match(/\.(mp4|webm|ogg)$/i) ? (
              <video src={mediaUrl} controls className="w-full rounded" />
            ) : (
              <img src={mediaUrl} alt="preview" className="w-full rounded" />
            )}
          </div>
        )}
        <button
          onClick={handleSubmit}
          disabled={!mediaUrl || loading}
          className={`w-full mt-3 py-2 rounded-md text-white ${
            !mediaUrl || loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? 'Uploading...' : 'Post Story'}
        </button>
      </div>
    </div>
  );
};

export default StoryUploadModal;