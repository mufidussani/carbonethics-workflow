"use client";

import RequestForm from "./components/RequestForm";
import RequestList from "./components/RequestList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
      <h1 className="text-3xl font-bold mb-5 text-black">
        Request Workflow Application
      </h1>
      <div className="w-full max-w-3xl space-y-4">
        <RequestForm onRequestAdded={() => window.location.reload()} />
        <RequestList />
      </div>
    </div>
  );
}
