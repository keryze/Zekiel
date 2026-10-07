'use client';
import { useState, type ReactNode } from 'react';
type FilterItem = { id: string; category: string; content: ReactNode };
export function FilterCollection({ items, categories, className = '', label }: { items: FilterItem[]; categories: string[]; className?: string; label: string }) {
  const [selected, setSelected] = useState('All');
  const visible = items.filter(item => selected === 'All' || item.category === selected);
  return <><div className="filter-bar" role="group" aria-label={label}>{['All', ...categories].map(category => <button key={category} onClick={() => setSelected(category)} aria-pressed={selected === category}>{category}<span className="mono">{category === 'All' ? items.length : items.filter(item => item.category === category).length}</span></button>)}</div><p className="sr-only" role="status">Showing {visible.length} items in {selected}.</p><div className={className}>{visible.map(item => <div key={item.id}>{item.content}</div>)}</div></>;
}
