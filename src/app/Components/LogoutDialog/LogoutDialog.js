// 'use client';
// import { Dialog } from '@headlessui/react';
// import { useDispatch } from 'react-redux';
// import { logout } from '@/redux/slices/authSlice'; // Update this path as per your project
// import { signOut } from 'firebase/auth';
// import { auth } from '@/firebase/firebase'; // Update this path as needed
// import { useRouter } from 'next/navigation';

// const Setting = ({ isOpen, onClose }) => {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       dispatch(logout());
//       router.push('/login');
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   return (
//     <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-30">
//       <Dialog.Panel className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xs text-center">
//         <div className="flex justify-center space-x-4 mb-4">
//           <button
//             onClick={handleLogout}
//             className="w-full py-2 bg-red-500 text-white rounded-md font-semibold hover:bg-red-600 transition"
//           >
//             Logout
//           </button>
//           <button
//             onClick={onClose}
//             className="w-full py-2 bg-gray-300 text-gray-800 rounded-md font-semibold hover:bg-gray-400 transition"
//           >
//             Cancel
//           </button>
//         </div>
//       </Dialog.Panel>
//     </Dialog>
//   );
// };

// export default Setting;
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/app/Store/Slices/authSlice";

const LogoutDialog = ({ isOpen, onClose }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logout());
    router.push("/Pages/Signup");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <h3 className="text-lg font-medium mb-4">Are you sure you want to logout?</h3>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutDialog;