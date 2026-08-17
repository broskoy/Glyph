import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const artwork = await prisma.artwork.update({
      where: { id },
      data: { likes: { increment: 1 } }
    })
    return NextResponse.json(artwork)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update likes' }, { status: 500 })
  }
}
