"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function UploadModal() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const resetForm = () => {
    setTitle('');
    setArtist('');
    setFile(null);
    setPreviewUrl(null);
    setError('');
  };

  const handleClose = () => {
    setIsClosing(true);
    // Wait for the exit animation to finish before unmounting
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      resetForm();
    }, 300);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title || !artist) {
      setError('Please fill in all fields and select an image.');
      return;
    }

    setIsUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
      
      handleClose();
      router.refresh(); // Force the server component to refetch the new artwork and update the grid
    } catch (err) {
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="pop-hover" style={{
        padding: '0.8rem 1.8rem',
        background: 'var(--gradient-warm)',
        border: 'none',
        borderRadius: '24px',
        color: 'white',
        fontWeight: '900',
        fontSize: '1.5rem',
        cursor: 'pointer',
        boxShadow: '0 8px 20px rgba(255, 51, 102, 0.4)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <span>POST</span>
        <span style={{ fontSize: '2.5rem', lineHeight: 0.8, fontWeight: '400' }}>+</span>
      </button>

      {isOpen && (
        <div 
          className={isClosing ? 'animate-fade-out' : 'animate-fade-in'}
          style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.4)', // Much more subtle darkening
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '2rem'
        }} onClick={handleClose}>
          
          {/* Prevent clicks inside the modal from closing it */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            className={isClosing ? 'animate-slide-down' : 'animate-slide-up'}
            style={{
            background: 'var(--bg-color)',
            padding: '3rem',
            borderRadius: '24px',
            border: '1px solid var(--glass-border)',
            width: '100%',
            maxWidth: '600px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 className="title-gradient" style={{ margin: 0, fontSize: '2rem' }}>Submit Artwork</h2>
              <button onClick={handleClose} style={{ color: 'var(--text-secondary)', fontSize: '1.5rem' }}>✕</button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {error && <div style={{ color: '#ff6b6b', background: 'rgba(255, 107, 107, 0.1)', padding: '1rem', borderRadius: '8px' }}>{error}</div>}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="title" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Artwork Title</label>
                <input 
                  id="title"
                  type="text" 
                  value={title} 
                  onChange={e => setTitle(e.target.value)}
                  style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.3)', color: 'white' }}
                  required
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="artist" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Artist Name</label>
                <input 
                  id="artist"
                  type="text" 
                  value={artist} 
                  onChange={e => setArtist(e.target.value)}
                  style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.3)', color: 'white' }}
                  required
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Image File</label>
                
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  style={{ 
                    border: '2px dashed var(--glass-border)', 
                    borderRadius: '8px', 
                    padding: '2rem', 
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: previewUrl ? 'transparent' : 'rgba(0,0,0,0.3)',
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {previewUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={previewUrl} alt="Preview" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
                  ) : null}
                  <span style={{ zIndex: 1, textShadow: previewUrl ? '0 2px 4px rgba(0,0,0,0.8)' : 'none' }}>
                    {file ? file.name : "Click to select or drop an image"}
                  </span>
                </div>

                <input 
                  type="file" 
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  required
                />
              </div>

              <button 
                type="submit" 
                disabled={isUploading}
                className="pop-hover"
                style={{ 
                  marginTop: '1rem',
                  padding: '1.2rem', 
                  borderRadius: '8px', 
                  background: 'var(--text-primary)', 
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  opacity: isUploading ? 0.7 : 1
                }}
              >
                {isUploading ? 'Uploading...' : 'Submit to Gallery'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
