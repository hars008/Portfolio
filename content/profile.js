/**
 * The résumé is served from Google Drive, so updating it never needs a
 * redeploy. To keep this link working when you change the file, replace it IN
 * PLACE: right-click the file in Drive → File information → Manage versions →
 * Upload new version. Uploading a fresh file instead gives it a new ID and
 * breaks every link to the old one. The file must stay shared as "Anyone with
 * the link".
 *
 * `uc?export=download` is Drive's direct-download form of the share link: the
 * browser downloads the PDF rather than opening the Drive viewer.
 */
const RESUME_DRIVE_ID = '1bVgUu1P8GKjGiVTII8TbEWZFa4a6ORb2';

const profile = {
  name: 'Harsh Bansal',
  role: 'Software Engineer III',
  company: 'LNVS Fintech',
  available: true,
  availabilityNote: 'Open to opportunities',

  // Reads in ~6 seconds. Leads with what he owns, not what he studied.
  headline:
    'I build the backend systems that move money — Node.js and NestJS microservices, secure auth, and the KYC and banking integrations behind 100,000+ loan applications a month.',

  bio: [
    'I am a Software Engineer with 3+ years building scalable backend systems for fintech and edtech. Today I architect a platform of 20+ NestJS microservices that replaced a legacy PHP loan stack, and I own those services end to end — system design, API contracts, third-party integrations, and production reliability.',
    'Most of my work lives where correctness matters: role-based access control across 25+ roles, event-driven job processing on Redis and BullMQ with retries and distributed locking, and identity verification built on face match, video KYC, and liveness detection. I have enough full-stack depth in React and TypeScript to ship the surfaces those services feed.',
  ],

  email: 'off.harsh07@gmail.com',
  phone: '+91 79769 51150',
  location: 'India',
  timezone: 'IST · UTC+5:30',

  siteUrl: 'https://harsh-bansal.netlify.app',
  resumeUrl: `https://drive.google.com/uc?export=download&id=${RESUME_DRIVE_ID}`,

  socials: [
    { name: 'GitHub', handle: 'hars008', link: 'https://github.com/hars008' },
    { name: 'LinkedIn', handle: 'harsh-bansal--', link: 'https://www.linkedin.com/in/harsh-bansal--/' },
    { name: 'LeetCode', handle: 'harshbansal699', link: 'https://leetcode.com/harshbansal699/' },
    { name: 'CodeChef', handle: 'hars99', link: 'https://www.codechef.com/users/hars99' },
    { name: 'Codeforces', handle: 'hars699', link: 'https://codeforces.com/profile/hars699' },
  ],
};

export default profile;
