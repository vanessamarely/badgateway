"use client";
import { auth } from "./../../firebaseClient";
import React, { useState, useEffect } from "react";
import { apiGateway } from "./../../utils/urls";

export default function FileUpload() {
  const user = auth.currentUser;
  const email = user ? user.email : "";
  const [selectedFile, setSelectedFile] = useState(null as any);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([] as any);
  const [error, setError] = useState("");
  const [files, setFiles] = useState([] as any);
  const [errorFiles, setErrorFiles] = useState("" as any);

  const fetchFilesFromApi = async () => {
    try {
      const response = await fetch(`${apiGateway}/v1/files?email=${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
      });
      if (!response.ok) {
        throw new Error("Error fetching files");
      }

      if (response.status === 400) {
        console.log("Bad Request");
        setErrorFiles("Bad Request");
      } else if (response.status === 500) {
        console.log("Internal Server Error");
        setErrorFiles("Internal Server Error");
      }

      const data = await response.json();
      setFiles(data);
    } catch (error) {
      setErrorFiles("Error fetching files");
    }
  };

  useEffect(() => {
    fetchFilesFromApi();
  }, []);
  const postFileToApi = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `${apiGateway}/v1/files?type=${file.type}&email=${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          mode: "no-cors",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (response.status === 201) {
        console.log("File uploaded successfully!");
      } else if (response.status === 202) {
        console.log(
          "The request is being processed, the response will be sent to mail"
        );
        setError(
          "The request is being processed, the response will be sent to mail"
        );
      } else if (response.status === 400) {
        console.log("Bad Request");
      } else if (response.status === 500) {
        console.log("Internal Server Error");
      } else {
        console.log("Bad Gateway");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation: ", error);
    }
  };

  function handleFileChange(event: any) {
    let file = event.target.files[0];

    // Check the file size (200KB = 200 * 1024 bytes)
    if (file.size > 200 * 1024) {
      setErrorMessage("File size should be less than 200KB");
      return;
    }

    // Check the file type
    // if (!["image/jpeg", "image/png", "application/pdf"].includes(file.type)) {
    //   setErrorMessage("Invalid file type. Only JPEG, PNG and PDF are allowed.");
    //   return;
    // }

    // If the file passes all checks, clear the error message and set the selected file
    setErrorMessage("");
    setSelectedFile(file);
  }

  const handleFileUpload = async () => {
    if (!selectedFile) {
      return;
    }
    console.log(selectedFile);

    postFileToApi(selectedFile);
  };

  // const handleMultipleFilesUpload = async () => {
  //   if (!selectedFiles) {
  //     return;
  //   }
  //   console.log(selectedFiles);

  //   postFileToApi(selectedFiles);
  //   // Here you can handle the file upload. For example, you could send the file to an API or upload it to a cloud storage service.
  // };

  // const handleMultipleFilesChange = (event: any) => {
  //   let files = event.target.files;
  //   let filesArray = Array.from(files);
  //   setSelectedFiles(filesArray as any);
  // };

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

  const handleSelectedDocumentType = (event: any) => {
    console.log(event.target.value);
  };

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
            className="py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          />

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          {selectedFile && (
            <div className="flex flex-col">
              <button
                onClick={() => setSelectedFile(undefined)}
                className="mt-3 self-end px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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

          <select
            name="documentType"
            id="documentType"
            autoComplete="documentType"
            onChange={handleSelectedDocumentType}
            className="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 rounded-t-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>Select the document type</option>
            <option value="CC">cedula</option>
            <option value="Pasaporte">Pasaporte</option>
            <option value="registro">registro</option>
            <option value="otro">Otro</option>
          </select>

          <button
            onClick={handleFileUpload}
            className="mt-3 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Upload
          </button>
        </div>
        <div>
          <p className="text-red-500">{error}</p>
        </div>

        {/* <div>
          <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
            Multiple Files Upload
          </h2>
          <input
            type="file"
            onChange={handleMultipleFilesChange}
            multiple
            className="py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
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
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Upload All
          </button>
        </div> */}
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
              {files ? (
                files.length > 0 &&
                files.map((file: any, index: number) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{file.name}</td>
                    <td className="border px-4 py-2">{file.type}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border px-4 py-2">
                    {errorFiles ? (
                      <p className="text-red-500">{errorFiles}</p>
                    ) : (
                      "No files uploaded"
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
