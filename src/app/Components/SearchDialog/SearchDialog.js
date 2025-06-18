"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/app/Config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Link from "next/link";
import defaultPic from "@/app/Assets/defaultpic.jpg";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

const SearchDialog = ({ onClose, isMobile }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    const savedSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    setRecentSearches(savedSearches);
  }, []);

  useEffect(() => {
    const searchUsers = async () => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const usersRef = collection(db, "users"); // Changed from "Users" to "users"
        const q = query(
          usersRef,
          where("name", ">=", searchQuery),
          where("name", "<=", searchQuery + "\uf8ff")
        );
        const querySnapshot = await getDocs(q);
        const results = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSearchResults(results.filter(user => user.id !== currentUser?.uid)); // Exclude current user
      } catch (error) {
        console.error("Error searching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      searchUsers();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, currentUser?.uid]);

  const addToRecentSearches = (user) => {
    const newRecent = [
      user,
      ...recentSearches.filter(item => item.id !== user.id)
    ].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem('recentSearches', JSON.stringify(newRecent));
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <motion.div
      className="fixed top-0 z-50 bg-white"
      initial={{ 
        right: isMobile ? "-100%" : "auto",
        left: isMobile ? "auto" : "0",
        width: isMobile ? "100%" : "14rem",
        height: "100vh"
      }}
      animate={{
        right: isMobile ? "0" : "auto",
        left: isMobile ? "auto" : "0",
        transition: { duration: 0.3 }
      }}
      exit={{ 
        right: isMobile ? "-100%" : "auto",
        left: isMobile ? "auto" : "0",
        transition: { duration: 0.3 }
      }}
    >
      {/* Search Header */}
      <div className="border-b border-gray-200 p-3">
        <div className="flex items-center">
          <button onClick={onClose} className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-100 rounded-md py-2 px-4 pl-10 text-sm focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 absolute left-3 top-3 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Search Content */}
      <div className="overflow-y-auto h-[calc(100vh-56px)]">
        {searchQuery ? (
          isLoading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600"></div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No results found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {searchResults.map((user) => (
                <Link
                  key={user.id}
                  href={`/Pages/SearchProfile/${user.id}`}
                  className="flex items-center p-3 hover:bg-gray-50"
                  onClick={() => addToRecentSearches(user)}
                >
                  <img
                    src={user.profilePic || defaultPic}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <div>
                    <p className="text-sm font-semibold">{user.name || user.username}</p>
                    <p className="text-xs text-gray-500">{user.username}</p>
                  </div>
                </Link>
              ))}
            </div>
          )
        ) : (
          <div>
            <div className="flex justify-between items-center p-3">
              <h3 className="font-semibold">Recent</h3>
              {recentSearches.length > 0 && (
                <button
                  onClick={clearRecentSearches}
                  className="text-sm text-blue-500 font-semibold"
                >
                  Clear all
                </button>
              )}
            </div>
            <div className="divide-y divide-gray-200">
              {recentSearches.length > 0 ? (
                recentSearches.map((user) => (
                  <Link
                    key={user.id}
                    href={`/Pages/SearchProfile/${user.id}`}
                    className="flex items-center p-3 hover:bg-gray-50"
                  >
                    <img
                      src={user.profilePic || defaultPic}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div>
                      <p className="text-sm font-semibold">{user.name || user.username}</p>
                      <p className="text-xs text-gray-500">{user.username}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">No recent searches</p>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SearchDialog;