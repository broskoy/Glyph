export default function Activities() {
  const events = [
    { id: 1, date: "Oct 15", title: "Life Drawing Session", location: "Studio A" },
    { id: 2, date: "Nov 02", title: "Digital Art Workshop", location: "Lab 304" },
    { id: 3, date: "Nov 20", title: "Winter Exhibition Opening", location: "Main Gallery" },
  ];

  return (
    <div style={{ padding: "clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)", maxWidth: "1000px", margin: "0 auto" }}>
      <h1 className="title-gradient" style={{ fontSize: "clamp(2.5rem, 6vw, 3.5rem)", marginBottom: "3rem" }}>
        Upcoming Activities
      </h1>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {events.map((event) => (
          <div key={event.id} className="pop-hover" style={{ 
            display: "flex", 
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "space-between", 
            alignItems: "center",
            background: "rgba(255, 255, 255, 0.03)", 
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid var(--glass-border)", 
            borderRadius: "24px", 
            padding: "clamp(1.5rem, 4vw, 2rem)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
          }}>
            <div>
              <p style={{ color: "var(--accent-1)", fontWeight: "bold", marginBottom: "0.5rem" }}>{event.date}</p>
              <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>{event.title}</h2>
              <p style={{ color: "var(--text-secondary)" }}>📍 {event.location}</p>
            </div>
            <button style={{ 
              background: "transparent", 
              border: "1px solid var(--text-primary)", 
              color: "var(--text-primary)", 
              padding: "0.75rem 1.5rem", 
              borderRadius: "50px", 
              fontWeight: "bold" 
            }}>
              RSVP
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
