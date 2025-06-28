import React, { useState, useRef, useEffect } from "react";
import { db } from "@/app/Config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function formatTime(ts) {
  if (!ts) return "";
  const date = ts.seconds ? new Date(ts.seconds * 1000) : new Date(ts);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatDate(ts) {
  if (!ts) return "";
  const date = ts.seconds ? new Date(ts.seconds * 1000) : new Date(ts);
  return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

export default function ChatWindow({ user, messages, selectedUser, onBack, isMobile }) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedUser]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !user || !selectedUser) return;
    const convoId = [user.uid, selectedUser.uid].sort().join("_");
    await addDoc(collection(db, "conversations", convoId, "messages"), {
      text: input,
      senderId: user.uid,
      receiverId: selectedUser.uid,
      timestamp: serverTimestamp(),
    });
    setInput("");
  };

  // Get the date of the first message, or today if no messages
  const chatDate = messages.length
    ? formatDate(messages[0].timestamp)
    : formatDate(new Date());

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Top bar with user info and date */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3">
          {isMobile && (
            <button
              className="p-2 text-blue-600 font-semibold bg-white rounded-full"
              onClick={onBack}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <img
            src={selectedUser?.profilePic || "/defaultpic.jpg"}
            className="w-9 h-9 rounded-full object-cover border border-gray-200"
            alt=""
          />
          <span className="font-semibold text-gray-800 text-lg">
            {selectedUser?.name || selectedUser?.username || selectedUser?.displayName || "User"}
          </span>
        </div>
        <span className="text-xs text-gray-400">{chatDate}</span>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-white">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.senderId === user.uid ? "text-right" : "text-left"}`}>
            <div className={`inline-block px-3 py-2 rounded-lg relative ${msg.senderId === user.uid ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
              {msg.text}
              <div className="text-[10px] text-gray-400 mt-1 text-right">
                {formatTime(msg.timestamp)}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* Input */}
      <form className="p-2 border-t bg-gray-50 flex gap-2" onSubmit={handleSend}>
        <input
          className="flex-1 border rounded px-2 py-1"
          placeholder="Type a message..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded disabled:opacity-50"
          disabled={!input.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
}