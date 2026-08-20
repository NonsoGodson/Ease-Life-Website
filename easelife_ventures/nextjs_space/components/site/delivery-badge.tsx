import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export function DeliveryBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-xs font-bold text-gold-foreground shadow-sm',
        className
      )}
    >
      <Clock className="h-3.5 w-3.5" />
      24-Hour Delivery After Payment
    </span>
  );
}
