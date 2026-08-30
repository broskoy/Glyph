"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Activity = {
  id: number;
  title: string;
  date: string;
  time: string | null;
  location: string;
  description: string | null;
};

type ActivityFormModalProps = {
  initialData?: Activity | null;
  onClose: () => void;
};

export default function ActivityFormModal({ initialData, onClose }: ActivityFormModalProps) {
  const router = useRouter();

  const isEditing = !!initialData;

  const [title, setTitle] = useState(initialData?.title || "");
  const [date, setDate] = useState(initialData?.date || "");
  const [time, setTime] = useState(initialData?.time || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isEditing ? `/api/admin/activities/${initialData.id}` : "/api/admin/activities";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, date, time, location, description }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save activity");
      }

      router.refresh();
      onClose();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!isEditing || !window.confirm("Are you sure you want to delete this activity? This cannot be undone.")) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/activities/${initialData.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete activity");
      }

      router.refresh();
      onClose();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
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
        padding: "clamp(1.5rem, 5vw, 2.5rem) clamp(1.5rem, 5vw, 2rem)",
        position: "relative"
      }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 className="title-gradient" style={{ margin: 0, fontSize: "clamp(1.5rem, 5vw, 1.8rem)" }}>
            {isEditing ? "Edit Activity" : "New Activity"}
          </h2>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", color: "var(--text-secondary)", fontSize: "1.5rem", cursor: "pointer", padding: 0 }}
          >
            ✕
          </button>
        </div>

        {error && <p style={{ color: "#ff6b6b", marginBottom: "1rem" }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            style={{ padding: "0.8rem", borderRadius: "12px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid var(--glass-border)", color: "white" }}
          />

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input
              type="text"
              placeholder="Date"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
              style={{ flex: 1, minWidth: 0, padding: "0.8rem", borderRadius: "12px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid var(--glass-border)", color: "white" }}
            />
            <input
              type="text"
              placeholder="Time"
              value={time}
              onChange={e => setTime(e.target.value)}
              style={{ flex: 1, minWidth: 0, padding: "0.8rem", borderRadius: "12px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid var(--glass-border)", color: "white" }}
            />
          </div>

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={e => setLocation(e.target.value)}
            required
            style={{ padding: "0.8rem", borderRadius: "12px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid var(--glass-border)", color: "white" }}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={4}
            style={{ padding: "0.8rem", borderRadius: "12px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid var(--glass-border)", color: "white", resize: "vertical" }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "1rem",
              borderRadius: "12px",
              background: "var(--gradient-warm)",
              color: "white",
              fontWeight: "bold",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              marginTop: "0.5rem"
            }}
          >
            {loading ? "Saving..." : (isEditing ? "Save Changes" : "Post")}
          </button>
        </form>

        {isEditing && (
          <button
            onClick={handleDelete}
            disabled={loading}
            style={{
              width: "100%",
              padding: "1rem",
              marginTop: "1rem",
              borderRadius: "12px",
              background: "rgba(255, 107, 107, 0.1)",
              color: "#ff6b6b",
              fontWeight: "bold",
              border: "1px solid rgba(255, 107, 107, 0.3)",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Deleting..." : "Delete Activity"}
          </button>
        )}
      </div>
    </div>
  );
}
