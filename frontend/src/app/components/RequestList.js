import { useEffect, useState } from "react";
import { getRequests } from "../utils/api";

export default function RequestList() {
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    loadRequests(currentPage);
  }, [currentPage]);

  const loadRequests = async (page) => {
    try {
      const data = await getRequests(page);
      setRequests(data.results);
      setTotalPages(Math.ceil(data.count / pageSize));
    } catch (error) {
      console.error("Failed to load requests", error);
    }
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-md text-black">
      <h2 className="text-xl font-bold mb-2">Request List</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">No</th>
            <th className="border p-2">Client</th>
            <th className="border p-2">Task</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req, index) => (
            <tr key={req.id} className="border">
              <td className="border p-2 text-center">
                {(currentPage - 1) * pageSize + index + 1}
              </td>
              <td className="border p-2">{req.client.name}</td>
              <td className="border p-2">{req.task}</td>
              <td className="border p-2">{req.description}</td>
              <td
                className={`border p-2 capitalize text-center ${
                  req.status === "pending"
                    ? "text-red-600"
                    : req.status === "resolved"
                    ? "text-green-600"
                    : "text-yellow-600"
                } `}
              >
                {req.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center space-x-2 mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="p-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
