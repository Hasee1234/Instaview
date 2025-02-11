import React from 'react'
import Leftbar from './Components/Leftbar/page'
import StoryBar from './StoryBar/StoryBar'

export default function Page() {
  return (
    <div className="grid grid-cols-5 gap-1 h-screen">
      {/* Left Sidebar */}
      <div className="p-4 text-center col-span-1">
        <Leftbar />
      </div>

      {/* Middle Section (StoryBar + Feed) */}
      <div className="col-span-3 flex flex-col">
        {/* Story Bar */}
        <div className="p-4 text-center">
          <StoryBar />
        </div>
        {/* Feed Section */}
        <div className="p-4 text-center flex-grow overflow-y-auto">
          Feed
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="bg-gray-300 p-4 text-center col-span-1">
        3
      </div>
    </div>
  )
}
