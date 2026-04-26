const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding OmniScale demo data...');

  // 1. Create Demo Locations
  const nyc = await prisma.location.create({
    data: {
      name: 'New York Hub',
      region: 'North',
      metadata: { lat: 40.7128, lng: -74.0060, timezone: 'EST' },
    },
  });

  const lax = await prisma.location.create({
    data: {
      name: 'Los Angeles Center',
      region: 'West',
      metadata: { lat: 34.0522, lng: -118.2437, timezone: 'PST' },
    },
  });

  // 2. Create Data Sources
  const stripeSource = await prisma.dataSource.create({
    data: {
      name: 'Stripe Production',
      type: 'API',
      status: 'active',
      connectionConfig: { endpoint: 'api.stripe.com/v1', version: '2024-04' },
      recordCount: 12500,
    },
  });

  // 3. Create Workflow Template
  await prisma.workflow.create({
    data: {
      name: 'Employee Onboarding',
      description: 'Standard automation for hardware provisioning.',
      status: 'ACTIVE',
      nodes: {
        create: [
          { type: 'TRIGGER', label: 'New Hire Created', positionX: 100, positionY: 100, config: {} },
          { type: 'AI_STEP', label: 'Provision Hardware', positionX: 100, positionY: 250, config: { type: 'macbook_pro' } },
        ]
      }
    },
  });

  // 4. Create Domain Opportunities
  await prisma.domainOpportunity.createMany({
    data: [
      { domain: 'omni-ai.io', tld: 'io', estimatedValue: 15000, category: 'Tech', trendScore: 94, availabilityStatus: 'AVAILABLE' },
      { domain: 'green-ops.com', tld: 'com', estimatedValue: 4500, category: 'ESG', trendScore: 82, availabilityStatus: 'AUCTION' },
    ],
  });

  // 5. Create Audience Segments
  await prisma.audienceSegment.create({
    data: {
      name: 'Independent Ceramicists',
      category: 'NON_MEDIA',
      estimatedSize: 125000,
      growthRate: 14.5,
      monetizationPotential: 88,
      demographics: { age: '25-45', income: '$75k+' },
      psychographics: { values: ['Tactile', 'Sustainable'], painPoints: ['Shipping costs'] },
      consumptionPatterns: { topBrands: ['Etsy', 'Adobe'] },
      platformPresence: { instagram: 85, tiktok: 62 },
    },
  });

  // 6. Create Tracked Software
  const nextjs = await prisma.trackedSoftware.create({
    data: {
      name: 'Next.js',
      vendor: 'Vercel',
      category: 'Framework',
      currentVersion: '14.2.4',
    },
  });

  await prisma.versionEntry.create({
    data: {
      softwareId: nextjs.id,
      version: '14.2.4',
      releaseDate: new Date(),
      releaseType: 'PATCH',
      breakingChanges: false,
      changelogSummary: 'Security patch and performance fixes.',
    },
  });

  console.log('✅ Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });