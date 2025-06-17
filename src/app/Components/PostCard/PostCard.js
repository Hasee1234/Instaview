// "use client";
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { deletePost, likePost, unlikePost, addComment } from "@/app/Store/Slices/feedSlice";
// import { formatDistanceToNow } from "date-fns";
// import { MoreHorizontal, Heart, MessageCircle, Send } from "lucide-react";
// import defaultpic from "@/app/Assets/defaultpic.jpg";

// export default function PostCard({ post }) {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.auth?.user || null);
//   const [showDelete, setShowDelete] = useState(false);
//   const [showComments, setShowComments] = useState(false);
//   const [commentText, setCommentText] = useState("");
//   const [localPost, setLocalPost] = useState(post);
//   const [showCommentInput, setShowCommentInput] = useState(false);
//   const [isAddingComment, setIsAddingComment] = useState(false);
  
//   // Safely get the post from Redux store
//   const reduxPost = useSelector(state => {
//     // Check if state.feed exists and has posts array
//     const postsArray = state.feed?.posts || [];
//     return postsArray.find(p => p.id === post.id) || post;
//   });

//   useEffect(() => {
//     setLocalPost(reduxPost);
//   }, [reduxPost]);

//   // Rest of your component remains the same...
//   const isOwner = user?.uid === localPost.uid;
//   const isLiked = user?.uid && localPost.likes?.includes(user.uid);
//   const likeCount = localPost.likes?.length || 0;
//   const commentCount = localPost.comments?.length || 0;

//   const handleDelete = (id) => {
//     if (user) {
//       dispatch(deletePost({ postId: id, currentUserUid: user.uid }));
//     }
//   };

//   const handleLike = async () => {
//     if (!user) return;
    
//     try {
//       if (isLiked) {
//         await dispatch(unlikePost({ postId: localPost.id, userId: user.uid })).unwrap();
//       } else {
//         await dispatch(likePost({ postId: localPost.id, userId: user.uid })).unwrap();
//       }
//     } catch (error) {
//       console.error("Like action failed:", error);
//     }
//   };

//   const handleAddComment = async (e) => {
//     e.preventDefault();
//     if (!user || !commentText.trim() || isAddingComment) return;
    
//     setIsAddingComment(true);
//     const timestamp = Date.now();
//     const newComment = {
//       id: `${localPost.id}-${user.uid}-${timestamp}`,
//       userId: user.uid,
//       username: user.name || "User",
//       text: commentText.trim(),
//       createdAt: new Date().toISOString()
//     };
    
//     try {
//       await dispatch(addComment({
//         postId: localPost.id, 
//         comment: newComment
//       })).unwrap();
      
//       setCommentText("");
//       setShowCommentInput(false);
//     } catch (error) {
//       console.error("Failed to add comment:", error);
//     } finally {
//       setIsAddingComment(false);
//     }
//   };

//   const handleCommentButtonClick = () => {
//     setShowComments(true);
//     setShowCommentInput(true);
//   };

//   const timeAgo = localPost.createdAt
//     ? formatDistanceToNow(new Date(localPost.createdAt), { addSuffix: true })
//     : "";

//   return (
//     <div className="bg-white border-x border-gray-300 rounded-md shadow-sm mb-6 w-full max-w-xl mx-auto">
//       {/* Header */}
//       <div className="flex items-center justify-between px-4 py-3">
//         <div className="flex items-center space-x-2">
//           <img
//             src={localPost.profilePic || user?.profilePic || defaultpic}
//             alt="profile"
//             className="w-10 h-10 rounded-full object-cover"
//           />
//           <span className="font-semibold">{localPost.username || "User"}</span>
//           <span className="text-gray-400">•</span>
//           <span className="text-gray-500 text-sm">{timeAgo}</span>
//           <span className="text-gray-400">•</span>
//           <button className="text-blue-500 font-semibold text-sm hover:underline">
//             Follow
//           </button>
//         </div>

//         <div className="relative">
//           <button onClick={() => setShowDelete((prev) => !prev)}>
//             <MoreHorizontal className="w-5 h-5 text-gray-600" />
//           </button>
//           {showDelete && isOwner && (
//             <button
//               onClick={() => handleDelete(localPost.id)}
//               className="absolute right-0 mt-2 bg-white border border-gray-300 text-red-500 text-sm px-3 py-1 rounded shadow"
//             >
//               Delete
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Post Media */}
//       {localPost.imageURL && (
//         <div className="w-full aspect-square bg-black flex items-center justify-center">
//           <img
//             src={localPost.imageURL}
//             alt="Post"
//             className="object-contain max-h-full max-w-full"
//           />
//         </div>
//       )}

//       {/* Action Buttons */}
//       <div className="px-4 py-3 flex space-x-4">
//         <button onClick={handleLike}>
//           <Heart 
//             className="w-5 h-5" 
//             fill={isLiked ? "red" : "none"} 
//             stroke={isLiked ? "red" : "currentColor"}
//           />
//         </button>
//         <button onClick={handleCommentButtonClick}>
//           <MessageCircle className="w-5 h-5 text-gray-600" />
//         </button>
//       </div>

