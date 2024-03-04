import Image from "next/image";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative flex flex-col place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/logo.svg"
          alt="logo.js Logo"
          width={300}
          height={37}
          priority
        />
        <div className="text-zinc-700">
          <p className="text-justify p-2 ">
            <strong>Welcome to BadGateway</strong>, your digital solution for
            seamless document management and sharing.
          </p>
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
