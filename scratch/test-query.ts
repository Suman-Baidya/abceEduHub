import { db } from "../src/lib/prisma";

async function main() {
  const tenant = "abcd";
  const workspace = await db.workspace.findUnique({
    where: { subdomain: tenant }
  });
  console.log("Workspace abcd found:", !!workspace);
  if (workspace) {
    console.log("Workspace Data:", JSON.stringify(workspace, null, 2));
  }
}

main().finally(() => process.exit());
