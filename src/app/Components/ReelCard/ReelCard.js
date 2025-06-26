// "use client";
// import React, { useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { 
//   deletePost, 
//   likePost, 
//   unlikePost, 
//   addComment,
//   addNotification
// } from "@/app/Store/Slices/feedSlice";
// import { followUser, unfollowUser } from "@/app/Store/Slices/authSlice";
// import { formatDistanceToNow } from "date-fns";
// import { Heart, MessageCircle } from "lucide-react";
// import defaultpic from "@/app/Assets/defaultpic.jpg";

// export default function ReelCard({ post, activeReel, setActiveReel }) {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.auth?.user || null);
//   const isOwner = user?.uid === post.uid;
//   const isLiked = user?.uid && post.likes?.includes(user.uid);
//   const likeCount = post.likes?.length || 0;
//   const commentCount = post.comments?.length || 0;
//   const isFollowing = user?.following?.includes(post.uid);

//   const videoRef = useRef(null);

//   // Helper to get the best available username
//   const getUsername = (userObj) => {
//     return userObj?.username || userObj?.displayName || userObj?.name ||  "Someone";
//   };

//   // Pause/mute logic for only one active reel
//   React.useEffect(() => {
//     if (!videoRef.current) return;
//     if (activeReel === post.id) {
//       videoRef.current.play();
//       videoRef.current.muted = false;
//     } else {
//       videoRef.current.pause();
//       videoRef.current.currentTime = 0;
//       videoRef.current.muted = true;
//     }
//   }, [activeReel, post.id]);

//   const handleLike = async () => {
//     if (!user || !post.uid) return;
//     try {
//       if (isLiked) {
//         await dispatch(unlikePost({ postId: post.id, userId: user.uid })).unwrap();
//       } else {
//         await dispatch(likePost({ postId: post.id, userId: user.uid, postOwnerId: post.uid })).unwrap();
//         if (user.uid !== post.uid) {
//           dispatch(addNotification({
//             id: `like-${post.id}-${Date.now()}`,
//             type: "like",
//             senderId: user.uid,
//             senderName: getUsername(user),
//             receiverId: post.uid,
//             postId: post.id,
//             timestamp: new Date().toISOString(),
//             read: false
//           }));
//         }
//       }
//     } catch (error) {
//       console.error("Like action failed:", error);
//     }
//   };

//   const handleCommentButtonClick = () => {
//     // You can implement comment modal or input here if needed
//   };

//   const timeAgo = post.createdAt
//     ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
//     : "";

//   return (
//     <div className="relative flex justify-center items-center w-full" style={{ minHeight: 600 }}>
//       <div className="relative w-[350px] h-[600px] bg-black rounded-xl overflow-hidden flex items-center justify-center">
//         {/* Video */}
//         <video
//           ref={videoRef}
//           src={post.mediaUrl || post.imageURL || ""}
//           className="w-full h-full object-cover"
//           loop
//           playsInline
//           muted={activeReel !== post.id}
//           onClick={() => setActiveReel(post.id)}
//           onPlay={() => setActiveReel(post.id)}
//           style={{ cursor: "pointer" }}
//         />

//         {/* Overlay: Profile, Username, Caption (left) */}
//         <div className="absolute left-0 bottom-0 p-4 flex flex-col items-start z-10">
//           <div className="flex items-center mb-2">
//             <img
//               src={post.profilePic || defaultpic}
//               alt="profile"
//               className="w-10 h-10 rounded-full object-cover border-2 border-white"
//             />
//             <span className="ml-3 font-semibold text-white drop-shadow">{post.username || "User"}</span>
//           </div>
//           <div className="text-white text-sm drop-shadow mb-1">{post.caption}</div>
//           <div className="text-xs text-gray-300">{timeAgo}</div>
//         </div>

//         {/* Overlay: Like/Comment (right) */}
//         <div className="absolute right-0 bottom-0 flex flex-col items-center p-4 space-y-6 z-10">
//           <button onClick={handleLike} className="flex flex-col items-center text-white focus:outline-none">
//             <Heart 
//               className="w-7 h-7 mb-1" 
//               fill={isLiked ? "red" : "none"} 
//               stroke={isLiked ? "red" : "white"}
//             />
//             <span className="text-sm">{likeCount}</span>
//           </button>
//           <button onClick={handleCommentButtonClick} className="flex flex-col items-center text-white focus:outline-none">
//             <MessageCircle className="w-7 h-7 mb-1" />
//             <span className="text-sm">{commentCount}</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  likePost,
  unlikePost,
  addComment,
  addNotification
} from "@/app/Store/Slices/feedSlice";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle, Send } from "lucide-react";
import defaultpic from "@/app/Assets/defaultpic.jpg";

