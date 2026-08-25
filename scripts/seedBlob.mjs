import { put } from '@vercel/blob';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function uploadAndSeed() {
  // We explicitly define diverse heights to force the Masonry grid to show wildly different aspect ratios
  const imagesToFetch = [
    { title: "Neon Portrait", url: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&h=1200&fit=crop", height: 800 },
    { title: "Wide Abstract", url: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1000&h=400&fit=crop", height: 250 },
    { title: "Cyber Alley", url: "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?w=600&h=900&fit=crop", height: 600 },
    { title: "Neon Sign", url: "https://images.unsplash.com/photo-1542736667-069246bdbc6d?w=800&h=500&fit=crop", height: 350 },
    { title: "Tall Architecture", url: "https://images.unsplash.com/photo-1517594422361-5eeb8ae275a9?w=600&h=1000&fit=crop", height: 750 },
    { title: "Landscape Glow", url: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&h=400&fit=crop", height: 280 }
  ];

  for (const item of imagesToFetch) {
    console.log(`Fetching ${item.title}...`);
    const res = await fetch(item.url);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    console.log(`Uploading ${item.title} to Vercel Blob...`);
    const blob = await put(`artwork-${Date.now()}.jpg`, buffer, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN
    });

    console.log("Uploaded blob:", blob.url);

    await prisma.artwork.create({
      data: {
        title: item.title,
        height: item.height, // Hardcoded diverse heights
        userId: 1, // Broskoy
        imageUrl: blob.url
      }
    });
    console.log("Created artwork record for", item.title);
  }
}

uploadAndSeed().catch(console.error).finally(() => prisma.$disconnect());
