'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import {
  User,
  Mail,
  Phone,
  Briefcase,
  MessageSquare,
  Paperclip,
  Send,
  Loader2,
  X,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { serviceOptions } from '@/lib/services-data';

type FormState = {
  name: string;
  email: string;
  phone: string;
  serviceCategory: string;
  message: string;
};

const MAX_FILE_MB = 15;

export function ContactForm() {
  const searchParams = useSearchParams();
  const preselect = searchParams?.get('service') ?? '';

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    serviceCategory: 'general',
    message: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!preselect) return;
    const valid = serviceOptions.some((o) => o?.value === preselect);
    if (valid) {
      setForm((prev) => ({ ...prev, serviceCategory: preselect }));
    }
  }, [preselect]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...(prev ?? {}), [key]: value }));
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = e?.target?.files?.[0] ?? null;
    if (!picked) {
      setFile(null);
      return;
    }
    const sizeMb = (picked?.size ?? 0) / (1024 * 1024);
    if (sizeMb > MAX_FILE_MB) {
      toast.error(`File is too large. Please keep attachments under ${MAX_FILE_MB} MB.`);
      e.target.value = '';
      return;
    }
    setFile(picked);
  }

  async function uploadAttachment(selected: File): Promise<{ path: string | null; name: string | null }> {
    try {
      const presignRes = await fetch('/api/upload/presigned', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: selected?.name ?? 'attachment',
          contentType: selected?.type || 'application/octet-stream',
        }),
      });
      const presign = await presignRes.json().catch(() => ({}));
      if (!presign?.success || !presign?.uploadUrl) {
        throw new Error(presign?.message ?? 'Upload preparation failed');
      }
      const putRes = await fetch(presign.uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': selected?.type || 'application/octet-stream' },
        body: selected,
      });
      if (!putRes.ok) throw new Error('File upload failed');
      return { path: presign.cloud_storage_path ?? null, name: selected?.name ?? null };
    } catch (err) {
      console.error('Attachment upload error:', err);
      throw err;
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e?.preventDefault?.();
    if (submitting) return;

    if (!form?.name || !form?.email || !form?.phone || !form?.message) {
      toast.error('Please fill in your name, email, phone and message.');
      return;
    }

    setSubmitting(true);
    try {
      let attachmentPath: string | null = null;
      let attachmentName: string | null = null;

      if (file) {
        toast.loading('Uploading your file…', { id: 'upload' });
        try {
          const uploaded = await uploadAttachment(file);
          attachmentPath = uploaded?.path ?? null;
          attachmentName = uploaded?.name ?? null;
          toast.dismiss('upload');
        } catch {
          toast.dismiss('upload');
          toast.error('We could not upload your file, but we will still submit your message.');
        }
      }

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form?.name,
          email: form?.email,
          phone: form?.phone,
          serviceCategory: form?.serviceCategory ?? 'general',
          message: form?.message,
          attachmentPath,
          attachmentName,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data?.success) {
        setDone(true);
        toast.success(data?.message ?? 'Thank you — we will respond within 24 hours.');
        setForm({ name: '', email: '', phone: '', serviceCategory: 'general', message: '' });
        setFile(null);
      } else {
        toast.error(data?.message ?? 'Could not submit your enquiry. Please try again.');
      }
    } catch (err) {
      console.error('Submit error:', err);
      toast.error('Something went wrong. Please try again or reach us on WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl bg-card p-10 text-center shadow-sm ring-1 ring-border">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/15">
          <ShieldCheck className="h-8 w-8 text-gold" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-bold text-navy">Message received!</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          Thank you for reaching out to Ease Life Ventures. Our team will get back to you within
          <strong className="text-navy"> 24 hours</strong>. Check your inbox for a confirmation email.
        </p>
        <Button
          className="mt-6 bg-navy text-white hover:bg-navy/90"
          onClick={() => setDone(false)}
        >
          Send another message
        </Button>
      </div>
    );
  }

  const inputBase =
    'w-full rounded-lg border border-input bg-background py-3 pl-11 pr-4 text-sm text-navy shadow-sm outline-none transition focus:border-navy focus:ring-2 focus:ring-navy/20 placeholder:text-muted-foreground';

  return (
    <form onSubmit={onSubmit} className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Name */}
        <div className="sm:col-span-1">
          <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-navy">Full Name *</label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              id="name"
              type="text"
              value={form?.name ?? ''}
              onChange={(e) => update('name', e?.target?.value ?? '')}
              placeholder="e.g. Chidi Okafor"
              className={inputBase}
              required
            />
          </div>
        </div>

        {/* Phone */}
        <div className="sm:col-span-1">
          <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-navy">Phone / WhatsApp *</label>
          <div className="relative">
            <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              id="phone"
              type="tel"
              value={form?.phone ?? ''}
              onChange={(e) => update('phone', e?.target?.value ?? '')}
              placeholder="e.g. 0803 000 0000"
              className={inputBase}
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="sm:col-span-1">
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-navy">Email Address *</label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              id="email"
              type="email"
              value={form?.email ?? ''}
              onChange={(e) => update('email', e?.target?.value ?? '')}
              placeholder="you@example.com"
              className={inputBase}
              required
            />
          </div>
        </div>

        {/* Service */}
        <div className="sm:col-span-1">
          <label htmlFor="service" className="mb-1.5 block text-sm font-semibold text-navy">Service Needed</label>
          <div className="relative">
            <Briefcase className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <select
              id="service"
              value={form?.serviceCategory ?? 'general'}
              onChange={(e) => update('serviceCategory', e?.target?.value ?? 'general')}
              className={`${inputBase} appearance-none cursor-pointer`}
            >
              <option value="general">General Enquiry</option>
              {serviceOptions.map((o) => (
                <option key={o?.value} value={o?.value}>{o?.fullTitle}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-navy">Your Message *</label>
          <div className="relative">
            <MessageSquare className="pointer-events-none absolute left-3.5 top-4 h-5 w-5 text-muted-foreground" />
            <textarea
              id="message"
              rows={5}
              value={form?.message ?? ''}
              onChange={(e) => update('message', e?.target?.value ?? '')}
              placeholder="Tell us about your project, timeline and any details that help us quote accurately."
              className={`${inputBase} resize-y pt-3`}
              required
            />
          </div>
        </div>

        {/* Attachment */}
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-semibold text-navy">
            Attachment <span className="font-normal text-muted-foreground">(optional — brief, sample, or reference, max {MAX_FILE_MB}MB)</span>
          </label>
          {file ? (
            <div className="flex items-center justify-between rounded-lg bg-secondary px-4 py-3">
              <span className="flex items-center gap-2 truncate text-sm text-navy">
                <Paperclip className="h-4 w-4 shrink-0 text-gold" />
                <span className="truncate">{file?.name}</span>
              </span>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="ml-3 rounded-full p-1 text-muted-foreground hover:bg-navy/10 hover:text-navy"
                aria-label="Remove attachment"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-input bg-background px-4 py-3 text-sm text-muted-foreground transition hover:border-navy hover:text-navy">
              <Paperclip className="h-5 w-5" />
              Click to attach a file
              <input type="file" className="hidden" onChange={onFileChange} />
            </label>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-gold" />
          Your details are kept 100% confidential.
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={submitting}
          className="w-full gap-2 bg-gold text-gold-foreground hover:bg-gold/90 sm:w-auto"
        >
          {submitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              Send Message
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
