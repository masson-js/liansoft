"use client";

import { useState, useEffect } from "react";
import Tilesgrid, { Event } from "../tilesgrid/page";

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