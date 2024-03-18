import Image from "next/image";

import Link from "next/link";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 lg:p-24">
      <div className="flex flex-col place-items-center ">
        <h1 className="text-center p-2 lg:text-6xl text-4xl">
          <strong>Welcome to BadGateway</strong>
        </h1>
        <p className="p-6">
          Your digital solution for seamless document management and sharing
        </p>
        <Image
          src="/logo.svg"
          alt="logo.js Logo"
          width={300}
          height={37}
          priority
        />
        <div className="text-zinc-700 w-full lg:w-2/3">
          <p className="text-justify p-2">
            This is a revolutionary platform designed to empower citizens by
            providing them with a secure, convenient, and centralized repository
            for storing and accessing important documents.
          </p>
          <p className="text-justify p-2">
            Our platform bridges the gap between citizens and government
            entities, facilitating effortless document exchange and streamlining
            administrative processes.
          </p>
          <p className="text-justify p-2">
            Whether you are accessing diplomas, certificates, or visa
            applications, this solution ensures that your documents are securely
            stored, easily accessible, and always at your fingertips.
          </p>
          <p className="text-justify p-2">
            Join us in embracing the future of document management of your
            citizen Folder.
          </p>
        </div>
      </div>
    </main>
  );
}
