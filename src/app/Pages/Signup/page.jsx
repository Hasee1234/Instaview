"use client";
import { signUp } from "@/app/Store/Slices/authSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

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

  const handleSignUp = () => {
    const user = {
      email,
      password,
      name,
      phone,
      address,
      profilePic,
      gender,
    };
    console.log("signUp clicked", user);
    dispatch(signUp(user));
  };

  return (
    <div>
      <h1>Signup</h1>

      <label>Enter your email:</label>
      <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <br />

      <label>Enter password:</label>
      <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
      <br />

      <label>Enter your name:</label>
      <input type="text" placeholder="name" onChange={(e) => setName(e.target.value)} />
      <br />

      <label>Enter your phone No.</label>
      <input type="text" placeholder="phone" onChange={(e) => setPhone(e.target.value)} />
      <br />

      <label>Enter your address:</label>
      <input type="text" placeholder="address" onChange={(e) => setAddress(e.target.value)} />
      <br />

      <label>Upload Profile Picture:</label>
      <input type="file" onChange={uploadProfilePic} />
      {loading && <p>Uploading...</p>}
      {profilePic && <img src={profilePic} alt="Profile Preview" width="100" />}
      <br />

      <label>Male</label>
      <input type="radio" name="gender" value="male" onChange={() => setGender("male")} />
      <br />

      <label>Female</label>
      <input type="radio" name="gender" value="female" onChange={() => setGender("female")} />
      <br />

      <button onClick={handleSignUp} disabled={loading || !profilePic}>
        Signup
      </button>
    </div>
  );
};

export default Page;
