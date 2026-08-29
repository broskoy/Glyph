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
    <div style={{ padding: "clamp(6rem, 10vw, 8rem) clamp(1rem, 3vw, 2rem) clamp(2rem, 5vw, 4rem)", maxWidth: "1000px", margin: "0 auto" }}>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', gap: '1rem' }}>
        <h1 className="title-gradient" style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)", margin: 0 }}>
          Upcoming Activities
        </h1>
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
