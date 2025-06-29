import React, { useState, useEffect } from "react";
import Link from "next/link";

function MobileNavbar({ onCreatePost, onShowSearch }) {
  // Only show on mobile (<=770px)
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handleResize = () => setShow(window.innerWidth <= 770);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  if (!show) return null;

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-between items-center px-2 py-1 z-50">
      <Link href="/">
        <button className="p-2" title="Home">
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M3 9.5L12 4l9 5.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5Z" />
          </svg>
        </button>
      </Link>
      <button className="p-2" onClick={onShowSearch} title="Search">
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
      <Link href="/Pages/Reels">
        <button className="p-2" title="Reels">
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
      <button className="p-2" onClick={onCreatePost} title="Create">
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      <Link href="/Pages/Messages">
        <button className="p-2" title="Messages">
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />
          </svg>
        </button>
      </Link>
      <Link href="/Pages/Profile">
        <button className="p-2" title="Profile">
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="7" r="4" />
            <path d="M5.5 21a9 9 0 0 1 13 0" />
          </svg>
        </button>
      </Link>
    </nav>
  );
}
export default MobileNavbar;