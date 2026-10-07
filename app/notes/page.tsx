import type { Metadata } from 'next';
import { PageIntro, SampleNotice } from '@/components/page-intro';
import { FilterCollection } from '@/components/filter-collection';
import { NoteRow } from '@/components/note-row';
import { getNotes } from '@/lib/notes';
import { pageMetadata } from '@/lib/metadata';
export const metadata: Metadata = pageMetadata(
  'Notes',
  'A digital garden of graphics research, procedural thinking, AI workflows, and long-term ideas.',
  '/notes',
);
export default function Notes() {
  const notes = getNotes();
  return (
    <div className="container page">
      <PageIntro
        eyebrow="03 / THE DIGITAL GARDEN"
        title="Thinking, in public."
        description="Technical notes, research trails, and ideas that are still growing. Understanding a system usually begins with a better question."
        aside="NOT EVERYTHING IS A CONCLUSION"
      />
      <FilterCollection
        label="Filter notes by topic"
        categories={[...new Set(notes.map((n) => n.category))]}
        className="notes-list"
        items={notes.map((note) => ({
          id: note.href,
          category: note.category,
          content: <NoteRow note={note} />,
        }))}
      />
      <SampleNotice>
        Notes marked SAMPLE are demonstration content. Add your own MDX files to grow this garden.
      </SampleNotice>
    </div>
  );
}
