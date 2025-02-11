import React from 'react';
import { Home, Search, Compass, Film, MessageSquare, Heart, PlusSquare, User, Menu } from 'lucide-react';

const Leftbar = () => {
  const menuItems = [
    { icon: <Home size={22} />, label: 'Home' },
    { icon: <Search size={22} />, label: 'Search' },
    { icon: <Compass size={22} />, label: 'Explore' },
    { icon: <Film size={22} />, label: 'Reels' },
    { icon: <MessageSquare size={22} />, label: 'Messages' },
    { icon: <Heart size={22} />, label: 'Notifications' },
    { icon: <PlusSquare size={22} />, label: 'Create' },
    { icon: <User size={22} />, label: 'Profile' },
    
  ];

  return (
    <aside className="w-56 h-screen fixed bg-white border-r border-gray-300 p-4 flex flex-col">
      <div className="flex justify-start items-center mb-8">
        <label className="text-lg font-[Pacifico] italic">INSTAVIEW</label>
      </div>
      <ul className="space-y-4">
        {menuItems.map((item, index) => (
          <li key={index}>
            <button className="flex items-center w-full p-3 text-base hover:bg-gray-200 rounded-md transition">
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Leftbar;
