// Every fact on nafish.me lives here. The page, the structured data, the
// sitemap and the llms.txt files all read from this file, so a fact changed
// here changes everywhere. Keep it factual: no claim that is not true today.

/** First full-time engineering role (Avital Software, August 2021). */
const careerStart = new Date('2021-08-01');
const yearsIn = (from: Date) => Math.floor((Date.now() - from.getTime()) / (365.25 * 24 * 3600 * 1000));

export const profile = {
  name: 'Nafish Ahmed',
  givenName: 'Nafish',
  familyName: 'Ahmed',
  domain: 'nafish.me',
  url: 'https://nafish.me',
  role: 'Senior Full-Stack Engineer',
  currentTitle: 'Senior Full Stack Developer',
  currentCompany: 'Vimo Software',
  currentSince: 'February 2025',
  city: 'Bengaluru',
  region: 'Karnataka',
  country: 'India',
  countryCode: 'IN',
  timeZone: 'Asia/Kolkata',
  email: 'hello@nafish.me',
  github: 'https://github.com/nafishahmeddev',
  linkedin: 'https://www.linkedin.com/in/nafish-ahmed-dev',
  studio: { name: 'IDEXA', url: 'https://idexa.app', role: 'Founder & Owner' },
  years: yearsIn(careerStart),
  /** When the facts on this page were last checked; used by the sitemap. */
  updated: '2026-10-26',
};

/** Keywords people search with, in order of importance. Used for structured data. */
export const knowsAbout = [
  'Node.js',
  'TypeScript',
  'React',
  'Next.js',
  'REST API design',
  'Microservices',
  'Payment systems',
  'Digital wallets',
  'Crypto exchange integration',
  'React Native',
  'Flutter',
  'MongoDB',
  'MySQL',
  'Redis',
  'AWS',
  'Local-first apps',
];

export const hero = {
  lines: ['I build the backend', 'behind a 1M+ customer', '*wallet,* and ship', 'my own *apps.*'],
  summary: `${profile.years} years of Node.js, TypeScript and React in production. By day I'm ${profile.currentTitle} at ${profile.currentCompany}, working on transaction confirmation, exchange integrations and API gateways. The rest of the time I run ${profile.studio.name}, an independent app studio with 7 apps on Google Play.`,
};

export const numbers = [
  { value: profile.years, suffix: '', label: 'years shipping production code', note: 'Since August 2021' },
  { value: 1, suffix: 'M+', label: 'wallet customers on systems I maintain', note: 'Vimo, 2022 to now' },
  { value: 4, suffix: '', label: 'exchange and chain networks integrated', note: 'ETH, Binance, Kraken, TRON' },
  { value: 7, suffix: '', label: 'studio apps live on Google Play', note: 'IDEXA, 4 more in progress' },
];

export interface Work {
  slug: string;
  name: string;
  what: string;
  where: string;
  period: string;
  role: string;
  points: string[];
  stack: string[];
}

export const work: Work[] = [
  {
    slug: 'vimo',
    name: 'Vimo',
    what: 'Digital wallet and remittance platform',
    where: 'Vimo Software',
    period: '2022 — now',
    role: 'Full Stack → Senior Full Stack Developer',
    points: [
      'Maintain the wallet infrastructure used by more than 1 million customers.',
      'Designed the real-time transaction confirmation system.',
      'Integrated the ETH, Binance, Kraken and TRON network APIs.',
      'Built the Sarraf and Sendony fiat transaction systems.',
      'Built encrypted secrets infrastructure and API gateway services.',
      'Led the migration of legacy code to React, Node.js and TypeScript.',
    ],
    stack: ['Node.js', 'TypeScript', 'React', 'MySQL', 'Microservices', 'Exchange APIs'],
  },
  {
    slug: 'daikin',
    name: 'Daikin Cloud Services',
    what: 'Cloud dashboards for Daikin',
    where: 'Softway Solutions',
    period: '2024 — 2025',
    role: 'Software Engineer',
    points: [
      'Built backend services for the Daikin Cloud Services dashboards.',
      'Added Redis caching to the dashboard data paths.',
      'Worked with AWS AppSync, Lambda and ECS in production.',
      'Improved internal engineering workflows.',
    ],
    stack: ['Node.js', 'Redis', 'MySQL', 'AWS AppSync', 'Lambda', 'ECS'],
  },
  {
    slug: 'supermd',
    name: 'SuperMD',
    what: 'Teleconsultation: virtual advice and prescriptions',
    where: 'Avital Software',
    period: '2021 — 2022',
    role: 'Full Stack Developer',
    points: [
      'Built the core backend services and the admin panel.',
      'Implemented role-based access control.',
      'Built secure handling of patient data.',
      'Worked on API performance.',
    ],
    stack: ['Node.js', 'React', 'MongoDB', 'PHP'],
  },
  {
    slug: 'haaki',
    name: 'Haaki',
    what: 'Turkish audiobook and audio drama platform',
    where: 'Work project',
    period: '',
    role: 'Full Stack Developer',
    points: [
      'Worked on the web app and backend of a Turkish-language audiobook and audio drama service.',
    ],
    stack: ['React', 'Node.js', 'TypeScript'],
  },
];

