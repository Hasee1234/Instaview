'use client';
import { Dialog } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/authSlice'; // Update this path as per your project
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/firebase'; // Update this path as needed
import { useRouter } from 'next/navigation';

const Setting = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <Dialog.Panel className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xs text-center">
        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={handleLogout}
            className="w-full py-2 bg-red-500 text-white rounded-md font-semibold hover:bg-red-600 transition"
          >
            Logout
          </button>
          <button
            onClick={onClose}
            className="w-full py-2 bg-gray-300 text-gray-800 rounded-md font-semibold hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default Setting;
