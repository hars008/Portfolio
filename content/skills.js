/**
 * `items` stays a plain string array — scannable and diff-friendly.
 *
 * Order matters: the section renders these groups as layers of one system,
 * top to bottom, and tints each one along the cyan-to-indigo accent ramp in
 * that order. Reorder them and the colours follow.
 *
 * Glyphs are matched by the exact strings below — see components/skillIcons.js.
 * An unregistered name still renders, with a neutral fallback glyph.
 */
const skills = [
  {
    group: 'Languages',
    note: 'TypeScript unless something else is already there.',
    items: ['TypeScript', 'JavaScript', 'C', 'C++', 'Python', 'PHP', 'SQL'],
  },
  {
    group: 'Backend',
    note: 'Where most of the week goes. NestJS and Redis are the default answer.',
    items: [
      'Node.js',
      'NestJS',
      'Express.js',
      'Django',
      'REST APIs',
      'Microservices',
      'Redis',
      'BullMQ',
      'WebSockets',
      'JWT',
      'RBAC',
    ],
  },
  {
    group: 'Frontend',
    note: 'Enough depth to ship the surfaces my services feed.',
    items: ['React.js', 'Next.js', 'Redux', 'Redux-Saga', 'Preact', 'Tailwind CSS', 'SCSS', 'Bootstrap'],
  },
  {
    group: 'Databases & Cloud',
    note: 'Mongo for documents, MySQL when the data has shape.',
    items: ['MongoDB', 'MySQL', 'Redis', 'AWS EC2', 'AWS Lambda', 'AWS Rekognition'],
  },
  {
    group: 'Tools & Practices',
    note: 'The habits that survive code review.',
    items: ['Git', 'Linux', 'Puppeteer', 'Playwright', 'Figma', 'System Design', 'Design Patterns'],
  },
];

export default skills;
