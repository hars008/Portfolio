/**
 * Eyebrow, heading and intro for every section. These were hardcoded strings
 * inside each sections/*.jsx file, which quietly broke the rule the README
 * states: all copy is data, so updating the site means editing content/ only.
 * Renumbering the site is now a matter of editing `number` here.
 */
const sections = {
  about: {
    number: '01',
    label: 'About',
    title: 'Backend first, full-stack when it helps',
  },
  experience: {
    number: '02',
    label: 'Experience',
    title: "Where I've shipped",
    intro: 'Three years across fintech and edtech, owning services end to end.',
  },
  skills: {
    number: '03',
    label: 'Stack',
    title: 'What I work with',
    intro:
      'Grouped by where it sits in the system, not by how well I know it — proficiency bars tell you nothing.',
  },
  projects: {
    number: '04',
    label: 'Selected work',
    title: "Things I've built",
    intro:
      'Three projects worth more than a screenshot — what the problem was, how it was solved, and what came out.',
  },
  archive: {
    number: '05',
    label: 'Archive',
    title: "More things I've made",
    intro:
      'Coursework, hackathons, and side projects. Anything marked Live is deployed and playable.',
  },
  achievements: {
    number: '06',
    label: 'Beyond the job',
    title: 'Achievements',
  },
  contact: {
    number: '07',
    label: 'Contact',
    title: 'Get in touch',
    intro:
      'Open to backend and full-stack roles, and happy to talk through an interesting system design problem.',
  },
};

export default sections;
