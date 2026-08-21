"use client";

import { useState } from "react";

export default function AdminForm() {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("MEMBER");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{username?: string, password?: string, error?: string} | null>(null);

  const handleCreate = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, role })
      });
      const data = await res.json();

      if (!res.ok) {
        setResult({ error: data.error });
      } else {
        setResult({ username: data.user.username, password: data.generatedPassword });
        setUsername("");
      }
    } catch (err) {
      setResult({ error: "Failed to create user" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ background: "rgba(255,255,255,0.05)", padding: "2rem", borderRadius: "16px", border: "1px solid var(--glass-border)" }}>
      <h2 style={{ marginTop: 0, marginBottom: "1.5rem" }}>Generate New Member</h2>
      
      <form onSubmit={handleCreate} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text-secondary)" }}>Username</label>
          <input 
            type="text" 
            value={username} 
            onChange={e => setUsername(e.target.value)}
            placeholder="Enter student username"
            required
            style={{ width: "100%", padding: "1rem", borderRadius: "8px", border: "1px solid var(--glass-border)", background: "rgba(0,0,0,0.3)", color: "white" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text-secondary)" }}>Account Role</label>
          <select 
            value={role} 
            onChange={e => setRole(e.target.value)}
            style={{ width: "100%", padding: "1rem", borderRadius: "8px", border: "1px solid var(--glass-border)", background: "rgba(0,0,0,0.3)", color: "white" }}
          >
            <option value="MEMBER">Member (Can upload & like art)</option>
            <option value="ADMIN">Admin (Can manage users)</option>
          </select>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="pop-hover"
          style={{ padding: "1rem", background: "var(--gradient-warm)", color: "white", fontWeight: "bold", borderRadius: "8px", border: "none", cursor: "pointer", marginTop: "1rem" }}
        >
          {isLoading ? "Generating..." : "Generate Account"}
        </button>
      </form>

      {result?.password && (
        <div className="animate-slide-up" style={{ marginTop: "2rem", padding: "1.5rem", background: "rgba(0, 255, 128, 0.1)", border: "1px solid rgba(0, 255, 128, 0.3)", borderRadius: "8px" }}>
          <h3 style={{ color: "#00ff80", marginTop: 0 }}>Success! Account Created.</h3>
          <p style={{ margin: "0.5rem 0" }}><strong>Username:</strong> {result.username}</p>
          <p style={{ margin: "0.5rem 0" }}><strong>Password:</strong> <span style={{ padding: "0.2rem 0.5rem", background: "rgba(0,0,0,0.5)", borderRadius: "4px", letterSpacing: "2px" }}>{result.password}</span></p>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "1rem" }}>Warning: Copy this password now and send it to the artist. It is deeply encrypted in the database and cannot be recovered if lost.</p>
        </div>
      )}

      {result?.error && (
        <div className="animate-slide-up" style={{ marginTop: "2rem", padding: "1rem", background: "rgba(255, 107, 107, 0.1)", color: "#ff6b6b", borderRadius: "8px" }}>
          {result.error}
        </div>
      )}
    </div>
  );
}
