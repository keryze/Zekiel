import type { Metadata } from 'next';
import { PageIntro, SampleNotice } from '@/components/page-intro';
import { books } from '@/data/reading';
import { pageMetadata } from '@/lib/metadata';
export const metadata: Metadata = pageMetadata(
  'Reading',
  'A simple shelf for books about judgment, uncertainty, resilience, and systems.',
  '/reading',
);
export default function Reading() {
  return (
    <div className="container page">
      <PageIntro
        eyebrow="THE READING SHELF"
        title="A wider lens."
        description="Books as tools for thinking. A small shelf for ideas that connect graphics, systems, and life beyond the screen."
        aside="FEWER BOOKS. DEEPER NOTES."
      />
      <SampleNotice>
        Entries labeled EXAMPLE SHELF are placeholders based on your interests, not claims of
        personal reading history.
      </SampleNotice>
      <div className="reading-list">
        {books.map((book, i) => (
          <article key={book.title} className="book-row">
            <div className="book-spine" aria-hidden="true">
              <span className="mono">0{i + 1}</span>
              <span>{book.title}</span>
            </div>
            <div className="book-info">
              <p className="eyebrow mono">{book.topic}</p>
              <h2>{book.title}</h2>
              <p className="book-author">{book.author}</p>
              <p>{book.note}</p>
            </div>
            <span className="sample-tag mono">
              {book.status === 'Example' ? 'EXAMPLE SHELF' : book.status.toUpperCase()}
            </span>
          </article>
        ))}
      </div>
      <div className="reading-note">
        <p className="mono">A NOTE ON NOTES</p>
        <p>
          Keep the idea that changed your thinking, the question it raised, and where it connects to
          something else. A useful shelf is more than a completion count.
        </p>
      </div>
    </div>
  );
}
