import CardCarousel from './CardCarousel';

export default function PeoplePage() {
  return (
    <div style={{ padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto", overflow: "hidden" }}>
      <h1 className="title-gradient" style={{ fontSize: "4rem", marginBottom: "1rem", marginLeft: "4rem", textAlign: "center" }}>
        The Team
      </h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "1.2rem", textAlign: "center", maxWidth: "600px", margin: "0 auto 2rem auto" }}>
        Meet the members of Glyph by moving through the cards.
      </p>

      {/* The interactive carousel component */}
      <CardCarousel />
    </div>
  );
}
