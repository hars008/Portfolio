/**
 * The "Currently" cell in the About bento. Kept out of profile.js because this
 * is the part most likely to go stale — it should be obvious where to edit it.
 */
const now = {
  label: 'Currently',
  items: [
    { k: 'Building', v: 'A 20+ service NestJS lending platform' },
    { k: 'Learning', v: 'Distributed systems and event sourcing' },
    { k: 'Open to', v: 'Backend and platform engineering roles' },
  ],
};

export default now;
