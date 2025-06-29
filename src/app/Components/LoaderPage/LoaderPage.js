import React from "react";

export default function LoaderPage() {
  return (
    <div className="fixed inset-0 flex flex-col justify-between items-center bg-white z-[9999]">
      {/* Centered Logo */}
      <div className="flex-1 flex items-center justify-center w-full">
        <img
          src="/logo2.png"
          alt="Logo"
          className="w-36 h-36   mb-8"
          draggable={false}
        />
      </div>
      {/* Bottom content with top border */}
      <div className="w-full flex flex-col items-center pb-8 border-t border-gray-200">
        <span className="text-black text-base mt-6 mb-1">from</span>
        <span
          className="text-3xl"
          style={{
            fontFamily: "'Pacifico', cursive",
            color: "#222",
            letterSpacing: "2px",
          }}
        >
          hasee
        </span>
        <style>
          {`@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');`}
        </style>
      </div>
    </div>
  );
}