export interface StudioApp {
  slug: string;
  name: string;
  kind: string;
  line: string;
  live: boolean;
}

/** IDEXA's apps, as listed on idexa.app. */
export const studioApps: StudioApp[] = [
  { slug: 'fintraq', name: 'Fintraq', kind: 'Offline money tracker', line: 'Accounts, budgets and loans in an on-device database. No sign-up.', live: true },
  { slug: 'orbit', name: 'Orbit', kind: 'Bill and life reminders', line: 'Bills, renewals and documents for your home, car and family.', live: true },
  { slug: 'dishdash', name: 'Dish Dash', kind: 'Food puzzle game', line: 'Chain dishes against the clock and build a restaurant.', live: true },
  { slug: 'tilewit', name: 'Tilewit', kind: 'Puzzle duels', line: 'Two players, the same puzzle, five rounds for the board.', live: true },
  { slug: 'twinstep', name: 'Twin Step', kind: 'Mirror puzzle', line: 'One move steers two twins, mirrored.', live: true },
  { slug: 'lifio', name: 'Lifio', kind: 'Habit and mood tracker', line: 'Habits, mood and a one-minute evening check-in.', live: true },
  { slug: 'yumly', name: 'Yumly', kind: 'Recipes and meal planner', line: '200+ recipes, a week planner and one grocery list.', live: true },
  { slug: 'docease', name: 'DocEase', kind: 'PDF reader and scanner', line: 'Sign, scan and merge PDFs without uploading them.', live: false },
  { slug: 'grau', name: 'Grau', kind: 'Jiu-jitsu journal', line: 'Training log and belt timeline for BJJ.', live: false },
  { slug: 'fuzzlets', name: 'Fuzzlets', kind: 'Cozy sort puzzle', line: 'Sort the fluffs and tuck them in for the night.', live: false },
  { slug: 'loose-ends', name: 'Loose Ends', kind: 'Thread puzzle', line: 'Pull every thread free.', live: false },
];

export interface Side {
  name: string;
  what: string;
  detail: string;
  stack: string[];
  href?: string;
  linkLabel?: string;
}

export const side: Side[] = [
  {
    name: 'dVal',
    what: 'Schema validation library',
    detail: 'A small schema-based validator for Node.js and TypeScript backends, published on npm.',
    stack: ['TypeScript', 'Node.js', 'npm'],
    href: 'https://github.com/nafishahmeddev/dval',
    linkLabel: 'Source on GitHub',
  },
  {
    name: 'Secretly',
    what: 'Environment variable manager',
    detail: 'An internal tool for managing environment variables securely across several production services.',
    stack: ['Node.js', 'TypeScript'],
  },
  {
    name: 'Sitee',
    what: 'Construction site tracker',
    detail: 'A Flutter app for logging labour, expenses, material stock and daily work across project sites.',
    stack: ['Flutter', 'Dart'],
    href: 'http://sitee.idexa.app/',
    linkLabel: 'Visit Sitee',
  },
  {
    name: 'FinTracker',
    what: 'The first version of Fintraq',
    detail: 'A Flutter expense and income tracker with monthly insights. Archived; Fintraq replaced it.',
    stack: ['Flutter', 'Dart'],
    href: 'https://github.com/nafishahmeddev/fintracker',
    linkLabel: 'Archived source',
  },
];

