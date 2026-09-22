/**
 * `tier: 'featured'` projects get a case-study page at /projects/[slug].
 * `tier: 'more'` projects render as compact cards linking straight to GitHub.
 *
 * The two demo videos have been sitting in public/ since Oct 2024 without ever
 * being referenced. They are large (68 MB and 41 MB), so cards render a static
 * placeholder and only fetch the file once the viewer presses play.
 */
const projects = [
  {
    slug: 'gb-scraper',
    tier: 'featured',
    title: 'GB-Scraper',
    tagline: 'Search-aggregation platform that scrapes Google and Bing in parallel and streams progress live.',
    period: 'May 2023 — Jun 2023',
    stack: ['Next.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'Puppeteer'],
    highlights: [
      'Engineered a search-aggregation platform scraping Google and Bing results with Puppeteer, streaming live progress over Socket.IO.',
      'Secured the service with JWT authentication, password hashing, CSRF protection, and query rate limiting, capping load under concurrent scraping jobs.',
    ],
    media: { type: 'video', src: '/GB-scrapper.mp4' },
    links: { repo: 'https://github.com/hars008/GB-scrapper' },
    caseStudy: {
      problem:
        'Comparing results across search engines means running the same query twice and reconciling two pages by hand. Doing it programmatically runs into the other problem: scraping is slow, and a user staring at a spinner with no feedback assumes the app has hung.',
      approach: [
        'Puppeteer drives headless Chrome against both Google and Bing, with the two scrapes running concurrently rather than in sequence.',
        'A Socket.IO channel pushes per-engine progress to the browser as each result batch lands, so the UI fills in continuously instead of blocking on the full job.',
        'Results are normalised into a single shape and persisted to MongoDB, which doubles as a cache for repeated queries.',
        'The scraping endpoint is the expensive one, so it sits behind JWT auth, per-query rate limiting, and CSRF protection — otherwise a single client can pin the box by firing concurrent jobs.',
      ],
      outcome:
        'A query returns aggregated, de-duplicated results from both engines with visible progress throughout, and the rate limiter keeps concurrent scraping jobs from exhausting the browser pool.',
    },
  },
  {
    slug: 'stock-market',
    tier: 'featured',
    title: 'Stock Market Visualiser',
    tagline: 'Interactive stock charting with authenticated accounts and email / WhatsApp sharing.',
    period: '2024',
    stack: ['React', 'Node.js', 'Express.js', 'Chart.js', 'MongoDB'],
    highlights: [
      'Visualises historical stock data as interactive time-series charts with range selection.',
      'Authenticated accounts so a user’s tracked symbols and saved views persist across sessions.',
      'Shares a rendered chart snapshot directly over email or WhatsApp from inside the app.',
    ],
    media: { type: 'video', src: '/stock-market.mp4' },
    links: { repo: 'https://github.com/hars008/Stock-Market' },
    caseStudy: {
      problem:
        'Reading a price series as a table of numbers is useless for spotting a trend, and the charts that do exist are locked inside apps you cannot share out of.',
      approach: [
        'A Node/Express service fetches and normalises historical price data, keeping the API surface small enough for the client to stay dumb.',
        'Chart.js renders the series with selectable ranges, so the same dataset answers both "this week" and "this year" without a refetch.',
        'Auth-backed accounts persist tracked symbols per user rather than in browser storage.',
        'Sharing renders the current view server-side and hands it to email or WhatsApp, so the recipient gets the chart rather than a link they need an account to open.',
      ],
      outcome:
        'A chart you can read, save to your account, and send to somebody who does not have one.',
    },
  },
  {
    slug: 'rul-predictor',
    tier: 'featured',
    title: 'Remaining Useful Life Predictor',
    tagline: 'CNN-LSTM model estimating remaining useful life of cutting tools from telemetry, at 93% accuracy.',
    period: 'Nov 2023 — Apr 2024',
    stack: ['Python', 'CNN-LSTM', 'SVM', 'Regression', 'Express', 'React'],
    highlights: [
      'Trained a CNN-LSTM model on 100,000+ data points of tool telemetry, covering cleaning, feature extraction, and hyperparameter tuning.',
      'Achieved 93% prediction accuracy on remaining-useful-life estimation, surfaced through a React and Express dashboard.',
    ],
    media: null,
    links: { repo: 'https://github.com/hars008/Rul-Prediction' },
    caseStudy: {
      problem:
        'A cutting tool replaced too early wastes money; one replaced too late damages the workpiece and the machine. Fixed-interval maintenance schedules guess at a number that actually depends on how the tool has been used.',
      approach: [
        'Started from 100,000+ points of raw tool telemetry — cleaning, resampling, and extracting the features that actually carry degradation signal.',
        'A CNN-LSTM does the work: convolutional layers pull local patterns out of the sensor windows, the LSTM tracks how those patterns drift across the tool’s life.',
        'Benchmarked against SVM and classical regression baselines to confirm the sequence model was earning its complexity.',
        'Hyperparameter tuning over window size, layer depth, and learning rate; the result is served through an Express API behind a React dashboard so the prediction is readable by someone who is not running notebooks.',
      ],
      outcome:
        '93% accuracy on remaining-useful-life estimation, turning a fixed maintenance interval into a per-tool prediction.',
    },
  },

  // --- Secondary work: compact grid, links straight to source ---
  {
    slug: 'fusion-iiit',
    tier: 'more',
    title: 'FusionIIIT',
    tagline: 'Institute-wide ERP for IIIT Jabalpur. Led a 7-member backend team on the platform.',
    role: 'Contributor',
    stack: ['Django', 'Python', 'PostgreSQL'],
    links: { repo: 'https://github.com/hars008/Fusion' },
  },
  {
    slug: 'railway-management',
    tier: 'more',
    title: 'Railway Management',
    tagline: 'Booking and seat-availability service with concurrency-safe reservations.',
    stack: ['Node.js', 'Express.js', 'MySQL'],
    links: { repo: 'https://github.com/hars008/railway-management' },
  },
  {
    slug: 'booking-app',
    tier: 'more',
    title: 'Booking App',
    tagline: 'Full-stack booking platform with registration, authorisation, and a booking API.',
    stack: ['Vite', 'React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    links: { repo: 'https://github.com/hars008/bookingApp' },
  },
  {
    slug: 'moviesverse',
    tier: 'more',
    title: 'Moviesverse',
    tagline: 'Search movies and series and pull full details from an aggregated catalogue.',
    stack: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    links: { repo: 'https://github.com/hars008/hackathon' },
  },
  {
    slug: 'solridee',
    tier: 'more',
    title: 'Solridee',
    tagline: 'Cycle rental platform with separate user and admin surfaces.',
    stack: ['PHP', 'MySQL', 'Bootstrap'],
    links: { repo: 'https://github.com/hars008/solridee' },
  },
  {
    slug: 'bob-virtual-branch',
    tier: 'more',
    title: 'Bank of Baroda — Virtual Branch',
    tagline: 'Virtual banking branch supporting deposits, withdrawals, and transfers.',
    stack: ['PHP', 'MySQL', 'HTML', 'CSS'],
    links: { repo: 'https://github.com/hars008/Bank-Site' },
  },
  {
    slug: 'data-visualisation',
    tier: 'more',
    title: 'Data Visualisation',
    tagline: 'Line and bar chart rendering over a Mongo-backed dataset.',
    stack: ['Next.js', 'Chart.js', 'MongoDB', 'Tailwind CSS'],
    links: {
      repo: 'https://github.com/hars008/ekko',
      demo: 'https://main--resplendent-lebkuchen-a23f08.netlify.app/',
    },
  },
  {
    slug: 'stone-paper-scissors',
    tier: 'more',
    title: 'Stone Paper Scissors',
    tagline: 'Browser game with animated transitions and running score tracking.',
    stack: ['React', 'CSS'],
    links: {
      repo: 'https://github.com/hars008/stone-paper-scissors',
      demo: 'https://hars008.github.io/stone-paper-scissors/',
    },
  },
  {
    slug: 'to-do-list',
    tier: 'more',
    title: 'To-Do List',
    tagline: 'Task tracker with search, status filtering, and per-user detail views.',
    stack: ['React', 'Node.js', 'Express.js'],
    links: {
      repo: 'https://github.com/hars008/to-do-List',
      demo: 'https://keen-muffin-b24056.netlify.app/',
    },
  },
];

export const featuredProjects = projects.filter((p) => p.tier === 'featured');
export const moreProjects = projects.filter((p) => p.tier === 'more');

export default projects;
