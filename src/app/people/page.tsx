import CardCarousel from './CardCarousel';

export default function PeoplePage() {
  return (
    <div style={{ padding: "clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)", maxWidth: "1200px", margin: "0 auto", overflow: "hidden" }}>
      <div style={{ textAlign: "center" }}>
        <h1 className="title-gradient" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", marginBottom: "1rem" }}>
          The Team
        </h1>
      </div>
      <p style={{ color: "var(--text-secondary)", fontSize: "1.2rem", textAlign: "center", maxWidth: "600px", margin: "0 auto 2rem auto" }}>
        Meet the members of Glyph by moving through the cards.
      </p>

      {/* The interactive carousel component */}
      <CardCarousel />
    </div>
  );
}