export const experience = [
  { company: 'Vimo Software', role: 'Senior Full Stack Developer', period: 'Feb 2025 — now', start: '2025-02', summary: 'Real-time transaction confirmation, financial and blockchain API integrations, encrypted secrets infrastructure, API gateway services, and the move from legacy code to React, Node.js and TypeScript.' },
  { company: 'Softway Solutions', role: 'Software Engineer', period: 'Mar 2024 — Jan 2025', start: '2024-03', end: '2025-01', summary: 'Backend services and Redis-cached dashboards for Daikin Cloud Services, on AWS AppSync, Lambda and ECS.' },
  { company: 'Vimo Software', role: 'Full Stack Developer', period: 'Apr 2022 — Feb 2024', start: '2022-04', end: '2024-02', summary: 'Wallet infrastructure for 1M+ customers, ETH, Binance, Kraken and TRON integrations, and the Sarraf and Sendony fiat systems.' },
  { company: 'Avital Software', role: 'Full Stack Developer', period: 'Aug 2021 — Mar 2022', start: '2021-08', end: '2022-03', summary: 'Core backend and admin panel for SuperMD: secure data handling, role-based access control and API performance.' },
];

export const stack = [
  { label: 'Languages', items: ['TypeScript', 'JavaScript', 'Dart', 'PHP'] },
  { label: 'Backend', items: ['Node.js', 'Express', 'Hono', 'REST APIs', 'Microservices'] },
  { label: 'Frontend', items: ['React', 'Next.js', 'Svelte', 'Astro'] },
  { label: 'Mobile', items: ['React Native', 'Expo', 'Flutter'] },
  { label: 'Data', items: ['MongoDB', 'MySQL', 'Redis', 'SQLite'] },
  { label: 'Cloud', items: ['AWS EC2 and S3', 'AppSync', 'Lambda', 'ECS', 'Docker', 'Cloudflare'] },
  { label: 'Money', items: ['Wallet ledgers', 'Fiat transfers', 'ETH', 'Binance', 'Kraken', 'TRON'] },
];

/** Plain questions with plain answers, for people and for answer engines. */
export const faqs = [
  {
    q: 'Who is Nafish Ahmed?',
    a: `Nafish Ahmed is a ${profile.role.toLowerCase()} based in ${profile.city}, ${profile.country}. He is ${profile.currentTitle} at ${profile.currentCompany}, where he has worked on a digital wallet used by more than 1 million customers, and the founder of ${profile.studio.name}, an independent studio that publishes mobile apps on Google Play.`,
  },
  {
    q: 'What technologies does Nafish work with?',
    a: 'TypeScript and Node.js (Express, Hono) on the backend; React and Next.js on the web; React Native, Expo and Flutter on mobile; MongoDB, MySQL, Redis and SQLite for data; and AWS (EC2, S3, AppSync, Lambda, ECS), Docker and Cloudflare for infrastructure.',
  },
  {
    q: 'What kind of systems has he built?',
    a: 'Wallet and remittance backends, real-time transaction confirmation, integrations with the ETH, Binance, Kraken and TRON networks, fiat transfer systems, API gateways, encrypted secrets infrastructure, admin panels with role-based access control, cloud dashboards with Redis caching, and local-first mobile apps.',
  },
  {
    q: 'What is IDEXA?',
    a: `${profile.studio.name} (idexa.app) is an independent app studio owned by Nafish Ahmed. It publishes apps for money, paperwork, habits, cooking and play, including Fintraq, Orbit, Dish Dash and Tilewit. Most of its apps keep data on the phone and need no account.`,
  },
  {
    q: 'How can I contact Nafish?',
    a: `By email at ${profile.email}, or on LinkedIn and GitHub as nafishahmeddev.`,
  },
];
