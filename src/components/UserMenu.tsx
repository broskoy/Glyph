"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserMenu() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const role = session?.user ? (session.user as any).role : "GUEST";
  
  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
    router.refresh();
  };

  return (
    <div style={{ position: "fixed", top: "2rem", right: "2rem", zIndex: 100, display: "flex", gap: "1.5rem" }}>
      
      {/* User Dropdown */}
      <div style={{ position: "relative" }}>
        <button 
          className="pop-hover"
          onClick={() => { setIsUserMenuOpen(!isUserMenuOpen); setIsSettingsOpen(false); }}
          style={{
            background: "rgba(0,0,0,0.5)",
            border: "1px solid var(--glass-border)",
            borderRadius: "50%",
            width: "3.5rem",
            height: "3.5rem",
            color: "white",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backdropFilter: "blur(10px)"
          }}
        >
          {/* User Icon SVG */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </button>

        {isUserMenuOpen && (
          <div className="animate-fade-in" style={{
            position: "absolute",
            top: "4.5rem",
            right: 0,
            background: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(20px)",
            border: "1px solid var(--glass-border)",
            borderRadius: "16px",
            padding: "1.5rem",
            width: "250px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
            display: "flex",
            flexDirection: "column",
            gap: "1rem"
          }}>
            <div>
              <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-secondary)" }}>Status</p>
              <h3 style={{ margin: 0, color: role === "ADMIN" ? "#00ff80" : "white" }}>
                {role === "ADMIN" ? "Administrator" : role === "MEMBER" ? "Member" : "Guest"}
              </h3>
            </div>

            {session?.user && (
              <div>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-secondary)" }}>Logged in as</p>
                <p style={{ margin: 0, fontWeight: "bold" }}>{session.user.name}</p>
              </div>
            )}
            
            <hr style={{ border: "none", borderTop: "1px solid var(--glass-border)", margin: "0.5rem 0" }} />

            {status === "unauthenticated" ? (
              <Link href="/login" onClick={() => setIsUserMenuOpen(false)} style={{
                textAlign: "center", padding: "0.8rem", borderRadius: "8px", background: "var(--gradient-warm)", color: "white", textDecoration: "none", fontWeight: "bold"
              }}>
                Log In
              </Link>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {role === "ADMIN" && (
                  <Link href="/admin" onClick={() => setIsUserMenuOpen(false)} style={{
                    textAlign: "center", padding: "0.8rem", borderRadius: "8px", background: "rgba(255,255,255,0.1)", color: "white", textDecoration: "none", fontWeight: "bold"
                  }}>
                    Admin Dashboard
                  </Link>
                )}
                <button onClick={handleLogout} style={{
                  padding: "0.8rem", borderRadius: "8px", background: "rgba(255, 107, 107, 0.2)", color: "#ff6b6b", border: "none", cursor: "pointer", fontWeight: "bold"
                }}>
                  Log Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Settings Dropdown */}
      <div style={{ position: "relative" }}>
        <button 
          className="pop-hover"
          onClick={() => { setIsSettingsOpen(!isSettingsOpen); setIsUserMenuOpen(false); }}
          style={{
            background: "rgba(0,0,0,0.5)",
            border: "1px solid var(--glass-border)",
            borderRadius: "50%",
            width: "3.5rem",
            height: "3.5rem",
            color: "white",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backdropFilter: "blur(10px)",
            transition: "transform 0.5s ease",
            transform: isSettingsOpen ? "rotate(90deg)" : "rotate(0deg)"
          }}
        >
          {/* Gear Icon SVG */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </button>

        {isSettingsOpen && (
          <div className="animate-fade-in" style={{
            position: "absolute",
            top: "4.5rem",
            right: 0,
            background: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(20px)",
            border: "1px solid var(--glass-border)",
            borderRadius: "16px",
            padding: "1.5rem",
            width: "250px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
            textAlign: "center"
          }}>
            <p style={{ color: "var(--text-secondary)", margin: 0 }}>Fun customization features coming soon!</p>
          </div>
        )}
      </div>

    </div>
  );
}
