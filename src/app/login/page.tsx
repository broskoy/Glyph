"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Calls the hidden Backend Engine we built earlier
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid username or password.");
      } else {
        // Success! Send them to the gallery
        router.push("/gallery");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "2rem"
    }}>

      <div
        className="animate-fade-in"
        style={{
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          padding: "4rem 3rem",
          borderRadius: "24px",
          border: "1px solid var(--glass-border)",
          width: "100%",
          maxWidth: "450px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          display: "flex",
          flexDirection: "column",
          gap: "2rem"
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1 className="title-gradient" style={{ fontSize: "2.5rem", margin: "0 0 0.5rem 0" }}>Member Login</h1>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

          {error && (
            <div className="animate-slide-up" style={{ color: "#ff6b6b", background: "rgba(255, 107, 107, 0.1)", padding: "1rem", borderRadius: "8px", textAlign: "center", fontSize: "0.9rem" }}>
              {error}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="username" style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. DigitalGhost99"
              style={{ padding: "1.2rem", borderRadius: "12px", border: "1px solid var(--glass-border)", background: "rgba(0,0,0,0.3)", color: "white", fontSize: "1rem" }}
              required
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="password" style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ padding: "1.2rem", borderRadius: "12px", border: "1px solid var(--glass-border)", background: "rgba(0,0,0,0.3)", color: "white", fontSize: "1rem", letterSpacing: password ? "0.2em" : "normal" }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="pop-hover"
            style={{
              marginTop: "1rem",
              padding: "1.2rem",
              borderRadius: "12px",
              background: "var(--gradient-warm)",
              color: "white",
              fontWeight: "900",
              fontSize: "1.2rem",
              border: "none",
              cursor: isLoading ? "not-allowed" : "pointer",
              boxShadow: "0 8px 20px rgba(255, 51, 102, 0.4)",
              opacity: isLoading ? 0.7 : 1,
              transition: "all 0.3s ease"
            }}
          >
            {isLoading ? "AUTHENTICATING..." : "ENTER"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <Link href="/" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.9rem", transition: "color 0.2s ease" }} onMouseOver={e => e.currentTarget.style.color = "white"} onMouseOut={e => e.currentTarget.style.color = "var(--text-secondary)"}>
            ← Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
