"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { db } from "@/app/Config/firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import ChatWindow from "@/app/Components/ChatWindow/ChatWindow";
import UserList from "@/app/Components/UserList/UserList";
import CreatePost from "@/app/Components/CreatePost/CreatePost";
import SearchDialog from "@/app/Components/SearchDialog/SearchDialog";
import NotificationDialog from "@/app/Components/NotificationDialog/NotificationDialog";
import { fetchAllUsers } from "@/app/Store/Slices/authSlice";
import MobileNavbar from "@/app/Components/MobileNavbar/MobileNavbar";

function IconLeftbar({ onCreatePost, onShowSearch, onShowNotifications }) {
  return (
    <aside className="w-16 h-screen fixed bg-white border-r border-gray-300 p-2 flex flex-col items-center space-y-6 z-10">
      
       <div className="mb-12 mt-2">
        <img
          src="/logo.png" // Adjust path if needed
          alt="Logo"
          className="w-8 h-8"
        />
        </div>

      <Link href="/">
        <button className="p-1 hover:bg-gray-200 rounded-md" title="Home">
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M3 9.5L12 4l9 5.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5Z" />
          </svg>
        </button>
      </Link>
      <button className="p-1 hover:bg-gray-200 rounded-md" onClick={onShowSearch} title="Search">
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
      <Link href="/Pages/Explore">
        <button className="p-1 hover:bg-gray-200 rounded-md" title="Explore">
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        </button>
      </Link>
      <Link href="/Pages/Reels">
        <button className="p-1 hover:bg-gray-200 rounded-md" title="Reels">
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
            <line x1="7" y1="2" x2="7" y2="22" />
            <line x1="17" y1="2" x2="17" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <line x1="2" y1="7" x2="22" y2="7" />
            <line x1="2" y1="17" x2="22" y2="17" />
          </svg>
        </button>
      </Link>
      <Link href="/messages">
        <button className="p-1 hover:bg-gray-200 rounded-md" title="Messages">
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />
          </svg>
        </button>
      </Link>
      <button
        className="p-1 hover:bg-gray-200 rounded-md"
        onClick={onShowNotifications}
        title="Notifications"
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M20 13V9A8 8 0 1 0 4 9v4l-1 2h18l-1-2z" />
          <path d="M12 23a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2z" />
        </svg>
      </button>
      <button
        className="p-1 hover:bg-gray-200 rounded-md"
        onClick={onCreatePost}
        title="Create Post"
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      <Link href="/Pages/Profile">
        <button className="p-1 hover:bg-gray-200 rounded-md" title="Profile">
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="7" r="4" />
            <path d="M5.5 21a9 9 0 0 1 13 0" />
          </svg>
        </button>
      </Link>
    </aside>
  );
}


export default function Page() {
  const dispatch = useDispatch();
  const { user, allUsers } = useSelector((state) => state.auth);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showSearchDialog, setShowSearchDialog] = useState(false);
  const [showNotificationDialog, setShowNotificationDialog] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
  dispatch(fetchAllUsers());
  const handleResize = () => setIsMobile(window.innerWidth < 766);
  handleResize();
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, [dispatch]);

  const followedUsers = React.useMemo(() => {
    if (!user || !user.following || !Array.isArray(user.following)) return [];
    return allUsers.filter(
      (u) => user.following.includes(u.uid) && u.uid !== user.uid
    );
  }, [user, allUsers]);

  useEffect(() => {
    if (!selectedUser || !user) return setMessages([]);
    const convoId = [user.uid, selectedUser.uid].sort().join("_");
    const q = query(
      collection(db, "conversations", convoId, "messages"),
      orderBy("timestamp")
    );
    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((doc) => doc.data()));
    });
    return () => unsub();
  }, [selectedUser, user]);

  // Mobile: show only chat or userlist
  const showUserList = !isMobile || (isMobile && !selectedUser);
  const showChat = !isMobile || (isMobile && selectedUser);

  return (
    <>
      <div className="flex h-screen">
        {/* Hide leftbar on mobile (<=766px) */}
        {!isMobile && (
          <IconLeftbar
            onCreatePost={() => setShowCreatePost(true)}
            onShowSearch={() => setShowSearchDialog(true)}
            onShowNotifications={() => setShowNotificationDialog(true)}
          />
        )}
{/* <div className={`${!isMobile ? "ml-16" : ""} flex flex-1 relative`}>      */}
<div className={`flex flex-1 relative ${!isMobile ? "ml-16" : ""}`}>

       {showUserList && (
            <UserList
              users={followedUsers}
              selectedUserId={selectedUser?.uid}
              onSelect={u => setSelectedUser(u)}
              isMobile={isMobile}
            />
          )}
          {/* {showChat && selectedUser && (
<div className={`p-4 border-t bg-white ${isMobile ? "pb-20" : ""}`}>
              <ChatWindow
                user={user}
                messages={messages}
                selectedUser={selectedUser}
                isMobile={isMobile}
                onBack={() => setSelectedUser(null)}
              />
            </div>
          )} */}
          {showChat && selectedUser && (
  <div className={`flex-1 flex flex-col h-full ${isMobile ? "pb-20" : ""}`}>
    <ChatWindow
      user={user}
      messages={messages}
      selectedUser={selectedUser}
      isMobile={isMobile}
      onBack={() => setSelectedUser(null)}
    />
  </div>
)}
          {!selectedUser && !isMobile && (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              Select a user to start chatting
            </div>
          )}
        </div>
        <CreatePost isOpen={showCreatePost} onClose={() => setShowCreatePost(false)} />
        {showSearchDialog && (
          <SearchDialog isMobile={isMobile} onClose={() => setShowSearchDialog(false)} />
        )}
        {showNotificationDialog && (
          <NotificationDialog onClose={() => setShowNotificationDialog(false)} isMobile={isMobile} />
        )}
      </div>
      {/* Mobile Navbar always at the bottom */}
      <MobileNavbar
        onCreatePost={() => setShowCreatePost(true)}
        onShowSearch={() => setShowSearchDialog(true)}
      />
    </>
  );
}