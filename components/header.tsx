'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { site } from '@/site.config';
import { SearchDialog } from './search';
import type { SearchItem } from '@/types/content';
export function Header({ searchItems }: { searchItems: SearchItem[] }) {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);
  return <header className="site-header"><div className="container header-inner">
    <Link href="/" className="wordmark" aria-label={`z. ${site.alias} / Personal Lab — home`}><span className="brand-mark" aria-hidden="true">z.</span>{site.alias}<span className="wordmark-suffix mono"> / PERSONAL LAB</span></Link>
    <div className="header-actions"><nav id="main-navigation" className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">{site.navigation.map(link => <Link key={link.href} href={link.href} aria-current={path.startsWith(link.href) ? 'page' : undefined} onClick={() => setOpen(false)}>{link.label}</Link>)}</nav><SearchDialog items={searchItems} /><button className="menu-toggle" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button></div>
  </div></header>;
}
