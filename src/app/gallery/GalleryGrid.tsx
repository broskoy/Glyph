"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Gallery.module.css';

type Artwork = {
  id: number;
  title: string;
  userId: number;
  height: number;
  likes: number;
  imageUrl: string;
  user?: { username: string };
};

export default function GalleryGrid({ initialArtworks }: { initialArtworks: Artwork[] }) {
  const [artworks, setArtworks] = useState<Artwork[]>(initialArtworks);

  // When the parent Server Component refetches data after an upload, sync it to the client state
  useEffect(() => {
    setArtworks(initialArtworks);
  }, [initialArtworks]);

  const handleLike = async (id: number) => {
    // Optimistic UI update: instantly increment the like count visually
    setArtworks(prev => prev.map(art => 
      art.id === id ? { ...art, likes: art.likes + 1 } : art
    ));

    try {
      // Send the request to the database
      await fetch(`/api/artworks/${id}/like`, { method: 'POST' });
    } catch (e) {
      // Revert if the database request failed
      console.error("Failed to like", e);
      setArtworks(initialArtworks);
    }
  };

  return (
    <div className={styles.masonryGrid}>
      {artworks.map((img) => (
        <div key={img.id} className={styles.masonryItem} style={{ height: `${img.height}px` }}>
          
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image 
              src={img.imageUrl} 
              alt={img.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          
          <div className={styles.overlay}>
            <div className={styles.metadata}>
              <h3>{img.title}</h3>
              <p>by {img.user?.username || 'Unknown'}</p>
            </div>
            <button 
              className={styles.likeBtn} 
              onClick={() => handleLike(img.id)}
              aria-label="Like artwork"
            >
              ♡ <span style={{ fontSize: '1.2rem', marginLeft: '0.2rem' }}>{img.likes}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
