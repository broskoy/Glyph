"use client";

import { useState } from 'react';

const MOCK_PEOPLE = [
  { id: 1, name: "Alex Mercer", role: "Digital Artist", email: "alex@glyphart.edu", desc: "Specializes in surreal digital landscapes and 3D modeling." },
  { id: 2, name: "Jamie Lin", role: "Photographer", email: "jamie@glyphart.edu", desc: "Captures raw, unedited street photography around the campus." },
  { id: 3, name: "Samira Tariq", role: "Graphic Designer", email: "samira@glyphart.edu", desc: "Focuses on brutalist typography and experimental poster design." },
  { id: 4, name: "Marcus Webb", role: "Illustrator", email: "marcus@glyphart.edu", desc: "Creates intricate pen-and-ink illustrations inspired by folklore." },
  { id: 5, name: "Elena Rostova", role: "Painter", email: "elena@glyphart.edu", desc: "Works with large-scale oil canvases exploring human emotion." },
  { id: 6, name: "David Chen", role: "Sculptor", email: "david@glyphart.edu", desc: "Experimenting with sustainable materials and 3D printing in modern sculpture." }
];

export default function CardCarousel() {
  const cards = MOCK_PEOPLE;
  const [activeIndex, setActiveIndex] = useState(0);

  const rotateLeft = () => {
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const rotateRight = () => {
    setActiveIndex((prev) => (prev + 1) % cards.length);
  };

  // Mathematically wrap the offset so the array acts infinitely circular
  const getOffset = (index: number, active: number, total: number) => {
    let offset = index - active;
    if (offset > Math.floor(total / 2)) offset -= total;
    if (offset < -Math.floor(total / 2)) offset += total;
    return offset;
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "600px", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "2rem" }}>
      {cards.map((person, index) => {
        const offset = getOffset(index, activeIndex, cards.length);
        const isCenter = offset === 0;

        let transformStr = `translateX(${offset * 75}%) scale(${1 - Math.abs(offset) * 0.15})`;
        let opacity = Math.abs(offset) > 1 ? 0 : (isCenter ? 1 : 0.5);
        let zIndex = 10 - Math.abs(offset);
        let cursor = Math.abs(offset) === 1 ? "pointer" : "default";

        let onClick = undefined;
        if (offset === 1) onClick = rotateRight;
        if (offset === -1) onClick = rotateLeft;

        return (
          <div
            key={person.id}
            onClick={onClick}
            style={{
              position: "absolute",
              width: "100%",
              maxWidth: "400px",
              height: "500px",
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid var(--glass-border)",
              borderRadius: "24px",
              padding: "2rem",
              boxShadow: isCenter ? "0 25px 50px -12px rgba(0, 0, 0, 0.8)" : "0 15px 30px -10px rgba(0, 0, 0, 0.5)",
              zIndex,
              transform: transformStr,
              opacity: opacity,
              transition: "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)", // Smooth elastic sliding
              cursor,
              display: "flex",
              flexDirection: "column",
              pointerEvents: opacity === 0 ? "none" : "auto",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            {/* Image Placeholder */}
            <div style={{
              width: "100%",
              height: "320px",
              background: "rgba(255,255,255,0.03)",
              border: "1px dashed rgba(255,255,255,0.2)",
              borderRadius: "16px",
              marginBottom: "1.5rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "rgba(255,255,255,0.3)",
              fontWeight: "bold",
              letterSpacing: "0.1em"
            }}>
              IMAGE PLACEHOLDER
            </div>

            <h2 style={{ fontSize: "2rem", marginBottom: "0.2rem" }}>{person.name}</h2>
            <p style={{ color: "var(--accent-1)", fontWeight: "bold", marginBottom: "0.5rem", letterSpacing: "0.05em", flex: 1 }}>{person.role}</p>

            <a
              href={`mailto:${person.email}`}
              onClick={(e) => {
                if (index !== 0) e.preventDefault(); // Only click email on active center card
              }}
              style={{ color: "var(--text-secondary)", fontWeight: "600", textDecoration: "none", fontSize: "0.95rem", alignSelf: "flex-start" }}
            >
              {person.email}
            </a>
          </div>
        );
      })}
    </div>
  );
}
