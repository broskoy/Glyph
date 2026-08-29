import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const data = await request.json();
    const { title, date, time, location, description } = data;

    if (!title || !date || !location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newActivity = await prisma.activity.create({
      data: {
        title,
        date,
        time: time || null,
        location,
        description: description || null
      }
    });

    return NextResponse.json({ success: true, activity: newActivity });
  } catch (err) {
    console.error("Failed to create activity:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
