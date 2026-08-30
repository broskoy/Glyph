"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
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

export default function GalleryGrid({ initialArtworks, isAdmin = false }: { initialArtworks: Artwork[], isAdmin?: boolean }) {
  const router = useRouter();
  const [artworks, setArtworks] = useState<Artwork[]>(initialArtworks);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [ratios, setRatios] = useState<Record<number, number>>({});
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleImageLoad = (id: number, e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    let ratio = naturalWidth / naturalHeight;
    
    // Max wide limit: 1 (Square) - prevents title/like button from covering the whole image
    if (ratio > 1) ratio = 1;
    
    // Max tall limit: 0.6 (3:5 Portrait) - prevents phone screenshots from being endlessly tall
    if (ratio < 0.6) ratio = 0.6;
    
    setRatios(prev => ({ ...prev, [id]: ratio }));
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this artwork? This cannot be undone.")) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/artworks/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error("Failed to delete");
      setSelectedId(null);
      router.refresh(); // Refresh the server component to get the updated list
    } catch (e) {
      alert("Failed to delete artwork. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const selectedArt = artworks.find(a => a.id === selectedId);

  return (
    <>
      <div className={styles.masonryGrid}>
        {artworks.map((img) => {
          const ratio = ratios[img.id];
          return (
            <motion.div 
              key={img.id} 
              className={styles.masonryItem} 
              onClick={() => setSelectedId(img.id)}
            >
              <img 
                src={img.imageUrl} 
                alt={img.title}
                onLoad={(e) => handleImageLoad(img.id, e)}
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  display: 'block', 
                  aspectRatio: ratio ? `${ratio}` : 'auto',
                  objectFit: ratio ? 'cover' : 'initial',
                  transition: 'opacity 0.2s ease',
                  opacity: ratio ? 1 : 0 // Hide slightly until ratio is calculated to prevent jump
                }}
              />
            
            <div className={styles.overlay}>
              <div className={styles.metadata}>
                <h3>{img.title}</h3>
                <p>by {img.user?.username || 'Unknown'}</p>
              </div>
              <button 
                className={styles.likeBtn} 
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike(img.id);
                }}
                aria-label="Like artwork"
                style={{ color: img.hasLiked ? "var(--gradient-warm)" : "white" }}
              >
                <span style={{ fontSize: '1.2rem', marginRight: '0.4rem', color: 'white' }}>{img.likesCount}</span> {img.hasLiked ? "♥" : "♡"}
              </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedId && selectedArt && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'transparent',
              backdropFilter: 'blur(10px)',
              zIndex: 1000,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 'clamp(1rem, 5vw, 4rem)'
            }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              style={{
                width: '90%',
                maxWidth: '1200px',
                height: '80vh',
                position: 'relative',
                background: 'transparent',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Image 
                  src={selectedArt.imageUrl} 
                  alt={selectedArt.title}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>

              <button 
                onClick={() => setSelectedId(null)}
                style={{ 
                  position: 'absolute', 
                  top: 'clamp(2rem, 5vw, 3rem)', 
                  right: 'clamp(1.5rem, 5vw, 3rem)', 
                  background: 'rgba(255,255,255,0.1)', 
                  color: 'white', 
                  border: '1px solid rgba(255,255,255,0.2)', 
                  borderRadius: '50%', 
                  width: '44px', 
                  height: '44px', 
                  cursor: 'pointer', 
                  fontSize: '1.5rem', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  backdropFilter: 'blur(5px)'
                }}
              >
                ✕
              </button>

              {/* Admin Delete Button */}
              {isAdmin && (
                <button 
                  onClick={() => handleDelete(selectedArt.id)}
                  disabled={isDeleting}
                  style={{ 
                    position: 'absolute', 
                    bottom: 'clamp(2rem, 5vw, 3rem)', 
                    right: 'clamp(1.5rem, 5vw, 3rem)', 
                    background: 'rgba(255, 107, 107, 0.2)', 
                    color: '#ff6b6b', 
                    border: '1px solid rgba(255, 107, 107, 0.4)', 
                    borderRadius: '50%', 
                    width: '44px', 
                    height: '44px', 
                    cursor: isDeleting ? 'not-allowed' : 'pointer', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    backdropFilter: 'blur(5px)',
                    transition: 'all 0.2s ease',
                    opacity: isDeleting ? 0.5 : 1
                  }}
                  title="Delete Artwork"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
