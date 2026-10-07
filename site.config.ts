/** The only place to edit personal details. No real-world identity is assumed. */
export const site = {
  name: 'YOUR_NAME',
  alias: 'Zekiel', // An editable alias based on the repository name.
  title: 'Technical Artist & Creative Technologist',
  description:
    'A personal garden of procedural worlds, real-time graphics, AI experiments, and long-term thinking.',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com').replace(/\/$/, ''),
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  github: 'https://github.com/keryze/Zekiel',
  email: '', // Leave empty until you want to share it publicly.
  location: '',
  social: [] as { label: string; url: string }[],
  navigation: [
    { label: 'Work', href: '/work' },
    { label: 'Lab', href: '/lab' },
    { label: 'Notes', href: '/notes' },
    { label: 'About', href: '/about' },
  ],
};
