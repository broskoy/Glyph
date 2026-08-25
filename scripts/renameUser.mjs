import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const updatedUser = await prisma.user.update({
    where: { id: 1 },
    data: { username: "Broskoy" }
  });
  console.log("Successfully renamed user:", updatedUser);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
