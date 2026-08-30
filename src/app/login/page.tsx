"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./Login.module.css";

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
    <div className={styles.loginContainer}>

      <div className={`animate-fade-in ${styles.loginBox}`}>
        <div style={{ textAlign: "center" }}>
          <h1 className={`title-gradient ${styles.loginTitle}`}>Member Login</h1>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

          {error && (
            <div className="animate-slide-up" style={{ color: "#ff6b6b", background: "rgba(255, 107, 107, 0.1)", padding: "1rem", borderRadius: "8px", textAlign: "center", fontSize: "0.9rem" }}>
              {error}
            </div>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.inputLabel}>Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. DigitalGhost99"
              className={styles.loginInput}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.inputLabel}>Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={styles.loginInput}
              style={{ letterSpacing: password ? "0.2em" : "normal" }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`pop-hover ${styles.loginButton}`}
            style={{ opacity: isLoading ? 0.7 : 1 }}
          >
            {isLoading ? "AUTHENTICATING..." : "ENTER"}
          </button>
        </form>


      </div>
    </div>
  );
}
