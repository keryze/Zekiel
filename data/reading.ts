/** Example shelf only: these entries do not claim personal reading history. */
export type Book = { title: string; author: string; topic: string; note: string; status: 'Example' | 'Reading' | 'Read' | 'Recommended' };
export const books: Book[] = [
  { status: 'Example', title: "Poor Charlie’s Almanack", author: 'Charlie Munger · edited by Peter D. Kaufman', topic: 'Judgment & mental models', note: 'A place to collect models that travel across disciplines.' },
  { status: 'Example', title: 'The Black Swan', author: 'Nassim Nicholas Taleb', topic: 'Uncertainty & risk', note: 'Thinking about the limits of prediction and the cost of fragile assumptions.' },
  { status: 'Example', title: 'Antifragile', author: 'Nassim Nicholas Taleb', topic: 'Systems & resilience', note: 'A prompt to distinguish surviving variation from benefiting from it.' },
  { status: 'Example', title: 'Thinking in Systems', author: 'Donella H. Meadows', topic: 'Systems thinking', note: 'Feedback loops, delays, and why local improvements can have unexpected effects.' },
];
