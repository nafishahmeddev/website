// Every fact on nafish.me lives here. The page, the structured data, the
// sitemap and the llms.txt files all read from this file, so a fact changed
// here changes everywhere. Keep it factual: no claim that is not true today.

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
  lines: ['I build *wallet* backends', 'by day, and ship', 'my own *apps*', 'the rest of the time.'],
  summary: `Node.js, TypeScript and React engineer. At ${profile.currentCompany} I'm ${profile.currentTitle}, working on transaction confirmation, exchange integrations and API gateways for a digital wallet. Outside it I run ${profile.studio.name}, an independent studio that publishes local-first apps on Google Play.`,
};

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
    period: '2022 — 24, 2025 — now',
    role: 'Full Stack → Senior Full Stack Developer',
    points: [
      'Maintain the wallet and remittance infrastructure in production.',
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
    where: 'Softway',
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
    where: 'Vimo Software',
    period: '2022 — 2024',
    role: 'Full Stack Developer',
    points: [
      'Built the web app and backend of a Turkish-language audiobook and audio drama service at Vimo.',
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
  { slug: 'tilewit', name: 'Tilewit', kind: 'Puzzle duels', line: 'Two players, the same puzzle, on the clock.', live: true },
  { slug: 'twinstep', name: 'Twin Step', kind: 'Mirror puzzle', line: 'One move steers two twins, mirrored.', live: true },
  { slug: 'tailstamp', name: 'Tailstamp', kind: 'Pet health records', line: 'Medicine reminders, vaccines and vet visits for dogs, cats and rabbits.', live: false },
  { slug: 'grau', name: 'Grau', kind: 'Jiu-jitsu journal', line: 'Training log and belt timeline for BJJ.', live: true },
  { slug: 'fuzzlets', name: 'Fuzzlets', kind: 'Cozy sort puzzle', line: 'Sort the fluffs and tuck them in for the night.', live: true },
  { slug: 'loose-ends', name: 'Loose Ends', kind: 'Thread puzzle', line: 'Pull every thread free.', live: true },
];

/** As on LinkedIn (linkedin.com/in/nafish-ahmed-dev), newest first. */
export const experience = [
  { company: 'Vimo Software', legalName: 'Vimo Software Development Pvt. Ltd.', role: 'Senior Full Stack Developer', type: 'Full-time', place: 'Bengaluru', period: 'Feb 2025 — now', start: '2025-02', summary: 'Rejoined Vimo after Softway. Real-time transaction confirmation, financial and blockchain API integrations, encrypted secrets infrastructure, API gateway services, and the move from legacy code to React, Node.js and TypeScript.' },
  { company: 'Softway', legalName: 'Softway', role: 'Software Engineer', type: 'Full-time, hybrid', place: 'Bengaluru', period: 'Mar 2024 — Jan 2025', start: '2024-03', end: '2025-01', summary: 'Backend services and Redis-cached dashboards for Daikin Cloud Services, built with the Serverless Framework on AWS Lambda, AppSync and ECS.' },
  { company: 'Vimo Software', legalName: 'Vimo Software Development Pvt. Ltd.', role: 'Full Stack Developer', type: 'Full-time', place: 'Bengaluru', period: 'Mar 2022 — Mar 2024', start: '2022-03', end: '2024-03', summary: 'The Haaki audiobook platform, wallet infrastructure, ETH, Binance, Kraken and TRON integrations, and the Sarraf and Sendony fiat systems. Angular, Next.js, React and Node.js.' },
  { company: 'Avital Software', legalName: 'Avital Software Development Pvt Ltd', role: 'Full Stack Developer', type: 'Full-time', place: 'India', period: 'Aug 2021 — Mar 2022', start: '2021-08', end: '2022-03', summary: 'Core backend and admin panel for SuperMD: RESTful web services, secure data handling and role-based access control, with Next.js.' },
  { company: 'Internshala', legalName: 'Internshala', role: 'Internshala Student Partner', type: 'Internship', place: 'Kolkata', period: 'Aug 2019 — Feb 2020', start: '2019-08', end: '2020-02', summary: 'Student partner programme for Internshala, the internship and training platform.' },
];

export const education = [
  { school: 'Camellia Institute of Technology', degree: 'Bachelor of Technology, Civil Engineering', period: '2017 — 2020', start: '2017', end: '2020' },
  { school: 'Dumkal Polytechnic', degree: 'Diploma, Civil Engineering', period: '2014 — 2017', start: '2014', end: '2017' },
];

export const stack = [
  { label: 'Languages', items: ['TypeScript', 'JavaScript', 'Dart', 'PHP'] },
  { label: 'Backend', items: ['Node.js', 'Express', 'Hono', 'REST APIs', 'WebSocket', 'MQTT', 'Microservices'] },
  { label: 'Frontend', items: ['React', 'Next.js', 'Angular', 'Svelte', 'Astro', 'WordPress', 'jQuery'] },
  { label: 'Mobile', items: ['React Native', 'Expo', 'Flutter'] },
  { label: 'Data', items: ['MongoDB', 'MySQL', 'Redis', 'SQLite'] },
  { label: 'Cloud', items: ['AWS Lambda', 'AppSync', 'ECS', 'EC2 and S3', 'Serverless Framework', 'Docker', 'Cloudflare'] },
  { label: 'Money', items: ['Wallet ledgers', 'Fiat transfers', 'ETH', 'Binance', 'Kraken', 'TRON'] },
];

/** Plain questions with plain answers, for people and for answer engines. */
export const faqs = [
  {
    q: 'Who is Nafish Ahmed?',
    a: `Nafish Ahmed is a ${profile.role.toLowerCase()} based in ${profile.city}, ${profile.country}. He is ${profile.currentTitle} at ${profile.currentCompany}, where he works on a digital wallet and remittance platform, and the founder of ${profile.studio.name}, an independent studio that publishes mobile apps on Google Play.`,
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
    a: `${profile.studio.name} (idexa.app) is an independent app studio owned by Nafish Ahmed. It publishes apps for money, reminders, pet health and puzzle games, including Fintraq, Orbit, Tailstamp, Dish Dash, Tilewit and Twin Step. Most of its apps keep data on the phone and need no account.`,
  },
  {
    q: 'How can I contact Nafish?',
    a: `By email at ${profile.email}, or on LinkedIn and GitHub as nafishahmeddev.`,
  },
];
