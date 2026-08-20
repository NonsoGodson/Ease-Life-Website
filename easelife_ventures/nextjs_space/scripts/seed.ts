import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Mandatory hidden admin/test account.
  const adminEmail = 'abacus-0f61a124@example.com';
  const adminPassword = 'gdW87mOC*C';
  const hashed = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { password: hashed, role: 'admin', name: 'Administrator' },
    create: {
      email: adminEmail,
      password: hashed,
      role: 'admin',
      name: 'Administrator',
    },
  });

  // Business owner's admin account (surfaced to the user).
  const ownerEmail = 'easelifeventures@gmail.com';
  const ownerPassword = 'EaseLife@2026';
  const ownerHashed = await bcrypt.hash(ownerPassword, 10);
  await prisma.user.upsert({
    where: { email: ownerEmail },
    update: { role: 'admin', name: 'Ease Life Ventures' },
    create: {
      email: ownerEmail,
      password: ownerHashed,
      role: 'admin',
      name: 'Ease Life Ventures',
    },
  });

  // A couple of sample leads so the admin dashboard is not empty on first view.
  const sampleLeads = [
    {
      id: 'seed-lead-1',
      name: 'Chidinma Eze',
      email: 'chidinma.sample@example.com',
      phone: '08030000001',
      serviceCategory: 'business-documents',
      serviceLabel: 'Business & Strategy Documents',
      message:
        'I need a bankable business plan for a poultry farm to apply for a bank loan. Please advise on turnaround and cost.',
      status: 'NEW' as const,
      source: 'Contact Form',
    },
    {
      id: 'seed-lead-2',
      name: 'Tunde Balogun',
      email: 'tunde.sample@example.com',
      phone: '08030000002',
      serviceCategory: 'cv-career',
      serviceLabel: 'CV, Cover Letter & Career Documents',
      message:
        'Looking for an ATS-friendly CV and a tailored cover letter for a banking role.',
      status: 'CONTACTED' as const,
      source: 'Contact Form',
    },
    {
      id: 'seed-lead-3',
      name: 'Grace Umeh',
      email: 'grace.sample@example.com',
      phone: '08030000003',
      serviceCategory: 'web-digital',
      serviceLabel: 'Digital Solutions',
      message:
        'We want an SEO website with CRM automation for our NGO. Can we book a consultation?',
      status: 'QUOTED' as const,
      source: 'Contact Form',
    },
  ];

  for (const lead of sampleLeads) {
    await prisma.lead.upsert({
      where: { id: lead.id },
      update: {},
      create: lead,
    });
  }

  console.log('Seed complete: admin account and sample leads ready.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
