"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Gallery.module.css';

type Artwork = {
  id: number;
  title: string;
  userId: number;
  height: number;
  likesCount: number;
  imageUrl: string;
  user?: { username: string };
  hasLiked: boolean;
};

export default function GalleryGrid({ initialArtworks }: { initialArtworks: Artwork[] }) {
  const [artworks, setArtworks] = useState<Artwork[]>(initialArtworks);

  // When the parent Server Component refetches data after an upload, sync it to the client state
  useEffect(() => {
    setArtworks(initialArtworks);
  }, [initialArtworks]);

  const handleLike = async (id: number) => {
    // Find if it was liked before clicking
    const targetArt = artworks.find(art => art.id === id);
    if (!targetArt) return;
    
    const currentlyLiked = targetArt.hasLiked;

    // Optimistic UI update: instantly toggle the heart and count
    setArtworks(prev => prev.map(art => 
      art.id === id 
        ? { 
            ...art, 
            hasLiked: !currentlyLiked, 
            likesCount: currentlyLiked ? art.likesCount - 1 : art.likesCount + 1 
          } 
        : art
    ));

    try {
      // Send the request to the database
      const res = await fetch(`/api/artworks/${id}/like`, { method: 'POST' });
      if (!res.ok) {
        if (res.status === 401) {
          alert("You must be logged in to like artworks.");
        }
        throw new Error("Failed to like");
      }
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
              style={{ color: img.hasLiked ? "var(--gradient-warm)" : "white" }}
            >
              <span style={{ fontSize: '1.2rem', marginRight: '0.4rem', color: 'white' }}>{img.likesCount}</span> {img.hasLiked ? "♥" : "♡"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
