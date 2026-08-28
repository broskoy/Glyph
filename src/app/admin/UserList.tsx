"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AddForm from "./AddForm";

type UserType = {
  id: number;
  username: string;
  role: string;
  createdAt: string;
};

export default function UserList({ initialUsers, currentUserId }: { initialUsers: UserType[], currentUserId: number }) {
  const router = useRouter();
  const [users, setUsers] = useState<UserType[]>(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  // Sync state with server props when a new user is added and router.refresh() is called
  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this member? All their uploads will also be deleted.")) return;

    setIsDeleting(id);
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        setUsers(users.filter(u => u.id !== id));
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete user");
      }
    } catch (err) {
      alert("An unexpected error occurred");
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h2 style={{ margin: 0, fontSize: "1.5rem" }}>Members List</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="pop-hover"
          style={{ padding: "0.6rem 1.5rem", background: "rgba(255, 255, 255, 0.08)", backdropFilter: "blur(20px)", color: "white", fontWeight: "bold", borderRadius: "50px", border: "1px solid var(--glass-border)", cursor: "pointer" }}
        >
          + Add
        </button>
      </div>

      <div style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderRadius: "16px", border: "1px solid var(--glass-border)", overflow: "hidden" }}>
        {users.length === 0 ? (
          <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-secondary)" }}>No members found.</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ background: "rgba(0,0,0,0.3)", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                  <th style={{ padding: "1rem" }}>ID</th>
                  <th style={{ padding: "1rem" }}>Username</th>
                  <th style={{ padding: "1rem" }}>Role</th>
                  <th style={{ padding: "1rem" }}>Joined</th>
                  <th style={{ padding: "1rem", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} style={{ borderTop: "1px solid var(--glass-border)" }}>
                    <td style={{ padding: "1rem" }}>#{user.id}</td>
                    <td style={{ padding: "1rem", fontWeight: "bold" }}>{user.username}</td>
                    <td style={{ padding: "1rem" }}>
                      <span style={{
                        padding: "0.2rem 0.6rem",
                        borderRadius: "12px",
                        fontSize: "0.8rem",
                        background: user.role === "ADMIN" ? "rgba(51, 255, 129, 0.2)" : "rgba(255, 255, 255, 0.1)",
                        color: user.role === "ADMIN" ? "#5af974ff" : "white"
                      }}>
                        {user.role}
                      </span>
                    </td>
                    <td style={{ padding: "1rem", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: "1rem", textAlign: "right" }}>
                      {user.id !== currentUserId ? (
                        <button
                          onClick={() => handleDelete(user.id)}
                          disabled={isDeleting === user.id}
                          className="pop-hover"
                          style={{
                            padding: "0.5rem 1rem",
                            background: "rgba(255, 107, 107, 0.1)",
                            color: "#ff6b6b",
                            borderRadius: "6px",
                            border: "1px solid rgba(255, 107, 107, 0.3)",
                            cursor: isDeleting === user.id ? "not-allowed" : "pointer",
                            opacity: isDeleting === user.id ? 0.5 : 1
                          }}
                        >
                          {isDeleting === user.id ? "Deleting..." : "Delete"}
                        </button>
                      ) : (
                        <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem", paddingRight: "1rem" }}>You</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.4)",
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
            maxWidth: "400px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
          }}>
            <AddForm
              onClose={() => setIsModalOpen(false)}
              onSuccess={() => {
                router.refresh();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
