/**
 * The boot sequence shown once per session on the home page (and on demand
 * via the reboot buttons). Keep it to four or five short lines — the whole
 * intro is timed to finish in ~2.4 seconds, and every line shares that
 * budget (see components/Intro.jsx).
 *
 * `hud` is the four corner readouts. Purely decorative, so keep them short.
 */
const intro = {
  title: 'harsh.dev',
  lines: [
    { label: 'loading services', value: '20+' },
    { label: 'connecting gateway', value: 'OK' },
    { label: 'warming redis cache', value: 'OK' },
    { label: 'verifying identity', value: 'OK' },
  ],
  hud: {
    topLeft: 'harsh.dev // v2.0',
    topRight: 'SYS.BOOT',
    bottomLeft: 'node · nestjs · ts',
    bottomRight: 'IST · UTC+5:30',
  },
};

export default intro;
