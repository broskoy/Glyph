import { prisma } from "@/lib/prisma";
import ActivityCard from "./ActivityCard";

export default async function Activities() {
  const events = await prisma.activity.findMany({
    orderBy: { id: "asc" }
  });

  return (
    <div style={{ padding: "clamp(6rem, 10vw, 8rem) clamp(1rem, 3vw, 2rem) clamp(2rem, 5vw, 4rem)", maxWidth: "800px", margin: "0 auto" }}>
      <h1 className="title-gradient" style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)", marginBottom: "3rem" }}>
        Upcoming Activities
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {events.map((event) => (
          <ActivityCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
