"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { db } from "@/app/Config/firebase";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, collection, query, where, onSnapshot } from "firebase/firestore";
import { useSelector } from "react-redux";
import { Heart, MessageCircle } from "lucide-react";
import Link from "next/link";
import defaultPic from "@/app/Assets/defaultpic.jpg";
import Leftbar from "@/app/Components/Leftbar/Leftbar";
import CreatePost from "@/app/Components/CreatePost/CreatePost";

const SearchProfile = () => {
  const { userId } = useParams();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [profileUser, setProfileUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreatePost, setShowCreatePost] = useState(false);

  useEffect(() => {
    if (!userId) {
      setError("No user ID provided");
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        const userDoc = await getDoc(doc(db, "users", userId));
        
        if (!userDoc.exists()) {
          setError("User not found");
          setProfileUser(null);
          setLoading(false);
          return;
        }

        setProfileUser(userDoc.data());
        setIsFollowing(currentUser?.following?.includes(userId) || false);

        const postsQuery = query(
          collection(db, "Posts"), 
          where("uid", "==", userId)
        );
        
        const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
          const fetchedPosts = snapshot.docs.map((doc) => {
            const data = doc.data();
            let createdAt = null;
            
            if (data.createdAt) {
              if (typeof data.createdAt.toDate === 'function') {
                createdAt = data.createdAt.toDate();
              } else if (typeof data.createdAt === 'string') {
                createdAt = new Date(data.createdAt);
              } else if (data.createdAt.seconds) {
                createdAt = new Date(data.createdAt.seconds * 1000);
              }
            }
            
            return {
              id: doc.id,
              ...data,
              createdAt
            };
          });
          
          setPosts(fetchedPosts);
          setLoading(false);
        });

        return () => unsubscribe();
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, currentUser]);

  const handleFollow = async () => {
    if (!currentUser || !profileUser) return;

    try {
      const currentUserRef = doc(db, "users", currentUser.uid);
      const profileUserRef = doc(db, "users", userId);

      if (isFollowing) {
        await updateDoc(currentUserRef, {
          following: arrayRemove(userId)
        });
        await updateDoc(profileUserRef, {
          followers: arrayRemove(currentUser.uid)
        });
      } else {
        await updateDoc(currentUserRef, {
          following: arrayUnion(userId)
        });
        await updateDoc(profileUserRef, {
          followers: arrayUnion(currentUser.uid)
        });
      }

      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Error updating follow status:", error);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 h-screen">
        <div className="p-4 text-center hidden md:block">
          <Leftbar setShowCreatePost={setShowCreatePost} />
        </div>
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 h-screen">
        <div className="p-4 text-center hidden md:block">
          <Leftbar setShowCreatePost={setShowCreatePost} />
        </div>
        <div className="flex justify-center items-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 h-screen">
        <div className="p-4 text-center hidden md:block">
          <Leftbar setShowCreatePost={setShowCreatePost} />
        </div>
        <div className="flex justify-center items-center">
          <p>User not found</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 h-screen">
        <div className="p-4 text-center hidden md:block">
          <Leftbar setShowCreatePost={setShowCreatePost} />
        </div>

        <div className="col-span-1 md:col-span-1 lg:col-span-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-10">
              <img
                src={profileUser.profilePic || defaultPic}
                alt="Profile"
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-gray-200"
              />
              <div className="flex-1 w-full">
                <div className="flex items-center justify-center sm:justify-start gap-6 mb-4">
                  <h2 className="text-2xl font-semibold">{profileUser.name || "Username"}</h2>
                  {currentUser?.uid !== userId && (
                    <button
                      onClick={handleFollow}
                      className={`px-4 py-1.5 text-sm font-medium rounded-md ${
                        isFollowing
                          ? "bg-gray-100 hover:bg-gray-200"
                          : "bg-blue-500 hover:bg-blue-600 text-white"
                      }`}
                    >
                      {isFollowing ? "Following" : "Follow"}
                    </button>
                  )}
                </div>

                <div className="flex justify-center sm:justify-start gap-8 my-4 text-sm">
                  <span className="text-center">
                    <strong className="block text-lg">{posts.length}</strong>
                    posts
                  </span>
                  <span className="text-center">
                    <strong className="block text-lg">{profileUser.followers?.length || 0}</strong>
                    followers
                  </span>
                  <span className="text-center">
                    <strong className="block text-lg">{profileUser.following?.length || 0}</strong>
                    following
                  </span>
                </div>

                <div className="text-center sm:text-left">
                  <p className="text-sm text-gray-700 mt-1">
                    {profileUser.bio || "No bio yet"}
                  </p>
                </div>
              </div>
            </div>

            {posts.length === 0 ? (
              <p className="text-center text-gray-500">No posts yet.</p>
            ) : (
              <div className="grid grid-cols-3 gap-1">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="relative aspect-square bg-gray-100 overflow-hidden group cursor-pointer"
                  >
                    {post.mediaType === "video" ? (
                      <video
                        src={post.mediaUrl}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <img
                        src={post.mediaUrl || post.imageURL}
                        alt="Post"
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="flex items-center text-white space-x-6">
                        <div className="flex items-center">
                          <Heart className="w-5 h-5 fill-white" />
                          <span className="ml-1">{post.likes?.length || 0}</span>
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="w-5 h-5" />
                          <span className="ml-1">{post.comments?.length || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <CreatePost
        isOpen={showCreatePost}
        onClose={() => setShowCreatePost(false)}
      />
    </>
  );
};

export default SearchProfile;