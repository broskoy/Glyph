import { prisma } from '@/lib/prisma'
import GalleryGrid from './GalleryGrid'
import UploadModal from './UploadModal'

// This ensures the gallery always fetches the latest data instead of caching it statically
export const dynamic = 'force-dynamic' 

export default async function Gallery() {
  // We fetch securely on the server
  const artworks = await prisma.artwork.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div style={{ padding: "4rem 2rem", maxWidth: "1400px", margin: "0 auto" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <h1 className="title-gradient" style={{ fontSize: '3rem', margin: 0 }}>
          Community Gallery
        </h1>
        <UploadModal />
      </div>
      
      {/* We pass the data to a Client Component which handles the interactive Likes */}
      <GalleryGrid initialArtworks={artworks} />
    </div>
  )
}
