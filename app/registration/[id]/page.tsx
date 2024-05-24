"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { BackToDashboardnButton } from "@/app/components/ui/buttons";

type Event = {
  id: number;
  title: string;
  description: string;
  eventDate: string;
  organizer: string;
};

const RegisterForm = () => {
  const params = useParams();
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [referral, setReferral] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [event, setEvent] = useState<Event | null>(null);

  const fetchingData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/getcurse/${params.id}`,
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch event");
      }

      const curse: Event = await response.json();
      setEvent(curse);
    } catch (error) {
      console.error("Error fetching event:", error);
      setError("Failed to fetch event details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchingData();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://liansoft2.vercel.app/api/register/${params.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fullName, email, dateOfBirth, referral }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to register participant");
      }
      router.push(`/viewcurse/${params.id}`);
    } catch (error) {
      console.error("Error registering participant:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!event) {
    return <p>{error || "Event not found"}</p>;
  }

  return (
    <div className="rounded-lg bg-white shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
      <h2 className="text-xl text-amber-600 font-bold mb-4">
        {event.description}
      </h2>
      <h3 className="text-l text-blue-400 font-bold mb-4">
        by {event.organizer}
      </h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Full Name:
          </label>
          <div className="mt-2">
            <input
              className="w-full border rounded-md px-3 py-2 bg-blue-50"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Email:
          </label>
          <input
            className="w-full border rounded-md px-3 py-2 bg-blue-50"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Date of Birth:
          </label>
          <input
            className="w-full border rounded-md px-3 py-2 bg-blue-50"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Referral:
          </label>
          <input
            type="text"
            value={referral}
            onChange={(e) => setReferral(e.target.value)}
            required
            className="w-full border rounded-md px-3 py-2 bg-blue-50"
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white rounded-md py-2"
          type="submit"
          disabled={loading}
        >
          {loading ? "Registering..." : "Submit"}
        </button>
      </form>
      <div className=" flex justify-center items-start mt-5">

        <BackToDashboardnButton />
      </div>
      </div>
    
  );
};

const RegisterPage = () => {
  return (
    <div className="flex justify-center items-start h-screen">
      <div className="flex flex-col items-center w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mt-20">
        <div className="rounded-lg border border-gray-300 shadow-lg p-6">
          <h1 className="font-bold text-xl mb-2">Registration</h1>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
