"use client";
import { auth } from "./../../firebaseClient";
import React, { useState, useEffect } from "react";
import { apiGateway } from "./../../utils/urls";
import { useRouter } from "next/navigation";
import { deleteUser } from "firebase/auth";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Operator = {
  _id: number;
  operatorName: string;
  transferAPIURL: string;
};

const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState(auth.currentUser);
  const email = user ? user.email : "";
  const [selectedOperator, setSelectedOperator] = useState<Operator>(
    null as any
  );

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [operators, setOperators] = useState<Array<Operator>>([]);

  useEffect(() => {
    if (!localStorage.getItem("currentUser")) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    const handleCallOperators = async () => {
      const response = await fetch(`${apiGateway}/v1/operators`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      if (response.status === 400) {
        setError("Bad Request");
        toast.error("Login successful");
      } else if (response.status === 500) {
        setError("Internal Server Error");
      }

      const data = await response.json();
      setOperators(data);
    };
    handleCallOperators();
  }, []);

  function handleSelect(event: any) {
    const operator = operators.find(
      (operator) => operator._id === event.target.value
    );
    setSelectedOperator(operator as any);
  }

  async function handleTransfer() {
    if (selectedOperator) {
      try {
        const response = await fetch(
          `${apiGateway}/v1/users/transfer?email=${email}&operatorId=${selectedOperator._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
          toast.error("Network response was not ok");
        }

        if (response.status === 400) {
          setError("Bad Request");
          toast.error("Bad Request");
        } else if (response.status === 500) {
          setError("Internal Server Error");
          toast.error("Internal Server Error");
        } else if (response.status === 200) {
          setMessage("Transfer successful");
          toast.success("Transfer successful");
          if (user) {
            deleteUser(user)
              .then(() => {
                toast.success("We hope to see you soon");
                setMessage("We hope to see you soon");
              })
              .catch((error) => {
                toast.error("Error deleting user");
                setError("Error deleting user");
              });
          }
        } else if (response.status === 202) {
          setMessage(
            "The request is being processed, the response will be sent to mail"
          );
          toast.error(
            "The request is being processed, the response will be sent to mail"
          );
        } else if (response.status === 404) {
          setError("Not found");
          toast.error("Not found");
        } else if (response.status === 409) {
          setError("The user is not registered with us.");
          toast.error("The user is not registered with us.");
        } else {
          setError("Error transferring data");
          toast.error("Error transferring data");
        }

        const data = await response.json();
        setMessage("Transfer successful");
      } catch (error) {
        toast.error("Error transferring data");
        setError("Error transferring data");
      }
    } else {
      toast.error("No operator selected");
      setError("No operator selected");
    }
  }

  return (
    <>
      <ToastContainer />
      <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Select operator you want to change
            </h2>
          </div>

          <select
            onChange={handleSelect}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
            }}
          >
            <option>Select an operator</option>
            {operators.map((operator) => (
              <option key={operator._id} value={operator._id}>
                {operator.operatorName}
              </option>
            ))}
          </select>
          {selectedOperator && selectedOperator?.operatorName ? (
            <p>
              The operator selected is:
              <span className="text-green-500">
                {selectedOperator?.operatorName}
              </span>
            </p>
          ) : null}

          <button
            type="button"
            onClick={handleTransfer}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Transfer data
          </button>
          <div>
            <p className="text-red-500">{error}</p>

            <p className="text-green-500">{message}</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
