"use client";

import React, { useState } from "react";
import Image from "next/image";
import { auth } from "./../../firebaseClient";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UserProfile {
  email: any;
  fullName: string;
}

const ProfilePage: React.FC = () => {
  const user = auth.currentUser;
  console.log(user);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    fullName: "",
    email: user ? user.email : "",
  });


  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Profile
          </h2>
        </div>
        <div className="flex justify-center items-center">
          <Image
            className="rounded-full border-sky-400 border-solid border-2 relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert m-5"
            src="/avatar.svg"
            alt="Avatar"
            width={300}
            height={37}
          />
        </div>

        <p>Email: {userProfile.email}</p>
      </div>
    </main>
  );
};

export default ProfilePage;
