import styles from './Gallery.module.css';

export default function Gallery() {
  // Placeholder images for the static prototype
  const images = [
    { id: 1, height: 300, title: "Sunset Glow", artist: "Alex Rivers" },
    { id: 2, height: 450, title: "Abstract Thoughts", artist: "Sam Chen" },
    { id: 3, height: 250, title: "City Lights", artist: "Jordan Bell" },
    { id: 4, height: 400, title: "Morning Dew", artist: "Casey Smith" },
    { id: 5, height: 350, title: "Neon Dreams", artist: "Alex Rivers" },
    { id: 6, height: 500, title: "Quiet Forest", artist: "Sam Chen" },
    { id: 7, height: 300, title: "Ocean Breeze", artist: "Jordan Bell" },
  ];

  return (
    <div className={styles.container}>
      <h1 className="title-gradient" style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '3rem' }}>
        Association Gallery
      </h1>
      
      <div className={styles.masonryGrid}>
        {images.map((img) => (
          <div key={img.id} className={styles.masonryItem} style={{ height: `${img.height}px` }}>
            {/* We use colorful CSS blocks as placeholder art for now */}
            <div className={styles.imagePlaceholder} style={{ background: `linear-gradient(135deg, hsl(${img.id * 45}, 80%, 60%), hsl(${img.id * 45 + 40}, 80%, 50%))` }}></div>
            
            <div className={styles.overlay}>
              <div className={styles.metadata}>
                <h3>{img.title}</h3>
                <p>by {img.artist}</p>
              </div>
              <button className={styles.likeBtn} aria-label="Like artwork">
                ♡
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
