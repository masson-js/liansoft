import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  console.log("Received ID:", id);
  try {
    const event = await prisma.event.findUnique({
      where: { id: Number(id) },
      include: {
        participants: true,
      },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
