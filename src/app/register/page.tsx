"use client";

import { auth } from "./../../firebaseClient";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ChangeEvent, FormEvent, useState } from "react";

interface UserProfile {
  email: string;
  // fullName: string;
  password: string;
  confirmPassword: string;
  // idType: string;
  // idNumber: string;
}

export default function Register() {
  const [form, setForm] = useState<UserProfile>({
    // fullName: "",
    password: "",
    confirmPassword: "",
    // idType: "",
    // idNumber: "",
    email: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(form);
    if (form.password === form.confirmPassword) {
      try {
        await createUserWithEmailAndPassword(auth, form.email, form.password);
      } catch {
        console.log("Sorry, something went wrong. Please try again.");
      }
    } else {
      console.log("Passwords don't match. Please try again.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* <div className="mt-4">
            <label>
              Full Name:
              <input
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={form.fullName}
                onChange={handleInputChange}
              />
            </label>
          </div> */}
          <div className="mt-4">
            <label>
              Email:
              <input
                type="email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={form.email}
                onChange={(e) => handleInputChange(e)}
                name="email"
              />
            </label>
          </div>
          <div className="mt-4">
            <label>
              Password:
              <input
                type="password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={form.password}
                onChange={handleInputChange}
                name="password"
              />
            </label>
          </div>
          <div className="mt-4">
            <label>
              Confirm Password:
              <input
                type="password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={form.confirmPassword}
                onChange={handleInputChange}
                name="confirmPassword"
              />
            </label>
          </div>
          {/* <div className="mt-4">
            <label>
              Type of Identification:
              <input
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={form.idType}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="mt-4">
            <label>
              Number of Identification:
              <input
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={form.idNumber}
                onChange={handleInputChange}
              />
            </label>
          </div> */}

          <div className="mt-4">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