//       {/* Likes */}
//       {likeCount > 0 && (
//         <div className="px-4 text-sm font-semibold">
//           {isLiked ? "Liked by you" : `Liked by ${localPost.username}`}
//           {likeCount > 1 && ` and ${likeCount - 1} others`}
//         </div>
//       )}

//       {/* Caption */}
//       <div className="px-4 text-left">
//         <p className="text-sm">
//           <span className="font-semibold">{localPost.username || "User"}</span>{" "}
//           {localPost.caption}
//         </p>
//       </div>

//       {/* Comments */}
//       {commentCount > 0 && (
//         <>
//           {!showComments && commentCount > 1 && (
//             <button
//               className="px-4 py-1 text-sm text-gray-500 cursor-pointer"
//               onClick={() => setShowComments(true)}
//             >
//               View all {commentCount} comments
//             </button>
//           )}
          
//           {showComments ? (
//             <div className="px-4 space-y-1">
//               {localPost.comments?.map((comment, index) => (
//                 <div 
//                   key={`${localPost.id}-comment-${index}-${comment.createdAt}`}
//                   className="text-sm"
//                 >
//                   <span className="font-semibold">{comment.username}</span>{" "}
//                   {comment.text}
//                 </div>
//               ))}
//             </div>
//           ) : (
//             commentCount > 0 && (
//               <div className="px-4 pb-4 text-sm">
//                 <span className="font-semibold">{localPost.comments[0].username}</span>{" "}
//                 {localPost.comments[0].text}
//               </div>
//             )
//           )}
//         </>
//       )}

//       {/* Add Comment */}
//       {showCommentInput && (
//         <form onSubmit={handleAddComment} className="px-4 py-2 border-t flex items-center">
//           <input
//             type="text"
//             value={commentText}
//             onChange={(e) => setCommentText(e.target.value)}
//             placeholder="Add a comment..."
//             className="w-full text-sm border-none focus:ring-0 px-0"
//             autoFocus
//           />
//           <button 
//             type="submit"
//             disabled={!commentText.trim() || isAddingComment}
//             className={`ml-2 ${commentText.trim() ? 'text-blue-500' : 'text-gray-400'}`}
//           >
//             <Send className="w-5 h-5" />
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }
"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likePost, unlikePost, addComment } from "@/app/Store/Slices/feedSlice";
import { followUser, unfollowUser } from "@/app/Store/Slices/authSlice"; // Import from authSlice
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal, Heart, MessageCircle, Send } from "lucide-react";
import defaultpic from "@/app/Assets/defaultpic.jpg";

export default function PostCard({ post }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user || null);
  const [showDelete, setShowDelete] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [localPost, setLocalPost] = useState(post);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [isAddingComment, setIsAddingComment] = useState(false);
  
  // Safely get the post from Redux store
  const reduxPost = useSelector(state => {
    const postsArray = state.feed?.posts || [];
    return postsArray.find(p => p.id === post.id) || post;
  });

  useEffect(() => {
    setLocalPost(reduxPost);
  }, [reduxPost]);

  const isOwner = user?.uid === localPost.uid;
  const isLiked = user?.uid && localPost.likes?.includes(user.uid);
  const likeCount = localPost.likes?.length || 0;
  const commentCount = localPost.comments?.length || 0;
  const isFollowing = user?.following?.includes(localPost.uid);

  const handleDelete = (id) => {
    if (user) {
      dispatch(deletePost({ postId: id, currentUserUid: user.uid }));
    }
  };

  const handleFollow = async () => {
    if (!user || !localPost.uid) return;
    
    try {
      if (isFollowing) {
        await dispatch(unfollowUser({
          currentUserId: user.uid,
          targetUserId: localPost.uid
        })).unwrap();
      } else {
        await dispatch(followUser({
          currentUserId: user.uid,
          targetUserId: localPost.uid
        })).unwrap();
      }
    } catch (error) {
      console.error("Follow action failed:", error);
    }
  };

  // ... (keep all your existing functions like handleLike, handleAddComment, etc.)

  const timeAgo = localPost.createdAt
    ? formatDistanceToNow(new Date(localPost.createdAt), { addSuffix: true })
    : "";

  return (
    <div className="bg-white border-x border-gray-300 rounded-md shadow-sm mb-6 w-full max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-2">
          <img
            src={localPost.profilePic || user?.profilePic || defaultpic}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-semibold">{localPost.username || "User"}</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-500 text-sm">{timeAgo}</span>
          <span className="text-gray-400">•</span>
          {!isOwner && (
            <button 
              onClick={handleFollow}
              className={`text-sm font-semibold hover:underline ${
                isFollowing ? 'text-gray-600' : 'text-blue-500'
              }`}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          )}
        </div>

        {/* Rest of your PostCard component remains exactly the same */}
        {/* ... */}
      </div>

      {/* Post Media - keep this exactly as it was */}
      {localPost.imageURL && (
        <div className="w-full aspect-square bg-black flex items-center justify-center">
          <img
            src={localPost.imageURL}
            alt="Post"
            className="object-contain max-h-full max-w-full"
          />
        </div>
      )}

      {/* Keep all the rest of your PostCard component exactly as it was */}
      {/* ... */}
    </div>
  );
}