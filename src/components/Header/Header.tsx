"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { auth } from "./../../firebaseClient";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const [ user, setUser ] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        const uid = user.uid;
        setUser(uid);
      } else {
        // User is signed out
        console.log("user is logged out");
      }
    });
  }, []);

  const handleLogout = async () => {
    setUser(null);
    await signOut(auth);
    router.push("/");
  };

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <svg
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <Link href="/" className="flex items-center lg:order-1 md:order-2">
            <Image
              src="/logo-header.svg"
              alt="BadGateway Logo"
              className="dark:invert"
              width={75}
              height={75}
              priority
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              BadGateway
            </span>
          </Link>

          <div className="flex items-center lg:order-2 md:order-3">
            { user === null ?
            <Link
              href="/login"
              className="text-white hover:text-blue-200 border border-blue-500 bg-blue-500 p-2 rounded"
            >
              Log in
            </Link>
            :
            <button
              className="text-white hover:text-blue-200 border border-blue-500 bg-blue-500 p-2 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
            }
          </div>
          {user !== null && (
            <div
              className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <nav className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <Link
                  href="/"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Home
                </Link>

                <Link
                  href="/profile"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Profile
                </Link>
                <Link
                  href="/file"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Files
                </Link>
                <Link
                  href="/transfer"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Transfer
                </Link>
              </nav>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
