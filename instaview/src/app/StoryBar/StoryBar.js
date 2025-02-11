import React from "react";
import Image from "next/image";

const stories = [
  { id: 1, name: "Your Story", img: "/your-image.jpg", isUser: true },
  { id: 2, name: "John", img: "/user1.jpg" },
  { id: 3, name: "Emma", img: "/user2.jpg" },
  { id: 4, name: "Chris", img: "/user3.jpg" },
  { id: 5, name: "Chris", img: "/user3.jpg" },
  { id: 6, name: "Chris", img: "/user3.jpg" },
  { id: 7, name: "Chris", img: "/user3.jpg" },
  { id: 8, name: "Chris", img: "/user3.jpg" },
];

const StoryBar = () => {
  return (
    <div className="flex space-x-4 overflow-x-auto p-4 scrollbar-hide">
      {stories.map((story) => (
        <div key={story.id} className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full border-2 border-red-500 p-1">
            <Image
              src={story.img}
              alt={story.name}
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
          </div>
          <p className="text-xs mt-1">{story.name}</p>
        </div>
      ))}
    </div>
  );
};

export default StoryBar;
