export default function Info() {
  return (
    <div style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 className="title-gradient" style={{ fontSize: "3.5rem", marginBottom: "2rem", textAlign: "center" }}>
        About the Association
      </h1>
      
      <div style={{ background: "var(--bg-color)", border: "1px solid var(--glass-border)", borderRadius: "24px", padding: "3rem", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Our Mission</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", fontSize: "1.1rem" }}>
          The Glyph Art Association is a student-led collective dedicated to providing a platform for emerging artists to showcase their work, collaborate on interdisciplinary projects, and engage with the broader university community.
        </p>

        <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Membership</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", fontSize: "1.1rem" }}>
          Membership is open to all enrolled students regardless of major. As a member, you gain the ability to post your artwork directly to our digital gallery, participate in exclusive workshops, and have your voice heard in our creative direction.
        </p>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <a href="mailto:contact@glyphart.edu" className="pop-hover" style={{ display: "inline-block", background: "var(--text-primary)", color: "var(--bg-color)", padding: "1rem 2rem", borderRadius: "50px", fontWeight: "bold" }}>
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
