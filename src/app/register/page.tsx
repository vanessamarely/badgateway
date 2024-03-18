"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  idType: string;
  idNumber: string;
  address: string;
}

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState("");

  const [idUser, setIdUser] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [form, setForm] = useState<User>({
    password: "",
    confirmPassword: "",
    email: "",
    fullName: "",
    idType: "",
    idNumber: "",
    address: "",
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    console.log(": ", event.target.name);
    console.log(": ", event.target.value);
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
        const response = await fetch("http://localhost:3000/v1/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
            name: form.fullName,
            documentType: form.idType,
            documentNumber: form.idNumber,
            address: form.address,
          }),
        });

        if (response.status === 201) {
          router.push("/");
        }
        if (response.status === 202) {
          setError(
            "The request is being processed, the response will be sent to mail"
          );
        } else if (response.status === 400) {
          setError("Bad request! ,Failed to sign up");
        } else if (response.status === 409) {
          setError("The user is already registered with another operator.");
        } else if (response.status === 500) {
          setError("Internal server error.");
        } else {
          setError("Failed to sign up");
        }
      } catch (error) {
        setError("Sorry, something went wrong. Please try again.");
      }
    } else {
      setError("Passwords don't match. Please try again.");
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
          <div className="mt-4">
            <label>
              Full Name:
              <input
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={form.fullName}
                onChange={(e) => handleInputChange(e)}
                name="fullName"
              />
            </label>
          </div>
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
          <div className="mt-4">
            <label>
              Type of Identification:
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-none  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 rounded-t-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="idType"
                onChange={(e) => handleInputChange(e)}
              >
                <option value="CC">Cedula</option>
                <option value="CE">Cedula Extranjeria</option>
                <option value="TI">Tarjeta Identidad</option>
                <option value="PP">Pasaporte</option>
              </select>
            </label>
          </div>
          <div className="mt-4">
            <label>
              Number of Identification:
              <input
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={form.idNumber}
                onChange={(e) => handleInputChange(e)}
                name="idNumber"
              />
            </label>
          </div>

          <div className="mt-4">
            <label>
              Address:
              <input
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={form.address}
                onChange={(e) => handleInputChange(e)}
                name="address"
              />
            </label>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Register
            </button>
          </div>
        </form>
        <div>
          <p className="text-center text-red-500">{error}</p>
        </div>
      </div>
    </main>
  );
}
