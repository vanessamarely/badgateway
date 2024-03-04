"use client";

import React, { useState, useEffect } from "react";

export default function FileUpload() {
  const [selectedFile, setSelectedFile] = useState( null as any);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState( [] as any);
  const [file, setFile] = useState({
    name: "",
    type: "",
    id: 0,
  });

  const handleFileChange = (event: any) => {
    let file = event.target.files[0];

    // Check the file size (200KB = 200 * 1024 bytes)
    if (file.size > 200 * 1024) {
      setErrorMessage("File size should be less than 200KB");
      return;
    }

    // Check the file type
    if (!["image/jpeg", "image/png", "application/pdf"].includes(file.type)) {
      setErrorMessage("Invalid file type. Only JPEG, PNG and PDF are allowed.");
      return;
    }

    // If the file passes all checks, clear the error message and set the selected file
    setErrorMessage("");
    setSelectedFile(file);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      return;
    }
    console.log(selectedFile);
    // Here you can handle the file upload. For example, you could send the file to an API or upload it to a cloud storage service.
  };

  const handleMultipleFilesUpload = async () => {
    if (!selectedFiles) {
      return;
    }
    console.log(selectedFiles);
    // Here you can handle the file upload. For example, you could send the file to an API or upload it to a cloud storage service.
  };

  const handleMultipleFilesChange = (event: any) => {
    let files = event.target.files;
    let filesArray = Array.from(files);
    setSelectedFiles(filesArray as any);
  };

  const handleRemoveFile = (index: number) => {
    let files = selectedFiles;
    if (!files) {
      return;
    }

    files.splice(index, 1);
    setSelectedFiles(files);
  };

  const handleEditFile = (index: number) => {
    if (!selectedFiles) {
      return;
    }
    let file = selectedFiles[index];
    console.log(file);
    // Here you can handle the file edit. For example, you could open a modal to edit the file name or type.
  };

  useEffect(() => {
    const fileObject = {
      name: "file1",
      type: "image/jpeg",
      id: 1,
    };
    setFile(fileObject);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            My files
          </h2>
        </div>
        <div>
          <input
            type="file"
            onChange={handleFileChange}
            className="py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          />

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          {selectedFile && (
            <div className="flex flex-col">
              <button
                onClick={() => setSelectedFile(undefined)}
                className="self-end px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
              {selectedFile?.type.includes("image") ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="preview"
                  className="mt-4"
                />
              ) : (
                <p className="mt-4">{selectedFile?.name}</p>
              )}
            </div>
          )}
          <button
            onClick={handleFileUpload}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Upload
          </button>
        </div>
        <div>
          <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
            Multiple Files Upload
          </h2>
          <input
            type="file"
            onChange={handleMultipleFilesChange}
            multiple
            className="py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          />
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {selectedFiles &&
            selectedFiles.map((file: any, index: number) => (
              <div key={index} className="flex flex-col">
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="self-end px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
                {file?.type.includes("image") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="mt-4"
                  />
                ) : (
                  <p className="mt-4">{file?.name}</p>
                )}
              </div>
            ))}
          <button
            onClick={handleMultipleFilesUpload}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Upload All
          </button>
        </div>
        <div>
          <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
            Uploaded Files
          </h2>
          <table className="table-auto w-full mt-4">
            <thead>
              <tr>
                <th className="px-4 py-2">File Name</th>
                <th className="px-4 py-2">File Type</th>
              </tr>
            </thead>
            <tbody>
              {/* Here you would map over the files uploaded to your database and create a row for each one */}
              {/* This is just a placeholder for the purpose of this example */}
              <tr>
                <td className="border px-4 py-2"> {file.name}</td>
                <td className="border px-4 py-2">{file.type}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEditFile(file.id)}
                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
