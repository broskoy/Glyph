const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding the database...')
  await prisma.artwork.deleteMany({}) // Clear existing
  await prisma.artwork.createMany({
    data: [
      { height: 300, title: "Abstract Horizon", artist: "Alex Rivers", likes: 12, imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop" },
      { height: 450, title: "Neon Nights", artist: "Sam Chen", likes: 25, imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop" },
      { height: 250, title: "City Echoes", artist: "Jordan Bell", likes: 8, imageUrl: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=600&auto=format&fit=crop" },
      { height: 400, title: "Liquid Geometry", artist: "Casey Smith", likes: 42, imageUrl: "https://images.unsplash.com/photo-1550537687-c91072c4792d?q=80&w=600&auto=format&fit=crop" },
      { height: 350, title: "Golden Hour", artist: "Alex Rivers", likes: 15, imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop" },
      { height: 500, title: "Deep Forest", artist: "Sam Chen", likes: 30, imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop" },
      { height: 300, title: "Ocean Breeze", artist: "Jordan Bell", likes: 19, imageUrl: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=600&auto=format&fit=crop" },
    ]
  })
  console.log('Database seeded successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
