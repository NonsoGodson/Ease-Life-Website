'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { Lock, Mail, LogIn, Loader2, ShieldCheck } from 'lucide-react';
import { Logo } from '@/components/site/logo';
import { Button } from '@/components/ui/button';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl') ?? '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e?.preventDefault?.();
    if (loading) return;
    if (!email || !password) {
      toast.error('Please enter your email and password.');
      return;
    }
    setLoading(true);
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      if (res?.ok) {
        toast.success('Welcome back!');
        router.replace(callbackUrl);
      } else {
        toast.error('Invalid email or password.');
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const inputBase =
    'w-full rounded-lg border border-input bg-background py-3 pl-11 pr-4 text-sm text-navy shadow-sm outline-none transition focus:border-navy focus:ring-2 focus:ring-navy/20 placeholder:text-muted-foreground';

  return (
    <div className="navy-gradient flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="rounded-xl bg-white px-5 py-4 shadow-lg">
            <Logo />
          </div>
        </div>
        <div className="rounded-2xl bg-card p-8 shadow-xl">
          <div className="mb-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-navy/5">
              <ShieldCheck className="h-6 w-6 text-gold" />
            </div>
            <h1 className="mt-4 font-display text-2xl font-bold text-navy">Team Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">Sign in to manage enquiries and leads.</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-navy">Email</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e?.target?.value ?? '')}
                  placeholder="you@easelifeventures.com"
                  className={inputBase}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-navy">Password</label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e?.target?.value ?? '')}
                  placeholder="••••••••"
                  className={inputBase}
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full gap-2 bg-navy text-white hover:bg-navy/90"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  Sign In
                </>
              )}
            </Button>
          </form>
        </div>
        <p className="mt-6 text-center text-xs text-white/60">
          Authorised personnel only. This area is monitored.
        </p>
      </div>
    </div>
  );
}
