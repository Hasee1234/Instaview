
"use client";
import { useState } from "react";

export default function CreatePost() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [isOpen, setIsOpen] = useState(true); // By default, modal is open

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Post Submitted:", { caption, image });
  };

  return isOpen ? (
    <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4 bg-white p-6 rounded-lg shadow-lg w-96 z-50 border">
      {/* Close Button */}
      <button 
        onClick={() => setIsOpen(false)}
        className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-black"
      >
        ✖
      </button>

      {/* Title */}
      <h2 className="text-xl font-semibold text-center mb-4">Create New Post</h2>

      {/* Image Upload */}
      <input type="file" onChange={handleImageChange} className="mb-3 w-full" />

      {/* Caption Input */}
      <textarea
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Write a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      ></textarea>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full mt-3 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Post
      </button>
    </div>
  ) : null;
}
