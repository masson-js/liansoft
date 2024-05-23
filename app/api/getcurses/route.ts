import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

// Экспортируем функцию GET как именованный экспорт
export async function GET() {
  try {
    const events = await prisma.event.findMany();
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error in receiving data", error);
    return NextResponse.json(
      { error: "Error in receiving data" },
      { status: 500 }
    );
  }
}