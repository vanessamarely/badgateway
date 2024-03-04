"use client";

import React, { useState } from "react";
import Image from "next/image";

interface UserProfile {
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
  idType: string;
  idNumber: string;
}

const ProfilePage: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    fullName: "",
    password: "",
    confirmPassword: "",
    idType: "",
    idNumber: "",
    email: "",
  });

  React.useEffect(() => {
    // Fetch user profile from your API or service
    // This is just a placeholder, replace with your actual API call
    /*
        fetch('/api/user/profile')
            .then(response => response.json())
            .then(data => setUserProfile(data))
            .catch(error => console.error('Error:', error));
            */
  }, []);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
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

        <p>Full Name: {userProfile.fullName}</p>
        <p>Email: {userProfile.email}</p>
        <p>ID Type: {userProfile.idType}</p>
        <p>ID Number: {userProfile.idNumber}</p>
      </div>
    </main>
  );
};

export default ProfilePage;
