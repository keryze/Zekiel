import { ArrowUpRight, ArrowRight } from 'lucide-react';
export function OutwardArrow({ size = 18 }: { size?: number }) {
  return <ArrowUpRight size={size} strokeWidth={1.5} aria-hidden="true" />;
}
export function ForwardArrow({ size = 18 }: { size?: number }) {
  return <ArrowRight size={size} strokeWidth={1.5} aria-hidden="true" />;
}
