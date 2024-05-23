"use client";

import { useState } from "react";
import { BackToDashboardnButton } from "../components/ui/buttons";

export default function Createcurse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [organizer, setOrganizer] = useState("");

  async function sendData(e: React.FormEvent) {
    e.preventDefault();

    const user = {
      title,
      description,
      eventDate,
      organizer,
    };

    try {
      const response = await fetch(`/api/createcurse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      setTitle("");
      setDescription("");
      setEventDate("");
      setOrganizer("");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <form onSubmit={sendData} className="space-y-4">
        <input
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          placeholder="Title"
          required
        />
        <input
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type="text"
          placeholder="Description"
          required
        />

        <p className="text-gray-600 mt-20">course registration ending date:</p>
        <input
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          onChange={(e) => setEventDate(e.target.value)}
          value={eventDate}
          type="date"
          required
        />

        <input
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          onChange={(e) => setOrganizer(e.target.value)}
          value={organizer}
          type="text"
          placeholder="Organizer"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
      <div className="mt-5">

      <BackToDashboardnButton/>
      </div>
    </div>
  );
}