export default function ReelCard({
  post,
  activeReel,
  setActiveReel,
  openComments,
  setOpenComments
}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user || null);
  const isOwner = user?.uid === post.uid;
  const isLiked = user?.uid && post.likes?.includes(user.uid);
  const likeCount = post.likes?.length || 0;
  const commentCount = post.comments?.length || 0;

  const [commentText, setCommentText] = useState("");
  const [isAddingComment, setIsAddingComment] = useState(false);

  const videoRef = useRef(null);

  // Helper to get the best available username
  const getUsername = (userObj) => {
    return userObj?.username || userObj?.displayName || userObj?.name || "Someone";
  };

  // Pause/mute logic for only one active reel
  React.useEffect(() => {
    if (!videoRef.current) return;
    if (activeReel === post.id) {
      videoRef.current.play();
      videoRef.current.muted = false;
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.muted = true;
    }
  }, [activeReel, post.id]);

  const handleLike = async () => {
    if (!user || !post.uid) return;
    try {
      if (isLiked) {
        await dispatch(unlikePost({ postId: post.id, userId: user.uid })).unwrap();
      } else {
        await dispatch(likePost({ postId: post.id, userId: user.uid, postOwnerId: post.uid })).unwrap();
        if (user.uid !== post.uid) {
          dispatch(addNotification({
            id: `like-${post.id}-${Date.now()}`,
            type: "like",
            senderId: user.uid,
            senderName: getUsername(user),
            receiverId: post.uid,
            postId: post.id,
            timestamp: new Date().toISOString(),
            read: false
          }));
        }
      }
    } catch (error) {
      console.error("Like action failed:", error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user || !commentText.trim() || isAddingComment) return;

    setIsAddingComment(true);
    const newComment = {
      id: `${post.id}-${user.uid}-${Date.now()}`,
      userId: user.uid,
      username: getUsername(user),
      text: commentText.trim(),
      createdAt: new Date().toISOString()
    };

    try {
      await dispatch(addComment({
        postId: post.id,
        comment: newComment,
        postOwnerId: post.uid
      })).unwrap();

      if (user.uid !== post.uid) {
        dispatch(addNotification({
          id: `comment-${post.id}-${Date.now()}`,
          type: "comment",
          senderId: user.uid,
          senderName: getUsername(user),
          receiverId: post.uid,
          postId: post.id,
          commentText: commentText.trim(),
          timestamp: new Date().toISOString(),
          read: false
        }));
      }

      setCommentText("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    } finally {
      setIsAddingComment(false);
    }
  };

  const timeAgo = post.createdAt
    ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
    : "";

  return (
    <div className="relative flex justify-center items-center w-full" style={{ minHeight: 650 }}>
      <div className="relative w-[350px] h-[600px] bg-black rounded-xl overflow-hidden flex items-center justify-center">
        {/* Video */}
        <video
          ref={videoRef}
          src={post.mediaUrl || post.imageURL || ""}
          className="w-full h-full object-cover"
          loop
          playsInline
          muted={activeReel !== post.id}
          onClick={() => setActiveReel(post.id)}
          onPlay={() => setActiveReel(post.id)}
          style={{ cursor: "pointer" }}
        />

        {/* Overlay: Profile, Username, Caption (left) */}
        <div className="absolute left-0 bottom-0 p-4 flex flex-col items-start z-10 w-3/4">
          <div className="flex items-center mb-2">
            <img
              src={post.profilePic || defaultpic}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-white"
            />
            <span className="ml-3 font-semibold text-white drop-shadow">{post.username || "User"}</span>
          </div>
          <div className="text-white text-sm drop-shadow mb-1 break-words">{post.caption}</div>
          <div className="text-xs text-gray-300">{timeAgo}</div>
        </div>

        {/* Overlay: Like/Comment (right) */}
        <div className="absolute right-0 bottom-0 flex flex-col items-center p-4 space-y-6 z-10">
          <button onClick={handleLike} className="flex flex-col items-center text-white focus:outline-none">
            <Heart
              className="w-7 h-7 mb-1"
              fill={isLiked ? "red" : "none"}
              stroke={isLiked ? "red" : "white"}
            />
            <span className="text-sm">{likeCount}</span>
          </button>
          <button
            onClick={setOpenComments}
            className="flex flex-col items-center text-white focus:outline-none"
          >
            <MessageCircle className="w-7 h-7 mb-1" />
            <span className="text-sm">{commentCount}</span>
          </button>
        </div>

{openComments && (
  <div className="absolute left-0 top-0 w-full h-full bg-black bg-opacity-60 flex flex-col justify-end z-20">
    <div className="overflow-y-auto p-4 flex-1">
      {post.comments && post.comments.length > 0 ? (
        post.comments.map((comment, idx) => (
          <div key={comment.id || idx} className="mb-2 text-white text-sm">
            <span className="font-semibold">{comment.username}</span>{" "}
            {comment.text}
          </div>
        ))
      ) : (
        <div className="text-gray-300 text-sm">No comments yet.</div>
      )}
    </div>
    <form
      onSubmit={handleAddComment}
      className="flex items-center p-4 border-t border-gray-700 bg-black bg-opacity-80"
    >
      <input
        type="text"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a comment..."
        className="w-full text-sm bg-transparent border-none text-white placeholder-gray-400 focus:ring-0"
        autoFocus
      />
      <button
        type="submit"
        disabled={!commentText.trim() || isAddingComment}
        className={`ml-2 ${commentText.trim() ? "text-blue-400" : "text-gray-400"}`}
      >
        <Send className="w-5 h-5" />
      </button>
      <button
        type="button"
        className="ml-2 text-gray-400"
        onClick={setOpenComments}
        tabIndex={-1}
      >
        ✕
      </button>
    </form>
  </div>
)}
      </div>
    </div>
  );
}