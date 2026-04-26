import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';
import 'dotenv/config';

async function main() {
  const prisma = new PrismaClient({ 
    adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }) 
  });
  
  await prisma.landingSection.deleteMany({ 
    where: { 
      type: { 
        in: [
          'page-header-privacy-policy', 
          'page-header-terms-conditions', 
          'page-header-cookie-policy', 
          'page-header-refund-policy', 
          'page-header-sitemap'
        ] 
      } 
    } 
  });
  
  console.log('✅ Redundant legal headers removed');
  await prisma.$disconnect();
}

main();
