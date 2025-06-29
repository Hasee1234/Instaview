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


// 'use client';
// import React, { useEffect, useRef, useState } from 'react';
// import Image from 'next/image';

// const StoryViewer = ({ story, onClose }) => {
//   const [progress, setProgress] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const progressRef = useRef(null);

//   const isVideo = story.mediaUrl?.endsWith('.mp4') || story.mediaType === 'video';

//   // Progress timer
//   useEffect(() => {
//     let interval;
//     if (!isPaused && progress < 100) {
//       interval = setInterval(() => {
//         setProgress((prev) => Math.min(prev + 1, 100));
//       }, 50); // 5 seconds
//     }
//     return () => clearInterval(interval);
//   }, [isPaused, progress]);

//   // Call onClose when progress reaches 100
//   useEffect(() => {
//     if (progress >= 100) {
//       onClose();
//     }
//   }, [progress, onClose]);

//   const handleMouseDown = () => setIsPaused(true);
//   const handleMouseUp = () => setIsPaused(false);

//   return (
//     <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
//       <div
//         className="relative w-[95vw] max-w-[400px] h-[600px] bg-black rounded-xl overflow-hidden shadow-2xl flex flex-col"
//         onMouseDown={handleMouseDown}
//         onMouseUp={handleMouseUp}
//         onTouchStart={handleMouseDown}
//         onTouchEnd={handleMouseUp}
//       >
//         {/* Progress Bar */}
//         <div className="absolute top-0 left-0 w-full h-1 bg-gray-700/60 z-20">
//           <div
//             ref={progressRef}
//             className="h-full bg-white transition-all duration-75"
//             style={{ width: `${progress}%` }}
//           />
//         </div>

//         {/* Top Bar: Avatar & Username */}
//         <div className="absolute top-3 left-4 flex items-center z-20">
//           <Image
//             src={story.profilePic || "/defaultpic.jpg"}
//             alt={story.username}
//             width={36}
//             height={36}
//             className="rounded-full object-cover border-2 border-white"
//           />
//           <span className="ml-3 text-white font-semibold text-base drop-shadow">{story.username}</span>
//         </div>

//         {/* Close Button */}
//         <button
//           className="absolute top-3 right-4 text-white text-2xl z-20 bg-black/50 rounded-full w-9 h-9 flex items-center justify-center hover:bg-black/80 transition"
//           onClick={onClose}
//           aria-label="Close"
//         >
//           ✕
//         </button>

//         {/* Story Media */}
//         <div className="w-full h-full flex items-center justify-center">
//           {isVideo ? (
//             <video
//               src={story.mediaUrl}
//               autoPlay
//               muted
//               playsInline
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <Image
//               src={story.mediaUrl}
//               alt={story.username}
//               fill
//               className="object-cover"
//               priority
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StoryViewer;