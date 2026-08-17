import { prisma } from '@/lib/prisma'
import GalleryGrid from './GalleryGrid'

// This ensures the gallery always fetches the latest data instead of caching it statically
export const dynamic = 'force-dynamic'

export default async function Gallery() {
  // We fetch securely on the server
  const artworks = await prisma.artwork.findMany({
    orderBy: { id: 'asc' }
  })

  return (
    <div style={{ padding: "4rem 2rem", maxWidth: "1400px", margin: "0 auto" }}>
      <h1 className="title-gradient" style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '3rem' }}>
        Community Gallery
      </h1>

      {/* We pass the data to a Client Component which handles the interactive Likes */}
      <GalleryGrid initialArtworks={artworks} />
    </div>
  )
}
