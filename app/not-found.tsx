import Link from 'next/link';
import { ForwardArrow } from '@/components/icons';
export default function NotFound() {
  return <div className="container not-found"><p className="eyebrow mono">404 / UNMAPPED TERRITORY</p><h1>Nothing grows here.<br />Yet.</h1><p>This page may have moved, or the path may be mistyped.</p><Link href="/" className="text-link">Back to the garden <ForwardArrow /></Link></div>;
}
