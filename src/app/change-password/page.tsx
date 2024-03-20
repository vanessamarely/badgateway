"use client";

import { auth } from "./../../firebaseClient";
import { updatePassword } from "firebase/auth";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangePassword = async (event: FormEvent) => {
    event.preventDefault();
    if (form.password === form.confirmPassword) {
      console.log(form);
      const user = auth.currentUser;

      if (!user) {
        setError("User not found");
        toast.error("User not found");
        return;
      }
console.log(form.password);
      try {
        
        await updatePassword(user, form.password);
        toast.success("Password Updated");
        router.push("/profile");
      } catch (error) {
        setError("An error occurred. Please try again.");
        toast.error("An error occurred. Please try again.");
      }
    } else {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Change Password
          </h2>
        </div>
        <form onSubmit={handleChangePassword}>
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
              <label>
                Confirm Password:
                <input
                  type="password"
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                  value={form.confirmPassword}
                  onChange={handleInputChange}
                  name="confirmPassword"
                  required
                />
              </label>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              >
                Change Password
              </button>
            </div>
          </div>
        </form>
        <div>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
