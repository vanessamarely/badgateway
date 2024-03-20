"use client";

import { auth } from "./../../firebaseClient";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    console.log(form);
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      router.push("/profile");
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login
          </h2>
        </div>
        <form onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm">
            <div className="mt-4">
              <label htmlFor="email">email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                placeholder="email"
                autoComplete="email"
                value={form.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                autoComplete="current-password"
                value={form.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              >
                Sign in
              </button>
            </div>
          </div>
        </form>
        <div>
          <p className="text-red-500">{error}</p>
        </div>

        <div className="flex flex-col items-center">
          <p className="p-2">Don&apos;t have an account?</p>
          <div className="text-sm w-full">
            <Link
              href="/register"
              className="group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-sky-500 border-sky-500 hover:bg-sky-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 border-2"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
