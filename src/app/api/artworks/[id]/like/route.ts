import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    const artworkId = parseInt(resolvedParams.id);
    const userId = parseInt((session.user as any).id);

    const existingLike = await prisma.artwork.findFirst({
      where: { id: artworkId, likedBy: { some: { id: userId } } }
    });

    if (existingLike) {
      await prisma.artwork.update({
        where: { id: artworkId },
        data: { likedBy: { disconnect: { id: userId } } }
      });
      return NextResponse.json({ liked: false });
    } else {
      await prisma.artwork.update({
        where: { id: artworkId },
        data: { likedBy: { connect: { id: userId } } }
      });
      return NextResponse.json({ liked: true });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update likes' }, { status: 500 })
  }
}
