const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding the database...')
  await prisma.artwork.deleteMany({}) // Clear existing
  await prisma.artwork.createMany({
    data: [
      { height: 300, title: "Sunset Glow", artist: "Alex Rivers", likes: 12 },
      { height: 450, title: "Abstract Thoughts", artist: "Sam Chen", likes: 5 },
      { height: 250, title: "City Lights", artist: "Jordan Bell", likes: 24 },
      { height: 400, title: "Morning Dew", artist: "Casey Smith", likes: 8 },
      { height: 350, title: "Neon Dreams", artist: "Alex Rivers", likes: 15 },
      { height: 500, title: "Quiet Forest", artist: "Sam Chen", likes: 30 },
      { height: 300, title: "Ocean Breeze", artist: "Jordan Bell", likes: 42 },
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
