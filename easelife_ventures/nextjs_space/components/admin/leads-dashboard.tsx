'use client';

import { useCallback, useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';
import {
  Search,
  Filter,
  LogOut,
  Mail,
  Phone,
  MessageCircle,
  Paperclip,
  RefreshCw,
  Inbox,
  Loader2,
  Save,
  Clock,
} from 'lucide-react';
import { Logo } from '@/components/site/logo';
import { Button } from '@/components/ui/button';
import { serviceOptions } from '@/lib/services-data';
import { whatsappLink } from '@/lib/site-config';

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceCategory: string;
  serviceLabel: string;
  message: string;
  status: string;
  source: string | null;
  attachmentPath: string | null;
  attachmentName: string | null;
  adminNotes: string | null;
  createdAt: string;
};

const STATUSES = ['NEW', 'CONTACTED', 'QUOTED', 'PAID', 'DELIVERED'] as const;

const STATUS_STYLES: Record<string, string> = {
  NEW: 'bg-blue-100 text-blue-800 ring-blue-200',
  CONTACTED: 'bg-amber-100 text-amber-800 ring-amber-200',
  QUOTED: 'bg-purple-100 text-purple-800 ring-purple-200',
  PAID: 'bg-emerald-100 text-emerald-800 ring-emerald-200',
  DELIVERED: 'bg-navy/10 text-navy ring-navy/20',
};

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Africa/Lagos',
    }).format(new Date(iso));
  } catch {
    return '';
  }
}

