"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { db } from "@/app/Config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { updateUser } from "@/app/Store/Slices/authSlice";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Validation Schema
const profileSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  bio: Yup.string().max(150, "Bio should be less than 150 characters"),
  gender: Yup.string().required("Gender is required"),
});

const Page = ({ onClose }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [profilePic, setProfilePic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isClient, setIsClient] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(profileSchema),
  });

  useEffect(() => {
    setIsClient(true);
    if (user) {
      reset({
        name: user.name || "",
        bio: user.bio || "",
        gender: user.gender || "",
      });
      setProfilePic(user.profilePic || "");
    }
  }, [user, reset]);

  const handleClose = () => {
    // If onClose prop is provided, use it, otherwise use router
    if (typeof onClose === 'function') {
      onClose();
    } else {
      router.push('/Pages/Profile');
    }
  };

  const uploadProfilePic = async (e) => {
    try {
      setLoading(true);
      const file = e.target.files[0];
      if (!file) return;

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "social media app");
      data.append("cloud_name", "dd22qjrpn");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dd22qjrpn/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const uploadedImage = await res.json();
      if (uploadedImage.secure_url) {
        setProfilePic(uploadedImage.secure_url);
      }
    } catch (error) {
      console.error("Profile pic upload failed", error);
      setError("Failed to upload profile picture");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const updatedData = {
        ...data,
        profilePic: profilePic || user.profilePic,
      };

      // Update Firestore
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, updatedData);

      // Update Redux store
      const updatedUser = {
        ...user,
        ...updatedData,
      };
      dispatch(updateUser(updatedUser));

      setSuccess("Profile updated successfully!");
      setTimeout(() => {
        handleClose(); // Use the unified close handler
      }, 1500);
    } catch (error) {
      console.error("Profile update failed:", error);
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
            <button
              onClick={handleClose} // Changed to use handleClose
              className="text-gray-500 hover:text-gray-700"
              disabled={loading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Rest of your form remains exactly the same */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src={profilePic || "/default-avatar.png"}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                />
                <label
                  htmlFor="profile-upload"
                  className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-100"
                  title="Change profile picture"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </label>
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={uploadProfilePic}
                  className="hidden"
                />
              </div>
              {loading && !profilePic && (
                <p className="text-sm text-indigo-600 mt-2">Uploading...</p>
              )}
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                {...register("name")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                {...register("bio")}
                rows="3"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Tell us about yourself..."
              />
              {errors.bio && (
                <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="male"
                    {...register("gender")}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  Male
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="female"
                    {...register("gender")}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  Female
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="other"
                    {...register("gender")}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  Other
                </label>
              </div>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>

            {/* Error and Success Messages */}
            {error && (
              <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="p-3 bg-green-100 text-green-700 rounded-lg text-sm">
                {success}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose} // Changed to use handleClose
                disabled={loading}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 ${
                  loading
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;