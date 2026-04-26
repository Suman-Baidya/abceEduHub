import { PrismaClient } from '@prisma/client';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';
import 'dotenv/config';

neonConfig.webSocketConstructor = ws;
const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🚀 Starting Legal Content Seeding...');

  // 1. Get the site settings
  const settings = await prisma.siteSettings.findFirst({
    where: { workspaceId: null }
  });

  if (!settings) {
    console.error('❌ Error: No SiteSettings found. Please initialize your site first.');
    return;
  }

  const legalPages = [
    {
      type: 'legal-privacy-policy',
      title: 'Privacy Policy',
      html: `
        <h1>Privacy Policy</h1>
        <p><strong>Last Updated: ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</strong></p>
        
        <h2>1. Introduction</h2>
        <p>At ABCD Edu Hub, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information when you use our platform and services.</p>
        
        <h2>2. Information We Collect</h2>
        <p>We collect information you provide directly to us, including:</p>
        <ul>
          <li>Account information (name, email, password)</li>
          <li>Institutional data (school name, address, contact details)</li>
          <li>Student and teacher records managed within the platform</li>
          <li>Payment information for subscription services</li>
        </ul>
        
        <h2>3. How We Use Your Information</h2>
        <p>We use the collected data to:</p>
        <ul>
          <li>Provide and maintain our educational services</li>
          <li>Process transactions and send related information</li>
          <li>Send technical notices, updates, and security alerts</li>
          <li>Improve our platform's AI capabilities and user experience</li>
        </ul>
        
        <h2>4. Data Security</h2>
        <p>We implement robust security measures, including end-to-end encryption and secure database hosting, to protect your data from unauthorized access or disclosure.</p>
        
        <h2>5. Your Rights</h2>
        <p>You have the right to access, correct, or delete your personal data at any time through your dashboard settings.</p>
      `
    },
    {
      type: 'legal-terms-conditions',
      title: 'Terms & Conditions',
      html: `
        <h1>Terms & Conditions</h1>
        <p><strong>Last Updated: ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</strong></p>
        
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing ABCD Edu Hub, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please do not use the platform.</p>
        
        <h2>2. Use of License</h2>
        <p>We grant you a non-transferable, non-exclusive license to use the platform for educational management purposes within your institution.</p>
        
        <h2>3. User Responsibilities</h2>
        <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
        
        <h2>4. Service Availability</h2>
        <p>While we strive for 99.9% uptime, we do not guarantee uninterrupted access to the platform and reserve the right to perform scheduled maintenance.</p>
        
        <h2>5. Termination</h2>
        <p>We reserve the right to terminate or suspend access to our service immediately, without prior notice, for conduct that we believe violates these Terms.</p>
      `
    },
    {
      type: 'legal-cookie-policy',
      title: 'Cookie Policy',
      html: `
        <h1>Cookie Policy</h1>
        <p><strong>Last Updated: ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</strong></p>
        
        <h2>1. What are Cookies?</h2>
        <p>Cookies are small text files stored on your device to help websites function better and provide a more personalized experience.</p>
        
        <h2>2. How We Use Cookies</h2>
        <p>We use cookies for:</p>
        <ul>
          <li><strong>Authentication:</strong> To keep you logged in across sessions.</li>
          <li><strong>Preferences:</strong> To remember your language and theme settings.</li>
          <li><strong>Analytics:</strong> To understand how users interact with our features.</li>
        </ul>
        
        <h2>3. Managing Cookies</h2>
        <p>You can control and/or delete cookies as you wish via your browser settings. However, disabling cookies may affect the functionality of the platform.</p>
      `
    },
    {
      type: 'legal-refund-policy',
      title: 'Refund Policy',
      html: `
        <h1>Refund Policy</h1>
        <p><strong>Last Updated: ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</strong></p>
        
        <h2>1. Subscription Refunds</h2>
        <p>We offer a 14-day money-back guarantee for new institutional subscriptions. If you are not satisfied, contact us within 14 days of your initial purchase.</p>
        
        <h2>2. Eligibility</h2>
        <p>Refunds are eligible only if the platform has not been significantly used for large-scale operations (e.g., conducting major exams) during the trial period.</p>
        
        <h2>3. Process</h2>
        <p>Refund requests must be sent to support@abcdeduhub.com. Approved refunds will be processed within 5-10 business days.</p>
      `
    },
    {
      type: 'legal-sitemap',
      title: 'Site Map',
      html: `
        <h1>Site Map</h1>
        <p>Explore the complete structure of the ABCD Edu Hub platform.</p>
        
        <h3>Main Navigation</h3>
        <ul>
          <li><a href="/">Home</a> - AI-Powered Learning Hub</li>
          <li><a href="/about">About Us</a> - Our Journey and Mission</li>
          <li><a href="/services">Services</a> - Modernizing Education</li>
          <li><a href="/guide">User Guide</a> - Mastering the Ecosystem</li>
          <li><a href="/pricing">Pricing</a> - Flexible Scaling Plans</li>
          <li><a href="/support">Support Center</a> - We are here to help</li>
        </ul>
        
        <h3>Legal & Policies</h3>
        <ul>
          <li><a href="/legal/privacy-policy">Privacy Policy</a></li>
          <li><a href="/legal/terms-conditions">Terms & Conditions</a></li>
          <li><a href="/legal/cookie-policy">Cookie Policy</a></li>
          <li><a href="/legal/refund-policy">Refund Policy</a></li>
        </ul>
      `
    }
  ];

  // Also add headers for these pages
  const headerPages = legalPages.map(page => ({
    type: `page-header-${page.type.replace('legal-', '')}`,
    title: page.title,
    subtitle: `Legal information and guidelines regarding our ${page.title}.`,
    content: {
      bgImage: "https://cdn.pixabay.com/photo/2016/11/29/01/16/abacus-1866497_1280.jpg",
      breadcrumb: page.title
    }
  }));

  const allSections = [...legalPages, ...headerPages];

  console.log(`📝 Syncing ${allSections.length} legal sections...`);

  for (const section of allSections) {
    const existing = await prisma.landingSection.findFirst({
      where: { 
        siteSettingsId: settings.id,
        type: section.type 
      }
    });

    if (existing) {
      await prisma.landingSection.update({
        where: { id: existing.id },
        data: {
          title: section.title,
          subtitle: (section as any).subtitle || '',
          isActive: true,
          content: (section as any).html ? { html: (section as any).html, lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) } : (section as any).content
        }
      });
      console.log(`✅ Updated: ${section.type}`);
    } else {
      await prisma.landingSection.create({
        data: {
          siteSettingsId: settings.id,
          type: section.type,
          title: section.title,
          subtitle: (section as any).subtitle || '',
          isActive: true,
          order: 100, // Legal pages at the end
          content: (section as any).html ? { html: (section as any).html, lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) } : (section as any).content
        }
      });
      console.log(`➕ Created: ${section.type}`);
    }
  }

  console.log('✨ Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
