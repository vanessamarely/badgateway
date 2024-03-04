"use client";

import React, { useState } from "react";

const operators = [
  { id: 1, name: "Operator 1" },
  { id: 2, name: "Operator 2" },
  // add more operators as needed
];

const Page = () => {
  const [selectedOperator, setSelectedOperator] = useState<{
    id: number;
    name: string;
  }>({
    id: 0,
    name: "",
  });

  const handleSelect = (event: any) => {
    const operatorId = event.target.value;
    const operator = operators.find((op) => op.id === Number(operatorId));
    setSelectedOperator(operator as any);
  };

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
      </div>
    </main>
  );
};

export default Page;
