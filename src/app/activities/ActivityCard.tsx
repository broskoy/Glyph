"use client";

import { useState } from "react";

type Activity = {
  id: number;
  title: string;
  date: string;
  time: string | null;
  location: string;
  description: string | null;
};
import ActivityFormModal from "./ActivityFormModal";

export default function ActivityCard({ event, isAdmin = false }: { event: Activity, isAdmin?: boolean }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
      <div className="pop-hover" style={{
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
        padding: "clamp(1rem, 3vw, 2rem)",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
      }}>
        <div>
          <p style={{ color: "var(--accent-1)", fontWeight: "bold", marginBottom: "0.5rem", fontSize: "clamp(0.9rem, 3vw, 1rem)" }}>{event.date}</p>
          <h2 style={{ fontSize: "clamp(1.2rem, 4vw, 1.8rem)", marginBottom: "0.5rem" }}>{event.title}</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "clamp(0.9rem, 3vw, 1rem)" }}>📍 {event.location}</p>
        </div>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          {isAdmin && (
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="pop-hover"
              style={{
                background: "transparent",
                border: "1px solid var(--text-primary)",
                color: "var(--text-primary)",
                fontSize: "1.2rem",
                cursor: "pointer",
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
              </svg>
            </button>
          )}
          <button 
            onClick={() => setIsModalOpen(true)}
            style={{
              background: "transparent",
              border: "1px solid var(--text-primary)",
              color: "var(--text-primary)",
              padding: "clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 3vw, 1.5rem)",
              borderRadius: "50px",
              fontWeight: "bold",
              cursor: "pointer"
            }}>
            More
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "transparent",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999,
          padding: "1rem"
        }}>
          <div className="animate-fade-in" style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid var(--glass-border)",
            borderRadius: "24px",
            width: "100%",
            maxWidth: "500px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            padding: "2.5rem 2rem",
            position: "relative"
          }}>
            <button 
              onClick={() => setIsModalOpen(false)}
              style={{ position: "absolute", top: "1rem", right: "1.5rem", background: "none", border: "none", color: "var(--text-secondary)", fontSize: "1.5rem", cursor: "pointer" }}
            >
              ✕
            </button>
            <p style={{ color: "var(--accent-1)", fontWeight: "bold", marginBottom: "0.5rem", fontSize: "0.9rem" }}>{event.date} {event.time && `• ${event.time}`}</p>
            <h2 style={{ margin: "0 0 1rem 0", fontSize: "1.8rem" }}>{event.title}</h2>
            <p style={{ color: "white", marginBottom: "2rem", lineHeight: "1.6", fontSize: "1rem" }}>{event.description || "No description provided."}</p>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>📍 {event.location}</p>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <ActivityFormModal initialData={event} onClose={() => setIsEditModalOpen(false)} />
      )}
    </>
  );
}
