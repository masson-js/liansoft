import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

type EventProps = {
  title: string;
  description: string;
  eventDate: string;
  organizer: string;
};

export async function POST(request: Request) {
  try {
    const event: EventProps = await request.json();
    // await prisma.event.deleteMany()
    const data = await prisma.event.create({
      data: {
        title: event.title,
        description: event.description,
        eventDate: new Date(event.eventDate),
        organizer: event.organizer,
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error parsing request:", error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
