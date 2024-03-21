"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { apiGateway } from "./../../utils/urls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const [message, setMessage] = useState<string>("");

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
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (form.password === form.confirmPassword) {
      if (
        form.idType === "" ||
        form.idNumber === "" ||
        form.address === "" ||
        form.fullName === ""
      ) {
        setError("Please fill all the fields");
        setMessage("");
        return;
      }

      try {
       
        const response = await fetch(`${apiGateway}/v1/users`, {
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
          setMessage("User created successfully");
          toast.success("User created successfully");
          setTimeout(() => {
            router.push("/login");
          }, 5000);
        }
        if (response.status === 202) {
          setError(
            "The request is being processed, the response will be sent to mail"
          );
          toast.error(
            "The request is being processed, the response will be sent to mail"
          );
        } else if (response.status === 400) {
          setError("Bad request! ,Failed to sign up");
          toast.error(error);
        } else if (response.status === 409) {
          setError("The user is already registered with another operator.");
          toast.error(error);
        } else if (response.status === 500) {
          setError("Internal server error.");
          toast.error(error);
        } else {
          setError("Failed to sign up");
          toast.error(error);
        }
      } catch {
        setError("Sorry, something went wrong. Please try again.");
        toast.error(error);
      }
    } else {
      setError("Passwords don't match. Please try again.");
      toast.error(error);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
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
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                value={form.fullName}
                onChange={(e) => handleInputChange(e)}
                name="fullName"
                required
              />
            </label>
          </div>
          <div className="mt-4">
            <label>
              Email:
              <input
                type="email"
                className="appearance-none roundedrelative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                value={form.email}
                onChange={(e) => handleInputChange(e)}
                name="email"
                required
              />
            </label>
          </div>
          <div className="mt-4">
            <label>
              Password:
              <input
                type="password"
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                value={form.password}
                onChange={handleInputChange}
                name="password"
                required
              />
            </label>
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
            <label>
              Identification Type:
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 rounded-t-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="idType"
                onChange={(e) => handleInputChange(e)}
                required
              >
                <option value="">Select an option</option>
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
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                value={form.idNumber}
                onChange={(e) => handleInputChange(e)}
                name="idNumber"
                required
              />
            </label>
          </div>

          <div className="mt-4">
            <label>
              Address:
              <input
                type="text"
                className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                value={form.address}
                onChange={(e) => handleInputChange(e)}
                name="address"
                required
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
          <p className="text-center text-green-500">{message}</p>
        </div>
      </div>
    </main>
  );
}
