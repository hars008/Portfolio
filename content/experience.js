/**
 * Timeline note: the résumé compresses the Surya Loan and LNVS Fintech tenures
 * into a single "LNVS Fintech | 08/2025 – Present" header. They are rendered
 * here as one company group with two role rows so the internal transfer and
 * promotion are both visible, with the achievements attached to the combined
 * tenure rather than split by guesswork.
 */
const experience = [
  {
    id: 'lnvs',
    company: 'LNVS Fintech',
    meta: 'Lending platform · internal transfer from Raghvi Finance (Surya Loan)',
    roles: [
      {
        title: 'Software Engineer III',
        period: 'Jul 2026 — Present',
        current: true,
      },
      {
        title: 'Software Engineer · Raghvi Finance (Surya Loan)',
        period: 'Aug 2025 — Jun 2026',
        current: false,
      },
    ],
    bullets: [
      'Architected a Node.js (NestJS) platform of 20+ microservices, migrating legacy PHP loan workflows into independently deployable services now processing 100,000+ loan applications per month.',
      'Implemented a secure User Management Service with authentication, role-based access control, and session management via guards, interceptors, and middleware, securing endpoints across 25+ roles.',
      'Designed the Lead and Common services powering end-to-end loan processing, integrating 30+ third-party APIs for KYC verification, bank statement analysis, and SMS delivery.',
      'Automated background processing with Redis and BullMQ using job queues, retries with backoff, and distributed locking.',
      'Shipped identity verification covering face match, video KYC, liveness detection, and geolocation checks via AWS Rekognition and Google Maps APIs, cutting KYC turnaround by 50%.',
      'Developed the frontend architecture in React and Redux-Saga, delivering reusable components that reduced feature integration time by 40%.',
    ],
    stack: ['NestJS', 'Node.js', 'TypeScript', 'Redis', 'BullMQ', 'MongoDB', 'MySQL', 'AWS Rekognition', 'React', 'Redux-Saga'],
  },
  {
    id: 'cerebry',
    company: 'Cerebry',
    meta: 'Adaptive learning platform',
    roles: [
      {
        title: 'Software Engineer',
        period: 'Jul 2023 — Aug 2025',
        current: false,
      },
    ],
    bullets: [
      'Created 25+ interactive question types — audio input, drag & drop, algebraic entry — using Preact, JavaScript, Node.js, and SCSS, expanding the adaptive practice experience for students.',
      'Deployed a Node.js microservice on AWS EC2 and Lambda that renders Markdown and converts HTML to images with Playwright, serving a million renders per day.',
      'Integrated 50+ frontend components with backend APIs using React, Redux, and Axios, resolving production UI/UX defects that improved page load times by 15%.',
    ],
    stack: ['Preact', 'React', 'Redux', 'Node.js', 'Playwright', 'AWS EC2', 'AWS Lambda', 'SCSS'],
  },
];

export default experience;
