"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header>
      <div className="flex h-20 w-full justify-center items-center  bg-gradient-to-t from-white via-white dark:from-black dark:via-black">
        <h1 role="title">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-2"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/logo-header.svg"
              alt="BadGateway Logo"
              className="dark:invert"
              width={75}
              height={75}
              priority
            />
          </a>
        </h1>
        <div className="flex-1 justify-center items-center m-2">
          <nav className="flex items-center justify-center gap-4">
            <Link
              href="/"
              className="text-blue-500 hover:text-blue-800 text-lg underline"
            >
              Home
            </Link>
            <Link
              href="/profile"
              className="text-blue-500 hover:text-blue-800 text-lg underline"
            >
              Profile
            </Link>
            <Link
              href="/file"
              className="text-blue-500 hover:text-blue-800 text-lg underline"
            >
              Files
            </Link>
            <Link
              href="/transfer"
              className="text-blue-500 hover:text-blue-800 text-lg underline"
            >
              Transfer
            </Link>
          </nav>
        </div>
        <div className="flex justify-center items-end m-2">
          <nav className="flex justify-center items-center gap-2">
            <Link
              href="/login"
              className="text-blue-100 hover:text-blue-200 border border-blue-500 bg-blue-500 p-2 rounded"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="text-blue-100 hover:text-blue-200 border border-blue-500 bg-blue-500 p-2 rounded"
            >
              Register
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
