import { ShieldCheck, Clock, Award, Target, Headphones } from 'lucide-react';

const badges = [
  { label: '100% Confidential', Icon: ShieldCheck },
  { label: 'Timely Delivery', Icon: Clock },
  { label: 'Quality Guaranteed', Icon: Award },
  { label: 'Tailored to Your Needs', Icon: Target },
  { label: 'Professional & Reliable Support', Icon: Headphones },
];

export function TrustBadgeStrip() {
  return (
    <div className="border-y border-border bg-white">
      <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 py-4 sm:px-6 lg:px-8">
        {badges.map(({ label, Icon }) => (
          <div key={label} className="flex items-center gap-2 text-sm font-medium text-navy">
            <Icon className="h-4 w-4 text-gold" />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
