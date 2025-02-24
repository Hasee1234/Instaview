
"use client";
import { createPost } from "@/app/Store/Slices/feedSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function CreatePost() {
  const [caption, setCaption] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [location, setLocation] = useState("")
  const [isOpen, setIsOpen] = useState(true);

  
  const dispatch=useDispatch()
  
  
  const createPostHandler = () => {
    console.log("caption", caption);
    console.log("location", location);
    console.log("imageURL", imageURL);
  
    let postData = {
      caption,
      imageURL: "https://via.placeholder.com/150",
      location,
      createdAt: new Date().toISOString(), // Fixed key name & added parentheses
    };
  
    dispatch(createPost(postData));
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
      <input type="file" className="mb-3 w-full" />

      {/* Caption Input */}
      <textarea
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Write a caption..."
        value={caption}
        onChange={(e)=>setCaption(e.target.value)}
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
        Post
      </button>
    </div>
  ) : null;
}
