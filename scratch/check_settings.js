require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { Pool, neonConfig } = require('@neondatabase/serverless');
const { PrismaNeon } = require('@prisma/adapter-neon');
const ws = require('ws');

neonConfig.webSocketConstructor = ws;
const connectionString = process.env.DATABASE_URL;

async function checkSiteSettings() {
  let db;
  try {
    const adapter = new PrismaNeon({ connectionString });
    db = new PrismaClient({ adapter });
    
    const workspace = await db.workspace.findUnique({
      where: { subdomain: 'rgycspbira' },
      include: {
        siteSettings: true
      }
    });
    
    if (!workspace) {
      console.log('Workspace rgycspbira not found.');
    } else {
      console.log('Workspace found:', workspace.subdomain);
      console.log('Has SiteSettings:', !!workspace.siteSettings);
      if (workspace.siteSettings) {
        console.log('Site Name:', workspace.siteSettings.siteName);
      }
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    if (db) await db.$disconnect();
  }
}

checkSiteSettings();
