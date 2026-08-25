export default function Info() {
  return (
    <div style={{ padding: "clamp(6rem, 10vw, 8rem) clamp(1rem, 3vw, 2rem) clamp(2rem, 5vw, 4rem)", maxWidth: "800px", margin: "0 auto" }}>
      <h1 className="title-gradient" style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)", marginBottom: "clamp(0.5rem, 2vw, 1rem)", textAlign: "center" }}>
        About Us
      </h1>

      <div style={{ marginTop: "clamp(1rem, 3vw, 2rem)" }}>
        <h2 style={{ fontSize: "clamp(1.2rem, 4vw, 1.6rem)", marginBottom: "0.2rem", opacity: 0.9 }}>Our Mission</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "clamp(1.5rem, 5vw, 3.5rem)", fontSize: "clamp(1rem, 3vw, 1.2rem)" }}>
          The Glyph Art Association is a student-led collective dedicated to providing a platform for emerging artists to showcase their work, collaborate on interdisciplinary projects, and engage with the broader university community.
        </p>

        <h2 style={{ fontSize: "clamp(1.2rem, 4vw, 1.6rem)", marginBottom: "0.2rem", opacity: 0.9 }}>Membership</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "clamp(1.5rem, 5vw, 3.5rem)", fontSize: "clamp(1rem, 3vw, 1.2rem)" }}>
          Membership is open to all enrolled students regardless of major. As a member, you gain the ability to post your artwork directly to our digital gallery, participate in exclusive workshops, and have your voice heard in our creative direction.
        </p>

        <h2 style={{ fontSize: "clamp(1.2rem, 4vw, 1.6rem)", marginBottom: "0.2rem", opacity: 0.9 }}>Events & Exhibitions</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "clamp(1.5rem, 5vw, 3.5rem)", fontSize: "clamp(1rem, 3vw, 1.2rem)" }}>
          Throughout the academic year, we host a variety of events ranging from casual critique nights and collaborative murals to formal, curated gallery exhibitions. Whether you are looking to network with other creatives or simply find inspiration, our doors are always open.
        </p>

        <div style={{ textAlign: "center", marginTop: "clamp(2rem, 6vw, 5rem)" }}>
          <a href="mailto:contact@glyphart.edu" className="pop-hover" style={{ display: "inline-block", background: "var(--text-primary)", color: "var(--bg-color)", padding: "clamp(0.4rem, 1.5vw, 0.8rem) clamp(1rem, 3vw, 1.5rem)", fontSize: "clamp(0.8rem, 3vw, 1rem)", borderRadius: "50px", fontWeight: "bold" }}>
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
