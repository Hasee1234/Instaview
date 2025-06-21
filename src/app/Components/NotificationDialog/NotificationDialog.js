// components/NotificationDialog.tsx
"use client";
import { motion } from "framer-motion";

export default function NotificationDialog({ 
  notifications,
  unreadCount,
  onClose 
}) {
  return (
    <motion.div
      className="fixed top-0 left-0 h-full bg-white z-50 shadow-lg w-96"
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            Notifications {unreadCount > 0 && `(${unreadCount})`}
          </h2>
          <button onClick={onClose} className="text-gray-500">
            ✕
          </button>
        </div>

        {notifications.length === 0 ? (
          <p className="text-gray-500">No notifications yet</p>
        ) : (
          <div className="space-y-2">
            {notifications.map((notification) => (
              <div key={notification.id} className="p-2 border-b">
                <p className="font-medium">{notification.username}</p>
                <p>{notification.message}</p>
                <p className="text-xs text-gray-400">{notification.time}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}   