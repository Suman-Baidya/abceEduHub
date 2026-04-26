import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';
import 'dotenv/config';

async function main() {
  const prisma = new PrismaClient({ 
    adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }) 
  });
  
  await prisma.landingSection.updateMany({ 
    where: { type: { startsWith: 'legal-' } }, 
    data: { content: { html: '', lastUpdated: '' } } 
  });
  
  console.log('✅ Legal content cleared');
  await prisma.$disconnect();
}

main();
