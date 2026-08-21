import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  // Security Bouncer: Only allow actual Admins to hit this route
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { username, role } = await request.json();

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    // Check if the requested username is already taken
    const existing = await prisma.user.findUnique({ where: { username } });
    if (existing) {
      return NextResponse.json({ error: "Username already exists" }, { status: 400 });
    }

    // Generate a secure random password (8 hex characters)
    const rawPassword = crypto.randomBytes(4).toString('hex');
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        hashedPassword,
        role: role || "MEMBER"
      }
    });

    return NextResponse.json({ 
      success: true, 
      user: { id: newUser.id, username: newUser.username, role: newUser.role },
      generatedPassword: rawPassword // We return this exactly ONCE so the admin can copy it!
    });

  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
