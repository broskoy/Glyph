import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import ActivityCard from "./ActivityCard";
import PostActivityButton from "./PostActivityButton";

// Ensure page reflects live data
export const dynamic = 'force-dynamic';

export default async function Activities() {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user && (session.user as any).role === "ADMIN";

  const events = await prisma.activity.findMany({
    orderBy: { id: "asc" }
  });

  return (
    <div className="page-container">
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'clamp(1.5rem, 5vw, 3rem)', gap: '1rem' }}>
        {isAdmin && <PostActivityButton />}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {events.map((event) => (
          <ActivityCard key={event.id} event={event} isAdmin={isAdmin} />
        ))}
      </div>
    </div>
  );
}
