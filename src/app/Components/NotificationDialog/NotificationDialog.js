"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  markNotificationAsRead,
  getNotifications
} from "@/app/Store/Slices/feedSlice";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { db } from "@/app/Config/firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";

export default function NotificationDialog({ 
  onClose,
  isMobile = false
}) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { notifications, unreadNotifications } = useSelector(state => state.feed);
  const user = useSelector(state => state.auth.user);

  // Real-time notifications listener
  useEffect(() => {
    if (!user?.uid) return;
    
    setIsLoading(true);
    const q = query(
      collection(db, "notifications"),
      where("receiverId", "==", user.uid),
      orderBy("timestamp", "desc")
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedNotifications = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() // No additional processing needed
      }));
      
      dispatch({ 
        type: 'feed/getNotifications/fulfilled', 
        payload: updatedNotifications 
      });
      setIsLoading(false);
    });
    
    return () => unsubscribe();
  }, [user?.uid, dispatch]);

  // Mark notifications as read when dialog opens
  useEffect(() => {
    if (notifications) {
      notifications.forEach(notification => {
        if (!notification.read) {
          dispatch(markNotificationAsRead(notification.id));
        }
      });
    }
  }, [dispatch, notifications]);

  const getNotificationLink = (notification) => {
    switch (notification.type) {
      case 'like':
      case 'comment':
        return `/post/${notification.postId}`;
      case 'follow':
        return `/profile/${notification.senderId}`;
      default:
        return '#';
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like': return '❤️';
      case 'comment': return '💬';
      case 'follow': return '👤';
      default: return '🔔';
    }
  };

  const formatTime = (timestamp) => {
    try {
      let date;
      if (timestamp?.toDate) {
        date = timestamp.toDate();
      } else if (timestamp?.seconds) {
        date = new Date(timestamp.seconds * 1000);
      } else {
        date = new Date(timestamp);
      }
      return formatDistanceToNow(date, { addSuffix: true });
    } catch {
      return 'some time ago';
    }
  };

  const getNotificationMessage = (notification) => {
    const username = notification.senderName || "Someone";
    switch(notification.type) {
      case 'like': return `${username} liked your post`;
      case 'comment': 
        return notification.commentText 
          ? `${username} commented: "${notification.commentText}"`
          : `${username} commented on your post`;
      case 'follow': return `${username} started following you`;
      default: return `${username} interacted with your post`;
    }
  };

  return (
    <motion.div
      className={`fixed top-0 left-0 h-full bg-white z-50 shadow-lg ${
        isMobile ? "w-full" : "w-96"
      }`}
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
    >
      <div className="p-4 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            Notifications {unreadNotifications > 0 && `(${unreadNotifications})`}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close notifications"
          >
            ✕
          </button>
        </div>

        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">Loading notifications...</p>
          </div>
        ) : !notifications || notifications.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">No notifications yet</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            {notifications.map((notification) => (
              <Link
                key={notification.id}
                href={getNotificationLink(notification)}
                onClick={() => !notification.read && 
                  dispatch(markNotificationAsRead(notification.id))}
                className={`block p-3 hover:bg-gray-50 transition-colors ${
                  !notification.read ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </span>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="font-medium">
                        {notification.senderName || "Someone"}
                      </p>
                      <span className="text-xs text-gray-400">
                        {formatTime(notification.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm mt-1">
                      {getNotificationMessage(notification)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}