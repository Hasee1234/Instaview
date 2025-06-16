"use client";
import { createPost } from "@/app/Store/Slices/feedSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CreatePost({ isOpen, onClose }) {
  const [caption, setCaption] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);

  const uploadImage = async (e) => {
    try {
      setLoading(true);
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "social media app");

      const res = await fetch("https://api.cloudinary.com/v1_1/dd22qjrpn/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.secure_url) setImageURL(data.secure_url);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const createPostHandler = () => {
    if (!user) {
      alert("You're not logged in!");
      return;
    }

    if (!caption.trim() || !imageURL) {
      alert("Image and caption required.");
      return;
    }

    const postData = {
      caption: caption.trim(),
      imageURL,
      location: location.trim(),
      createdAt: new Date().toISOString(),
      uid: user.uid,
      username: user.name || "User",
      profilePic: user.profilePic || null, // ✅ Add this line

    };

    dispatch(createPost(postData));

    onClose();
    setCaption("");
    setImageURL("");
    setLocation("");
  };

  if (!isOpen) return null;

  const isDisabled = !caption.trim() || !imageURL || loading;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-96 border">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-black"
        >
          ✖
        </button>

        <h2 className="text-xl font-semibold text-center mb-4">Create New Post</h2>

        <input type="file" className="mb-3 w-full" onChange={uploadImage} />

        <textarea
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        ></textarea>

        <input
          type="text"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
          placeholder="Enter location (optional)..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button
          onClick={createPostHandler}
          disabled={isDisabled}
          className={`w-full mt-3 py-2 rounded-md text-white ${
            isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Uploading..." : "Post"}
        </button>
      </div>
    </div>
  );
}