export default function Footer() {
  return (
    <footer style={{ 
      marginTop: "4rem", 
      padding: "2rem", 
      borderTop: "1px solid var(--glass-border)", 
      textAlign: "center",
      color: "var(--text-secondary)"
    }}>
      <div style={{ marginBottom: "1rem", fontWeight: "bold", color: "var(--text-primary)" }}>
        GLYPH ART ASSOCIATION
      </div>
      <p style={{ fontSize: "0.9rem" }}>
        © {new Date().getFullYear()} Glyph. All rights reserved.
      </p>
    </footer>
  );
}
