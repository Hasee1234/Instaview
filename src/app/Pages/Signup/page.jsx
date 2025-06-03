"use client";
import { signUp } from "@/app/Store/Slices/authSlice";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Validation Schema
const signupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password should be at least 6 characters")
    .required("Password is required"),
  phone: Yup.string().matches(/^\d{10,}$/, "Phone number must be valid"),
  address: Yup.string().required("Address is required"),
  gender: Yup.string().required("Gender is required"),
});

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [profilePic, setProfilePic] = useState("");
  const [loading, setLoading] = useState(false);

  // Correct selector based on your store key
  const user = useSelector((state) => state.authSlice.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const uploadProfilePic = async (e) => {
    try {
      setLoading(true);
      const file = e.target.files[0];
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
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data) => {
    const userData = { ...data, profilePic };
    dispatch(signUp(userData));
  };

  // Redirect if user exists (logged in)
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-pink-400 flex justify-center items-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            {...register("name")}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <input
            type="text"
            placeholder="Phone Number"
            {...register("phone")}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}

          <input
            type="text"
            placeholder="Address"
            {...register("address")}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}

          <div>
            <label className="block mb-1 text-sm text-gray-700">
              Upload Profile Picture
            </label>
            <input
              type="file"
              onChange={uploadProfilePic}
              className="w-full px-2 py-2 border rounded-lg"
            />
            {loading && (
              <p className="text-sm text-indigo-600 mt-2">Uploading...</p>
            )}
            {profilePic && (
              <img
                src={profilePic}
                alt="Profile"
                className="w-24 h-24 rounded-full mt-4 object-cover border-2 border-indigo-400"
              />
            )}
          </div>

          <div className="flex gap-4 items-center mt-2">
            <label className="text-gray-600">Gender:</label>
            <label className="flex items-center gap-2">
              <input type="radio" value="male" {...register("gender")} />
              Male
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" value="female" {...register("gender")} />
              Female
            </label>
          </div>
          {errors.gender && (
            <p className="text-red-500 text-sm">{errors.gender.message}</p>
          )}

          <button
            type="submit"
            disabled={loading || !profilePic}
            className={`w-full py-3 rounded-lg font-semibold text-white transition ${
              loading || !profilePic
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            Sign Up
          </button>

          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link
              href="/Pages/Login"
              className="text-indigo-600 hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Page;
