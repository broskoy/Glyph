import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
  await prisma.activity.createMany({
    data: [
      { 
        date: "Oct 15", 
        title: "Life Drawing Session", 
        location: "Studio A", 
        time: "18:00 - 20:00", 
        description: "Join us for a relaxing evening of life drawing. Materials are provided, but feel free to bring your own sketchbooks. Open to all skill levels!" 
      },
      { 
        date: "Nov 02", 
        title: "Digital Art Workshop", 
        location: "Lab 304", 
        time: "14:00 - 17:00", 
        description: "Learn the fundamentals of digital painting using modern tablets and software. Our experienced members will guide you through the process of creating your first digital masterpiece." 
      },
      { 
        date: "Nov 20", 
        title: "Winter Decorations", 
        location: "Main Gallery", 
        time: "10:00 - 15:00", 
        description: "Help us transform the Main Gallery into a winter wonderland for the upcoming exhibition. We'll be crafting custom decorations and installing lighting." 
      }
    ]
  });
  console.log("Activities seeded successfully!");
}

seed().catch(console.error).finally(() => prisma.$disconnect());
