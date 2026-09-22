/**
 * `key` exists because the label was doing duty as the React key, and it is a
 * whole sentence. `emphasis` picks the single number that renders in the
 * gradient rather than flat accent — exactly one, or it stops being emphasis.
 */
export const stats = [
  { key: 'yrs', value: '3+', unit: 'yrs', label: 'Building production backends' },
  { key: 'services', value: '20+', unit: '', label: 'Microservices architected', emphasis: true },
  { key: 'volume', value: '100k+', unit: '/mo', label: 'Loan applications processed' },
  { key: 'apis', value: '30+', unit: '', label: 'Third-party APIs integrated' },
];

export const achievements = [
  {
    title: 'Led the FusionIIIT backend team',
    detail: 'Headed a 7-member backend team on the institute-wide ERP platform serving IIIT Jabalpur.',
  },
  {
    title: 'Global rank 231 — CodeChef Starters 152',
    detail: 'Division 3.',
  },
  {
    title: 'Global rank 3130 — Codeforces Round 882',
    detail: 'Division 2.',
  },
  {
    title: '500+ problems solved',
    detail: 'LeetCode 1657 · CodeChef 1636.',
  },
];

export default stats;
