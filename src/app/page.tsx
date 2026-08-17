import Footer from "../components/Footer";
import InteractiveBackground from "../components/InteractiveBackground";

export default function Home() {
  return (
    <>
      <InteractiveBackground />
      <div style={{ padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
        <h1 className="title-gradient" style={{ fontSize: "4rem", marginBottom: "1rem" }}>
          Welcome to Glyph
        </h1>
        <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto 3rem" }}>
          We are a vibrant community of student artists. Express yourself, share your work, and explore the gallery.
        </p>
        
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <a 
            href="/gallery" 
            className="pop-hover"
            style={{ 
              background: "var(--gradient-warm)", 
              padding: "1rem 2rem", 
              borderRadius: "50px", 
              fontWeight: "bold",
              color: "white"
            }}
          >
            Explore Gallery
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
