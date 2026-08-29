import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const resolvedParams = await params;
    const activityId = parseInt(resolvedParams.id);
    
    const data = await request.json();
    const { title, date, time, location, description } = data;

    if (!title || !date || !location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updatedActivity = await prisma.activity.update({
      where: { id: activityId },
      data: {
        title,
        date,
        time: time || null,
        location,
        description: description || null
      }
    });

    return NextResponse.json({ success: true, activity: updatedActivity });
  } catch (err) {
    console.error("Failed to update activity:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const resolvedParams = await params;
    const activityId = parseInt(resolvedParams.id);

    await prisma.activity.delete({
      where: { id: activityId }
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to delete activity:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
