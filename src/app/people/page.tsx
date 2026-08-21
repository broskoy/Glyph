import CardStack from '../../components/CardStack';

export default function PeoplePage() {
  return (
    <div style={{ padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto", overflow: "hidden" }}>
      <h1 className="title-gradient" style={{ fontSize: "4rem", marginBottom: "1rem", textAlign: "center" }}>
        The Collective
      </h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "1.2rem", textAlign: "center", maxWidth: "600px", margin: "0 auto 2rem auto" }}>
        Meet the artists driving Glyph. Click on the top card to swipe through the members of our community.
      </p>

      {/* The interactive stack component */}
      <CardStack />
    </div>
  );
}
