"use client";
import { auth } from "./../../firebaseClient";
import React, { useState, useEffect } from "react";

const Page = () => {
  const user = auth.currentUser;
  const email = user ? user.email : "";
  const [selectedOperator, setSelectedOperator] = useState(null as any);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [operators, setOperators] = useState<
    Array<{ id: number; name: string }>
  >([]);

  useEffect(() => {
    const handleCallOperators = async () => {
      const response = await fetch("http://localhost:3008/v1/operators", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      if (response.status === 400) {
        console.log("Bad Request");
        setError("Bad Request");
      } else if (response.status === 500) {
        console.log("Internal Server Error");
        setError("Internal Server Error");
      }

      const data = await response.json();
      setOperators(data);
    };
    handleCallOperators();
  }, []);

  function handleSelect(event: any) {
    const operator = operators.find(
      (operator) => operator.id === parseInt(event.target.value)
    );
    setSelectedOperator(operator as any);
  }

  async function handleTransfer() {
    if (selectedOperator) {
      try {
        const response = await fetch(
          `http://localhost:3008/v1/transfer?email=${email}&operatorId=${selectedOperator.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ operatorId: selectedOperator.id }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        if (response.status === 400) {
          console.log("Bad Request");
          setError("Bad Request");
        } else if (response.status === 500) {
          console.log("Internal Server Error");
          setError("Internal Server Error");
        } else if (response.status === 200) {
          console.log("Transfer successful:");
          setMessage("Transfer successful");
        } else if (response.status === 202) {
          console.log(
            "The request is being processed, the response will be sent to mail"
          );
          setMessage(
            "The request is being processed, the response will be sent to mail"
          );
        } else if (response.status === 404) {
          console.log("Not found");
          setError("Not found");
        } else if (response.status === 409) {
          console.log("Unauthorized");
          setError("The user is not registered with us.");
        } else {
          console.log("Error transferring data");
          setError("Error transferring data");
        }

        const data = await response.json();
        console.log("Transfer successful:", data);
        setMessage("Transfer successful");
      } catch (error) {
        console.error("Error:", error);
        setError("Error transferring data");
      }
    } else {
      console.log("No operator selected");
    }
  }

  return (
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
            <option key={operator.id} value={operator.id}>
              {operator.name}
            </option>
          ))}
        </select>
        {selectedOperator && <p>You selected: {selectedOperator.name}</p>}
        {selectedOperator && (
          <p>The operator {selectedOperator?.name} is selected.</p>
        )}
        <button
          type="button"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
        >
          Transfer data
        </button>
      </div>
      <div>
        <p className="text-red-500">{error}</p>
      </div>
      <div>
        <p className="text-green-500">{message}</p>
      </div>
    </main>
  );
};

export default Page;
