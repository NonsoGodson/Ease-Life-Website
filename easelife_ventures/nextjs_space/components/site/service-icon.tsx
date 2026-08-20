import {
  GraduationCap,
  FileText,
  Briefcase,
  Palette,
  Globe,
  Laptop,
  type LucideIcon,
} from 'lucide-react';

const map: Record<string, LucideIcon> = {
  GraduationCap,
  FileText,
  Briefcase,
  Palette,
  Globe,
  Laptop,
};

export function ServiceIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = map[name] ?? Briefcase;
  return <Icon className={className} aria-hidden="true" />;
}
