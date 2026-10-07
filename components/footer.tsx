import Link from 'next/link';
import { site } from '@/site.config';
import { OutwardArrow } from './icons';
export function Footer() {
  return <footer className="site-footer container"><div className="footer-top"><Link href="/" className="footer-brand">{site.alias}<span className="accent">.</span></Link><p>Build things. Understand systems.<br />Think long term.</p><nav aria-label="More pages"><Link href="/now">Now</Link><Link href="/reading">Reading</Link>{site.email && <a href={`mailto:${site.email}`}>Email</a>}<a href={site.github} target="_blank" rel="noreferrer">GitHub<OutwardArrow size={14} /></a>{site.social.map(s => <a key={s.url} href={s.url} target="_blank" rel="noreferrer">{s.label}<OutwardArrow size={14} /></a>)}</nav></div><div className="footer-bottom mono"><span>A PERSONAL GARDEN, ALWAYS IN PROGRESS.</span><span>BUILT WITH INTENT · {new Date().getUTCFullYear()}</span></div></footer>;
}
