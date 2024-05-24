"use client";

import { useState, useEffect } from "react";

import React from "react";
import CreateYourCurseButton, {
  RegistrationButton,
  ViewCurseButton,
} from "@/app/components/ui/buttons";

import {TilesgridProps } from "@/app/types"

import { Event } from "@/app/types"

export default function Dashboard() {
  const [eventList, setEventList] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchingData = async () => {
    try {
      setLoading(true);
      const response = await fetch("api/getcurses", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setEventList(data);
    } catch (error) {
      console.error("Error in getting data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  return (
    <div>
      {loading ? <p>Loading...</p> : <Tilesgrid eventList={eventList} />}
    </div>
  );
}

 function Tilesgrid({ eventList }: TilesgridProps){
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {eventList.map((event) => (
          <div
            className="rounded-lg overflow-hidden shadow-lg bg-blue-50 "
            key={event.id}
          >
            <div className="px-6 py-4">
              <h2 className="font-bold text-xl mb-2 text-blue-900">
                {event.title}
              </h2>
              <p className="text-gray-700 text-base mb-4">
                {event.description}
              </p>
              <p className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {event.organizer}
              </p>
            </div>
            <div className="px-6 py-4 flex justify-between">
              <ViewCurseButton linkto={event.id} />
              <RegistrationButton linkto={event.id} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <CreateYourCurseButton />
      </div>
    </div>
  );
};