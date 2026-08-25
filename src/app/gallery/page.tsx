import { prisma } from '@/lib/prisma'
import GalleryGrid from './GalleryGrid'
import UploadModal from './UploadModal'

// This ensures the gallery always fetches the latest data instead of caching it statically
export const dynamic = 'force-dynamic' 

export default async function Gallery() {
  // We fetch securely on the server
  const artworks = await prisma.artwork.findMany({
    orderBy: { createdAt: 'desc' },
    include: { user: { select: { username: true } } }
  })

  return (
    <div style={{ padding: "clamp(6rem, 10vw, 8rem) clamp(1rem, 3vw, 2rem) clamp(2rem, 5vw, 4rem)", maxWidth: "1000px", margin: "0 auto" }}>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', gap: '1rem' }}>
        <h1 className="title-gradient" style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)', margin: 0 }}>
          Community Gallery
        </h1>
        <UploadModal />
      </div>
      
      {/* We pass the data to a Client Component which handles the interactive Likes */}
      <GalleryGrid initialArtworks={artworks} />
    </div>
  )
}
