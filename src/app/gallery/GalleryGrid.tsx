"use client";

import { useState } from 'react';
import styles from './Gallery.module.css';

type Artwork = {
  id: number;
  title: string;
  artist: string;
  height: number;
  likes: number;
};

export default function GalleryGrid({ initialArtworks }: { initialArtworks: Artwork[] }) {
  const [artworks, setArtworks] = useState<Artwork[]>(initialArtworks);

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
          {/* We use colorful CSS blocks as placeholder art for now */}
          <div className={styles.imagePlaceholder} style={{ background: `linear-gradient(135deg, hsl(${img.id * 45}, 80%, 60%), hsl(${img.id * 45 + 40}, 80%, 50%))` }}></div>
          
          <div className={styles.overlay}>
            <div className={styles.metadata}>
              <h3>{img.title}</h3>
              <p>by {img.artist}</p>
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
