import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import UserList from "./UserList";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  // Server-Side Security: If the user isn't logged in, or isn't an Admin, completely block the page.
  // This prevents the UI from even flashing for a split second!
  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/"); 
  }
  // Fetch all users for the dashboard
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" }
  });

  // Map to plain objects to avoid passing Date objects directly to client components
  const plainUsers = users.map(u => ({
    id: u.id,
    username: u.username,
    role: u.role,
    createdAt: u.createdAt.toISOString()
  }));

  return (
    <div className="page-container">
      <UserList initialUsers={plainUsers} currentUserId={parseInt((session.user as any).id)} />
    </div>
  );
}
