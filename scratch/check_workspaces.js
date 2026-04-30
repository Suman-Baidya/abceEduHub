require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { Pool, neonConfig } = require('@neondatabase/serverless');
const { PrismaNeon } = require('@prisma/adapter-neon');
const ws = require('ws');

neonConfig.webSocketConstructor = ws;
const connectionString = process.env.DATABASE_URL;

async function checkWorkspaces() {
  let db;
  try {
    const adapter = new PrismaNeon({ connectionString });
    db = new PrismaClient({ adapter });
    const workspaces = await db.workspace.findMany({
      select: { subdomain: true, isActive: true }
    });
    console.log('Workspaces:', JSON.stringify(workspaces, null, 2));
  } catch (err) {
    console.error('Error checking workspaces:', err);
  } finally {
    if (db) await db.$disconnect();
  }
}

checkWorkspaces();
