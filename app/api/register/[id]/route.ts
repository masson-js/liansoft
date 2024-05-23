import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export async function POST(request: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  const body = await request.json();
  const { fullName, email, dateOfBirth, referral } = body;

  if (!fullName || !email || !dateOfBirth || !referral) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  try {
    const event = await prisma.event.findUnique({
      where: { id: Number(id) },
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    const participant = await prisma.participant.create({
      data: {
        fullName,
        email,
        dateOfBirth: new Date(dateOfBirth),
        referral,
        eventId: event.id,
      },
    });

    return NextResponse.json(participant, { status: 201 });
  } catch (error) {
    console.error('Error registering participant:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
