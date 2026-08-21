import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { writeFile } from 'fs/promises'
import path from 'path'
import crypto from 'crypto'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;

    if (!file || !title) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Generate a unique filename so we don't overwrite files with the same name
    const uniqueFilename = `${crypto.randomUUID()}-${file.name.replace(/\s+/g, '-')}`;
    
    // Determine the absolute path to the public/uploads directory
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    const filePath = path.join(uploadDir, uniqueFilename);
    
    // Save the file to the local disk
    await writeFile(filePath, buffer);

    // Give it a random height between 250px and 550px for the masonry layout
    const height = Math.floor(Math.random() * (550 - 250 + 1) + 250);

    // Save the metadata to our SQLite database
    const artwork = await prisma.artwork.create({
      data: {
        title,
        height,
        userId: parseInt((session.user as any).id), // Use the securely authenticated user ID
        imageUrl: `/uploads/${uniqueFilename}`
      }
    });

    return NextResponse.json({ success: true, artwork });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Failed to upload artwork' }, { status: 500 });
  }
}
