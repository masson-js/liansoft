"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { BackToDashboardnButton } from "@/app/components/ui/buttons";

type Participant = {
  id: number;
  fullName: string;
  email: string;
  dateOfBirth: string;
  referral: string;
};

type Event = {
  id: number;
  title: string;
  description: string;
  eventDate: string;
  organizer: string;
  participants: Participant[];
};

export default function Viewcurse() {
  const params = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchingData = async () => {
    try {
      const response = await fetch(
        `api/getcurse/${params.id}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch event");
      }

      const curse: Event = await response.json();
      setEvent(curse);
    } catch (error) {
      console.error("Error fetching event:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchingData();
  }, [params.id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!event) {
    return <p>No event found</p>;
  }

  const title = event.title;
  const description = event.description;

  return (
    <div className="max-w-lg mx-auto p-6 bg-slate-100 rounded-lg shadow-lg text-center mt-20">
    <h1 className="text-3xl font-bold mb-4 text-slate-950">{title}</h1>
    <p className="text-xl text-slate-800 mb-2">{description}</p>
    <p className="text-base text-slate-700 mb-2">Organized by: {event.organizer}</p>
    <p className="text-base text-slate-600 mb-2">Ending date: {event.eventDate.split("T")[0]}</p>
    <p className="mt-5 text-xl font-bold mb-4 text-slate-950">
      Registered Participants:
    </p>
    <ul className="list-disc pl-4 mb-4">
      {event.participants.map((participant, index) => (
        <li key={participant.id} className={`text-${index % 2 === 0 ? "blue-600" : "blue-500"} font-semibold`}>
          {participant.fullName} ({participant.email}) - {participant.referral}
        </li>
      ))}
    </ul>
    <Link href={`/registration/${event.id}`}>
      <button  className=" text-black font-bold w-full border rounded-md px-6 py-6 bg-blue-50 hover:bg-blue-100">
        Registration
      </button>
    </Link>
    <div className="mt-5">

    <BackToDashboardnButton />
    </div>
</div>

  

  );
}
