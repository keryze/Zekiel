export type ProjectCategory = 'Unreal Engine' | 'Houdini' | 'AI / Coding';
export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  description: string;
  stack: string[];
  image: string;
  imageAlt: string;
  status: 'Sample' | 'Published' | 'In progress';
  imageCaption?: string;
  summary: string;
  sections: { title: string; text: string }[];
};
export type Note = {
  slug: string;
  category: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  sample: boolean;
  readingMinutes: number;
  source: string;
  href: string;
};
export type SearchItem = { title: string; description: string; href: string; kind: string };
