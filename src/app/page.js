import React from 'react'
import Leftbar from './Components/Leftbar/Leftbar'
import StoryBar from './Components/StoryBar/StoryBar'
import FeedListing from './Components/FeedListing/FeedListing'

export default function Page() {
  return (
    <div className="grid grid-cols-[1fr_2.5fr_1.5fr] gap-1 h-screen">
      {/* Left Sidebar */}
      <div className="p-4 text-center">
        <Leftbar/>
      </div>

      {/* Middle Section (StoryBar + Feed) */}
      <div className="flex flex-col">
        {/* Story Bar */}
        <div className="p-4 text-center">
          <StoryBar />
        </div>
        {/* Feed Section */}
        <div className="p-4 text-center flex-grow overflow-y-auto">
          <FeedListing/>
        </div>
      </div>

      {/* Right Sidebar (Half of Center Section) */}
      <div className="bg-300 p-4 text-center">
        3
      </div>
    </div>
  )
}
