import { db } from "../src/lib/prisma";

async function main() {
  try {
    const workspaces = await db.workspace.findMany({
      select: { name: true, subdomain: true, id: true }
    });
    console.log("Current Workspaces:", JSON.stringify(workspaces, null, 2));
  } catch (error) {
    console.error("PRISMA ERROR:", error);
  }
}

main()
  .finally(async () => {
    // await db.$disconnect();
  });
