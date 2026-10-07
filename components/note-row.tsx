import Link from 'next/link';
import type { Note } from '@/types/content';
import { formatDate } from '@/lib/utils';
import { OutwardArrow } from './icons';
export function NoteRow({ note }: { note: Note }) {
  return (
    <Link href={note.href} className="note-row">
      <div className="note-row-meta mono">
        <span>{note.category}</span>
        <span>{note.readingMinutes} MIN READ</span>
      </div>
      <div className="note-row-main">
        <h2>{note.title}</h2>
        <OutwardArrow />
        <p>{note.description}</p>
      </div>
      <div className="note-row-foot mono">
        <time dateTime={note.date}>{formatDate(note.date)}</time>
        {note.sample && <span className="sample-tag">SAMPLE</span>}
      </div>
    </Link>
  );
}
