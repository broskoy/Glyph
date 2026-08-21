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
    const id = parseInt(resolvedParams.id);
    const artwork = await prisma.artwork.update({
      where: { id },
      data: { likes: { increment: 1 } }
    })
    return NextResponse.json(artwork)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update likes' }, { status: 500 })
  }
}
