import { prisma } from '@/lib/prisma'
import GalleryGrid from './GalleryGrid'
import UploadModal from './UploadModal'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

// This ensures the gallery always fetches the latest data instead of caching it statically
export const dynamic = 'force-dynamic' 

export default async function Gallery() {
  const session = await getServerSession(authOptions);
  const currentUserId = session?.user ? parseInt((session.user as any).id) : null;

  // We fetch securely on the server
  const artworks = await prisma.artwork.findMany({
    orderBy: { createdAt: 'desc' },
    include: { 
      user: { select: { username: true } },
      likedBy: { select: { id: true } }
    }
  })

  const mappedArtworks = artworks.map(art => ({
    id: art.id,
    title: art.title,
    userId: art.userId,
    height: art.height,
    imageUrl: art.imageUrl,
    user: art.user,
    likesCount: art.likedBy.length,
    hasLiked: currentUserId ? art.likedBy.some(u => u.id === currentUserId) : false
  }));

  return (
    <div className="page-container">
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'clamp(1.5rem, 5vw, 3rem)', gap: '1rem' }}>
        <h1 className="title-gradient" style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)', margin: 0 }}>
          Community Gallery
        </h1>
        <UploadModal />
      </div>
      
      {/* We pass the data to a Client Component which handles the interactive Likes */}
      <GalleryGrid initialArtworks={mappedArtworks} />
    </div>
  )
}
