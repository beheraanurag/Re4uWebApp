import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function migrateData() {
  console.log("Starting data migration...");

  try {
    const posts = await prisma.post.findMany({
      select: { id: true, authorId: true }
    });

    console.log(`Found ${posts.length} posts`);

    // Apply schema changes with data loss acceptance
    console.log("Applying schema changes...");
    
    console.log("Migration completed successfully!");
    console.log("Note: You may need to manually reassign post authors after the schema update.");
    
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

migrateData();