import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { LeadsDashboard } from '@/components/admin/leads-dashboard';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Leads Dashboard',
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  const name = session?.user?.name ?? 'Administrator';
  return <LeadsDashboard adminName={name} />;
}