export function LeadsDashboard({ adminName }: { adminName: string }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [statusCounts, setStatusCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [savingNotes, setSavingNotes] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState<Record<string, string>>({});

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set('status', statusFilter);
      if (categoryFilter && categoryFilter !== 'all') params.set('category', categoryFilter);
      if (search?.trim()) params.set('search', search.trim());

      const res = await fetch(`/api/leads?${params.toString()}`, { cache: 'no-store' });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.success) {
        setLeads(Array.isArray(data?.leads) ? data.leads : []);
        setStatusCounts(data?.statusCounts ?? {});
      } else if (res.status === 401) {
        toast.error('Session expired. Please sign in again.');
      } else {
        toast.error(data?.message ?? 'Could not load leads.');
      }
    } catch (err) {
      console.error('Fetch leads error:', err);
      toast.error('Could not load leads.');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, categoryFilter, search]);

  useEffect(() => {
    const t = setTimeout(fetchLeads, 300);
    return () => clearTimeout(t);
  }, [fetchLeads]);

  async function updateStatus(id: string, status: string) {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.success) {
        toast.success(`Marked as ${status}.`);
        fetchLeads();
      } else {
        toast.error(data?.message ?? 'Could not update status.');
      }
    } catch (err) {
      console.error('Update status error:', err);
      toast.error('Could not update status.');
    }
  }

  async function saveNotes(id: string) {
    setSavingNotes(id);
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminNotes: notesDraft?.[id] ?? '' }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.success) {
        toast.success('Notes saved.');
      } else {
        toast.error(data?.message ?? 'Could not save notes.');
      }
    } catch (err) {
      console.error('Save notes error:', err);
      toast.error('Could not save notes.');
    } finally {
      setSavingNotes(null);
    }
  }

  async function downloadAttachment(id: string, name: string) {
    try {
      const res = await fetch(`/api/leads/${id}`, { cache: 'no-store' });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.success && data?.url) {
        const a = document.createElement('a');
        a.href = data.url;
        a.download = name ?? 'attachment';
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        toast.error(data?.message ?? 'Could not open attachment.');
      }
    } catch (err) {
      console.error('Attachment error:', err);
      toast.error('Could not open attachment.');
    }
  }

  const totalLeads = STATUSES.reduce((sum, s) => sum + (statusCounts?.[s] ?? 0), 0);

  return (
    <div>
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-border bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Logo />
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:inline">
              Signed in as <strong className="text-navy">{adminName}</strong>
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="gap-2 border-navy/20 text-navy hover:bg-navy hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-navy sm:text-3xl">Leads Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {totalLeads} total {totalLeads === 1 ? 'lead' : 'leads'} · manage your enquiry pipeline.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchLeads}
            className="gap-2 border-navy/20 text-navy hover:bg-navy hover:text-white"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Stat cards */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {STATUSES.map((s) => {
            const active = statusFilter === s;
            return (
              <button
                key={s}
                type="button"
                onClick={() => setStatusFilter(active ? '' : s)}
                className={`rounded-xl bg-card p-4 text-left shadow-sm ring-1 transition-all hover:shadow-md ${
                  active ? 'ring-2 ring-navy' : 'ring-border'
                }`}
              >
                <span
                  className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ring-1 ${STATUS_STYLES?.[s] ?? ''}`}
                >
                  {s}
                </span>
                <p className="mt-2 font-display text-2xl font-bold text-navy">{statusCounts?.[s] ?? 0}</p>
              </button>
            );
          })}
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-col gap-3 rounded-xl bg-card p-4 shadow-sm ring-1 ring-border sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e?.target?.value ?? '')}
              placeholder="Search by name, email, phone or message…"
              className="w-full rounded-lg border border-input bg-background py-2.5 pl-11 pr-4 text-sm text-navy outline-none transition focus:border-navy focus:ring-2 focus:ring-navy/20"
            />
          </div>
          <div className="relative sm:w-64">
            <Filter className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e?.target?.value ?? 'all')}
              className="w-full cursor-pointer appearance-none rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-sm text-navy outline-none transition focus:border-navy focus:ring-2 focus:ring-navy/20"
            >
              <option value="all">All Services</option>
              {serviceOptions.map((o) => (
                <option key={o?.value} value={o?.value}>{o?.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Lead list */}
        <div className="mt-6 space-y-4">
          {loading ? (
            <div className="flex items-center justify-center rounded-xl bg-card py-16 shadow-sm ring-1 ring-border">
              <Loader2 className="h-6 w-6 animate-spin text-navy" />
            </div>
          ) : leads.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl bg-card py-16 text-center shadow-sm ring-1 ring-border">
              <Inbox className="h-10 w-10 text-muted-foreground" />
              <p className="mt-3 font-display text-lg font-bold text-navy">No leads found</p>
              <p className="mt-1 text-sm text-muted-foreground">Try adjusting your filters or search.</p>
            </div>
          ) : (
            leads.map((lead) => (
              <article key={lead?.id} className="rounded-xl bg-card p-5 shadow-sm ring-1 ring-border">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-lg font-bold text-navy">{lead?.name}</h3>
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ring-1 ${STATUS_STYLES?.[lead?.status] ?? ''}`}
                      >
                        {lead?.status}
                      </span>
                    </div>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gold">{lead?.serviceLabel}</p>
                  </div>
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground" suppressHydrationWarning>
                    <Clock className="h-3.5 w-3.5" />
                    {formatDate(lead?.createdAt)}
                  </p>
                </div>

                {/* Contact actions */}
                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href={`mailto:${lead?.email}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-navy transition hover:bg-navy hover:text-white"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span suppressHydrationWarning>{lead?.email}</span>
                  </a>
                  <a
                    href={`tel:${lead?.phone}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-navy transition hover:bg-navy hover:text-white"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span suppressHydrationWarning>{lead?.phone}</span>
                  </a>
                  <a
                    href={whatsappLink(`Hi ${lead?.name ?? ''}, thank you for contacting Ease Life Ventures regarding ${lead?.serviceLabel ?? 'your enquiry'}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#25D366]/10 px-3 py-1.5 text-xs font-medium text-[#128C4B] transition hover:bg-[#25D366] hover:text-white"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    WhatsApp
                  </a>
                  {lead?.attachmentName && (
                    <button
                      type="button"
                      onClick={() => downloadAttachment(lead.id, lead?.attachmentName ?? 'attachment')}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-gold/15 px-3 py-1.5 text-xs font-medium text-navy transition hover:bg-gold hover:text-gold-foreground"
                    >
                      <Paperclip className="h-3.5 w-3.5" />
                      {lead.attachmentName}
                    </button>
                  )}
                </div>

                {/* Message */}
                <p className="mt-3 whitespace-pre-line rounded-lg bg-secondary/60 p-3 text-sm leading-relaxed text-navy">
                  {lead?.message}
                </p>

                {/* Status + notes */}
                <div className="mt-4 grid gap-3 sm:grid-cols-[200px_1fr] sm:items-start">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-muted-foreground">Update status</label>
                    <select
                      value={lead?.status}
                      onChange={(e) => updateStatus(lead.id, e?.target?.value ?? 'NEW')}
                      className="w-full cursor-pointer rounded-lg border border-input bg-background py-2 px-3 text-sm font-semibold text-navy outline-none transition focus:border-navy focus:ring-2 focus:ring-navy/20"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-muted-foreground">Internal notes</label>
                    <div className="flex gap-2">
                      <textarea
                        rows={1}
                        defaultValue={lead?.adminNotes ?? ''}
                        onChange={(e) =>
                          setNotesDraft((prev) => ({ ...(prev ?? {}), [lead.id]: e?.target?.value ?? '' }))
                        }
                        placeholder="Add a private note…"
                        className="min-h-[40px] flex-1 resize-y rounded-lg border border-input bg-background py-2 px-3 text-sm text-navy outline-none transition focus:border-navy focus:ring-2 focus:ring-navy/20"
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        disabled={savingNotes === lead.id || !(lead.id in (notesDraft ?? {}))}
                        onClick={() => saveNotes(lead.id)}
                        className="shrink-0 gap-1.5 border-navy/20 text-navy hover:bg-navy hover:text-white"
                      >
                        {savingNotes === lead.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Save className="h-4 w-4" />
                        )}
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
