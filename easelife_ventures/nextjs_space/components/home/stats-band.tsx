import { CountUp } from '@/components/site/count-up';
import { trustStats } from '@/lib/testimonials';
import { FadeIn } from '@/components/ui/animate';

export function StatsBand() {
  return (
    <section className="navy-gradient py-14">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {trustStats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-4xl font-bold text-gold sm:text-5xl">
                  <CountUp end={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-sm font-medium text-white/80">{s.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
