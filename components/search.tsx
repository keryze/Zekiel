'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Search, X, ArrowUpRight } from 'lucide-react';
import type { SearchItem } from '@/types/content';
export function SearchDialog({ items }: { items: SearchItem[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  function open() {
    dialog.current?.showModal();
    input.current?.focus();
  }
  function close() {
    dialog.current?.close();
    setQuery('');
  }
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape' && dialog.current?.open) {
        event.preventDefault();
        dialog.current.close();
        setQuery('');
        return;
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (dialog.current?.open) {
          dialog.current.close();
          setQuery('');
        } else {
          dialog.current?.showModal();
          input.current?.focus();
        }
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  const needle = query.trim().toLowerCase();
  const results = items
    .filter((item) =>
      `${item.title} ${item.description} ${item.kind}`.toLowerCase().includes(needle),
    )
    .slice(0, 12);
  return (
    <>
      <button className="search-trigger" onClick={open} aria-label="Search the site">
        <Search size={17} aria-hidden="true" />
        <kbd>⌘ K</kbd>
      </button>
      <dialog
        ref={dialog}
        className="search-dialog"
        aria-labelledby="search-title"
        onCancel={() => setQuery('')}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="search-panel">
          <div className="search-top">
            <Search size={20} aria-hidden="true" />
            <label id="search-title" className="sr-only" htmlFor="site-search">
              Search projects, notes, and pages
            </label>
            <input
              ref={input}
              id="site-search"
              type="search"
              placeholder="Find a project, idea, or note…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              autoComplete="off"
            />
            <button onClick={close} aria-label="Close search">
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          <p className="search-caption mono" role="status">
            {needle ? `${results.length} matching results` : 'EXPLORE THE GARDEN'}
          </p>
          <div className="search-results">
            {results.length ? (
              results.map((item) => (
                <Link key={item.href} href={item.href} onClick={close} className="search-result">
                  <div>
                    <span className="mono search-kind">{item.kind}</span>
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                  </div>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              ))
            ) : (
              <p className="empty-result">No results. Try “Houdini”, “AI”, or “snow”.</p>
            )}
          </div>
          <div className="search-bottom mono">
            TAB TO NAVIGATE <span>ESC TO CLOSE</span>
          </div>
        </div>
      </dialog>
    </>
  );
}
