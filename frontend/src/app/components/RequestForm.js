"use client";

import { useState, useEffect } from "react";
import { createClient, createRequest, getClients } from "../utils/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RequestForm({ onRequestAdded }) {
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientCompany, setClientCompany] = useState("");
  const [task, setTasks] = useState("");
  const [description, setDescription] = useState("");
  const [emailTeam, setEmailTeam] = useState("");
  const [isAddingClient, setIsAddingClient] = useState(false);
  console.log(clients);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const data = await getClients();
      setClients(data.results);
    } catch (error) {
      toast.error("Failed to load clients");
    }
  };

  const handleAddClient = async () => {
    try {
      const newClient = await createClient({
        name: clientName,
        email: clientEmail,
        company: clientCompany,
      });
      setClients([...clients, newClient]);
      setClientId(newClient.id);
      setIsAddingClient(false);
      toast.success("Client added successfully!");
    } catch (error) {
      toast.error("Failed to add client. Please check your input.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRequest({
        client_id: clientId,
        task,
        description,
        status: "pending",
        email_team: emailTeam,
      });
      onRequestAdded();
      setClientId("");
      setTasks("");
      setDescription("");
      setEmailTeam("");
      toast.success("Request added successfully!");
    } catch (error) {
      toast.error("Failed to add request. Please try again.");
    }
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-md text-black">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-xl font-bold mb-2">Create New Request</h2>

      {!isAddingClient ? (
        <div>
          <label className="block mb-2">Select Client</label>
          <select
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="w-full p-2 border rounded mb-3"
          >
            <option value="">-- Select Client --</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name} ({client.company})
              </option>
            ))}
          </select>
          <button
            onClick={() => setIsAddingClient(true)}
            className="text-white mb-4 bg-blue-500 p-2 rounded"
          >
            Add Client
          </button>
        </div>
      ) : (
        <div className="mb-3">
          <label className="block mb-2">Client Name</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <label className="block mb-2">Client Email</label>
          <input
            type="email"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <label className="block mb-2">Client Company</label>
          <input
            type="text"
            value={clientCompany}
            onChange={(e) => setClientCompany(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button
            onClick={handleAddClient}
            className="bg-green-500 text-white px-4 py-2 rounded mt-2"
          >
            Save Client
          </button>
          <button
            onClick={(e) => setIsAddingClient(false)}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2 ml-4"
          >
            Back
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <label>Client Request</label>
        <textarea
          placeholder="Input Client Request..."
          value={task}
          onChange={(e) => setTasks(e.target.value)}
          className="w-full p-2 border rounded"
          required
        ></textarea>
        <label>Request Description</label>
        <textarea
          placeholder="Input Request Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        ></textarea>
        <label>Email of PIC</label>
        <input
          placeholder="example@gmail.com"
          value={emailTeam}
          onChange={(e) => setEmailTeam(e.target.value)}
          className="w-full p-2 border rounded"
          type="email"
          required
        ></input>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded transition"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}
