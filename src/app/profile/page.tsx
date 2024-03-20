"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { auth } from "./../../firebaseClient";
import { useRouter } from "next/navigation";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UserProfile {
  email: any;
  fullName: string;
}

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const user = auth.currentUser;
  console.log(user);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    fullName: "",
    email: user ? user.email : "",
  });

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      router.push("/login");
    }
  }, []);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  const handleChangePassword = () => {
    router.push("/change-password");
  };

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
        <div>
          <button
            type="button"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            onClick={handleChangePassword}
          >
            Change Password
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
