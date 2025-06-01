"use client";
import { createPost } from "@/app/Store/Slices/feedSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function CreatePost({ isOpen, onClose }) {
  const [caption, setCaption] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const uploadImage = async (e) => {
    try {
      setLoading(true);
      const file = e.target.files[0];
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "social media app");
      data.append("cloud_name", "dd22qjrpn");

      const res = await fetch("https://api.cloudinary.com/v1_1/dd22qjrpn/image/upload", {
        method: "POST",
        body: data,
      });

      const uploadedImage = await res.json();
      if (uploadedImage.secure_url) {
        setImageURL(uploadedImage.secure_url);
      }
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setLoading(false);
    }
  };

  const createPostHandler = () => {
    const postData = {
      caption,
      imageURL,
      location,
      createdAt: new Date().toISOString(),
    };

    dispatch(createPost(postData));
    onClose(); // Close modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-96 border">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-black"
        >
          ✖
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center mb-4">Create New Post</h2>

        {/* Image Upload */}
        <input type="file" className="mb-3 w-full" onChange={uploadImage} />

        {/* Caption Input */}
        <textarea
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        ></textarea>

        {/* Location Input */}
        <input
          type="text"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
          placeholder="Enter location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        {/* Submit Button */}
        <button
          onClick={createPostHandler}
          className="w-full mt-3 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          {loading ? "Uploading..." : "Post"}
        </button>
      </div>
    </div>
  );
}
