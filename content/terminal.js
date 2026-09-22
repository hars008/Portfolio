/**
 * Hero terminal content. There is no photo on this site, so the hero's visual
 * is text — which also means it reflows on mobile for free and costs no image
 * weight. Keep it to 9 lines or fewer: the card must not outgrow the text
 * column beside it, and every line costs 0.28s of type-on before the caret.
 *
 * Every number here is drawn from the same facts as content/stats.js. If one
 * changes there, change it here too.
 */
const terminal = {
  title: 'harsh@lnvs — ~/platform',
  lines: [
    { kind: 'cmd', text: 'whoami' },
    { kind: 'out', text: 'Software Engineer III · LNVS Fintech' },
    { kind: 'cmd', text: 'cat platform.json' },
    { kind: 'key', text: '  runtime      Node.js · NestJS · TypeScript' },
    { kind: 'key', text: '  services     20+ microservices' },
    { kind: 'key', text: '  throughput   100k+ loan applications / mo' },
    { kind: 'cmd', text: 'systemctl status harsh' },
    { kind: 'ok', text: 'active (running) — open to opportunities' },
  ],
};

export default terminal;
