

// import React from "react";

// export default function UserList({ users, selectedUserId, onSelect, isMobile }) {
//   return (
//     <div className={`bg-gray-50 border-r h-full overflow-y-auto flex flex-col ${isMobile ? "w-full" : "w-56"}`}>
//       <div className="px-4 py-4 border-b text-lg font-bold bg-white sticky top-0 z-10">Chats</div>
//       {users.length === 0 && (
//         <div className="text-gray-400 text-center mt-8">No followed users</div>
//       )}
//       {users.map((u) => (
//         <div
//           key={u.uid}
//           onClick={() => onSelect(u)}
//           className={`cursor-pointer px-4 py-3 flex items-center gap-2 hover:bg-blue-100 transition ${
//             selectedUserId === u.uid ? "bg-blue-50" : ""
//           }`}
//         >
//           <img src={u.profilePic || "/defaultpic.jpg"} className="w-8 h-8 rounded-full object-cover" alt="" />
//           <span className="font-medium truncate">{u.name || u.username || u.displayName || "User"}</span>
//         </div>
//       ))}
//     </div>
//   );
// }


import React from "react";

export default function UserList({ users, selectedUserId, onSelect, isMobile }) {
  return (
    <div
      className={`${
        isMobile ? "w-full" : "w-64"
      } bg-white border-r border-gray-200 h-full overflow-y-auto flex flex-col rounded-xl shadow-md`}
      style={{ minWidth: isMobile ? undefined : 260, maxWidth: 320 }}
    >
      <div className="sticky top-0 z-10 bg-white px-6 py-4 border-b border-gray-100 rounded-t-xl">
        <span className="text-xl font-bold tracking-tight text-gray-800">Chats</span>
      </div>
      {users.length === 0 && (
        <div className="text-gray-400 text-center mt-8">No followed users</div>
      )}
      <div className="flex-1 flex flex-col gap-1 py-2">
        {users.map((u) => (
          <div
            key={u.uid}
            onClick={() => onSelect(u)}
            className={`cursor-pointer flex items-center gap-3 px-5 py-3 mx-2 rounded-lg transition
              ${selectedUserId === u.uid ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-100"}
            `}
            style={{ borderWidth: selectedUserId === u.uid ? 2 : 1 }}
          >
            <img
              src={u.profilePic || "/defaultpic.jpg"}
              className="w-10 h-10 rounded-full object-cover border border-gray-200"
              alt=""
            />
            <span className="font-medium text-gray-800 truncate">
              {u.name || u.username || u.displayName || "User"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}