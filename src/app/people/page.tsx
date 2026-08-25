import CardCarousel from './CardCarousel';

export default function PeoplePage() {
  return (
    <div style={{ padding: "clamp(6rem, 10vw, 8rem) clamp(1rem, 3vw, 2rem) clamp(2rem, 5vw, 4rem)", maxWidth: "1200px", margin: "0 auto", overflow: "hidden" }}>
      <div style={{ textAlign: "center" }}>
        <h1 className="title-gradient" style={{ fontSize: "clamp(1.8rem, 5vw, 4rem)", marginBottom: "1rem" }}>
          The Team
        </h1>
      </div>
      <p style={{ color: "var(--text-secondary)", fontSize: "clamp(1rem, 3vw, 1.2rem)", textAlign: "center", maxWidth: "600px", margin: "0 auto 2rem auto", padding: "0 1rem" }}>
        Meet the members of Glyph by moving through the cards.
      </p>

      {/* The interactive carousel component */}
      <CardCarousel />
    </div>
  );
}
