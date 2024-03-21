"use client";
import { auth } from "./../../firebaseClient";
import React, { useState, useEffect } from "react";
import { apiGateway } from "./../../utils/urls";
import { useRouter } from "next/navigation";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import axios from "axios";
import FormData from "form-data";

export default function FileUpload() {
  const router = useRouter();
  const [user, setUser] = useState(auth.currentUser);
  const email = user ? user.email : "";
  const [selectedFile, setSelectedFile] = useState(null as any);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([] as any);
  const [error, setError] = useState("");
  const [files, setFiles] = useState([] as any);
  const [errorFiles, setErrorFiles] = useState("" as any);
  const [selectedDocumentType, setSelectedDocumentType] = useState("");
  const [images, setImages] = useState([] as any);

  const fetchFilesFromApi = async () => {
    try {
      const response = await fetch(`${apiGateway}/v1/files?email=${email}`);
      if (!response.ok) {
        toast.error(error);
        throw new Error("Error fetching files");
      }
      console.log(response);
      if (response.status === 400) {
        console.log("Bad Request");
        setErrorFiles("Bad Request");
        toast.error(error);
      } else if (response.status === 500) {
        console.log("Internal Server Error");
        setErrorFiles("Internal Server Error");
        toast.error(error);
      }

      const data = await response.json();
      console.log("Files:", data);
      setFiles(data);

      let urlImages = [];
      for (let file of data) {
        const url = await getURL(file.fileID);
        urlImages[file.fileID] = url;
      }
      setImages(urlImages);
    } catch (error) {
      setErrorFiles("Error fetching files");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("currentUser")) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    fetchFilesFromApi();
  }, []);

  const postFileToApi = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    console.log(selectedDocumentType);
    console.log(formData);

    try {
      const response = await axios.post(
        `${apiGateway}/v1/files?type=${selectedDocumentType}&email=${email}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);

      if (response.status === 201) {
        fetchFilesFromApi();
        console.log("File uploaded successfully!");
        toast.success("File uploaded successfully!");
      } else if (response.status === 202) {
        console.log(
          "The request is being processed, the response will be sent to mail"
        );
        toast.success(
          "The request is being processed, the response will be sent to mail"
        );
        setError(
          "The request is being processed, the response will be sent to mail"
        );
        toast.error(error);
      } else if (response.status === 400) {
        console.log("Bad Request");
        toast.error(error);
      } else if (response.status === 500) {
        console.log("Internal Server Error");
        toast.error(error);
      } else {
        console.log("Bad Gateway");
        toast.error(error);
      }

      const data = await response;
      console.log(data);
      return data;
    } catch {
      console.error("There was a problem with the fetch operation");
      setError("There was a problem with the fetch operation");
      toast.error(error);
    }
  };

  function handleFileChange(event: any) {
    let file = event.target.files[0];

    // Check the file size (200KB = 200 * 1024 bytes)
    if (file.size > 200 * 1024) {
      setErrorMessage("File size should be less than 200KB");
      return;
    }

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

  const handleSelectedDocumentType = (event: any) => {
    console.log(event.target.value);
    setSelectedDocumentType(event.target.value);
  };

  // const getSignedUrl = async (file: File) => {
  //   const storage = new Storage();

  //   const [url] = await storage
  //     .bucket("bucket-service-file")
  //     .file(file.name)
  //     .getSignedUrl({
  //       action: "write",
  //       expires: Date.now() + 1000 * 60 * 60 * 24 * 365,
  //       contentType: "application/octet-stream",
  //     });

  //   return url;

  // }

  const getURL = async (fileID: string) => {
    const response = await fetch(`${apiGateway}/v1/files/${fileID}`);
    const data = await response.json();
    console.log(data);
    return data;
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
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
                files.map((file: any) => (
                  <tr key={file?._id}>
                    <td className="border px-4 py-2">{file?.originalName}</td>
                    <td className="border px-4 py-2">{file?.type}</td>
                    <td className="border px-4 py-2">
                      <button
                        className="text-sky-500 hover:underline"
                        type="button"
                        onClick={async () => {
                          const url = await getURL(file._id);
                          window.open(url.url, "_blank");
                        }}
                      >
                        Download
                      </button>
                    </td>
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
