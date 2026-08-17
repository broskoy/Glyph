export default function Activities() {
  const events = [
    { id: 1, date: "Oct 15", title: "Life Drawing Session", location: "Studio A" },
    { id: 2, date: "Nov 02", title: "Digital Art Workshop", location: "Lab 304" },
    { id: 3, date: "Nov 20", title: "Winter Exhibition Opening", location: "Main Gallery" },
  ];

  return (
    <div style={{ padding: "4rem 2rem", maxWidth: "1000px", margin: "0 auto" }}>
      <h1 className="title-gradient" style={{ fontSize: "3.5rem", marginBottom: "3rem" }}>
        Upcoming Activities
      </h1>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {events.map((event) => (
          <div key={event.id} className="pop-hover" style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            background: "var(--glass-bg)", 
            border: "1px solid var(--glass-border)", 
            borderRadius: "16px", 
            padding: "2rem" 
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
