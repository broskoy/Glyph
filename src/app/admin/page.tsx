import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminForm from "./AdminForm";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  // Server-Side Security: If the user isn't logged in, or isn't an Admin, completely block the page.
  // This prevents the UI from even flashing for a split second!
  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/"); 
  }

  return (
    <div style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 className="title-gradient" style={{ fontSize: "3rem", marginBottom: "2rem" }}>Admin Dashboard</h1>
      <AdminForm />
    </div>
  );
}
