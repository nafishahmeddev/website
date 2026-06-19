export const profile = {
  name: 'Nafish Ahmed',
  site: 'nafish.me',
  role: 'Senior Software Developer',
  headline: 'Full-stack systems, product speed, mobile apps.',
  intro:
    'I build scalable full-stack systems end-to-end, from backend APIs and microservices to polished UIs and mobile apps.',
  email: 'hello@nafish.me',
  location: 'India',
  github: 'https://github.com/nafishahmeddev',
  linkedin: 'https://in.linkedin.com/in/nafish-ahmed-dev',
  product: 'https://tryluno.app',
};

export const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
];

export const stats = [
  { value: '4+', label: 'years experience' },
  { value: '1M+', label: 'users served' },
  { value: 'API', label: 'integration focused' },
  { value: '18', label: 'GitHub repositories' },
];

export const products = [
  {
    title: 'DishDash',
    status: 'Currently building',
    href: '#contact',
    summary:
      'Game project in active development, focused on quick sessions, polished interaction, and simple replayable mechanics.',
    stack: ['Game project', 'Mobile-first', 'Prototype'],
  },
  {
    title: 'Keeep',
    status: 'Live on Play Store',
    href: 'https://tryluno.app',
    summary:
      'Privacy-first personal finance app. Local-first data, no accounts, no cloud, no tracking.',
    stack: ['React Native', 'Expo', 'SQLite', 'Android'],
  },
  {
    title: 'Sitee',
    status: 'Personal project',
    href: '#contact',
    summary:
      'Flutter app for tracking labour, expenses, material stock, and daily work activity across project sites.',
    stack: ['Flutter', 'Dart', 'Project tracking', 'Inventory'],
  },
];

export const projects = [
  {
    title: 'Vimo',
    type: 'Work',
    summary:
      'Digital money wallet and remittance platform trusted by 1M+ customers. Worked on backend infrastructure, admin systems, and production product flows.',
    stack: ['Node.js', 'React.js', 'TypeScript'],
  },
  {
    title: 'SuperMD',
    type: 'Work',
    summary:
      'Teleconsultation platform connecting patients with healthcare professionals for virtual advice and prescriptions.',
    stack: ['Node.js', 'React.js', 'MongoDB'],
  },
  {
    title: 'Haaki',
    type: 'Work',
    summary:
      'Audiobook and audiodrama platform in Turkish, built for immersive storytelling and smooth listening.',
    stack: ['React.js', 'Node.js', 'TypeScript'],
  },
  {
    title: 'dVal',
    type: 'Solo',
    summary:
      'Lightweight schema-based data validation library for Node.js and TypeScript backends. Published on NPM.',
    stack: ['Node.js', 'TypeScript', 'NPM'],
  },
  {
    title: 'Secretly',
    type: 'Solo',
    summary:
      'Internal tool for managing environment variables securely across multiple production services.',
    stack: ['Node.js', 'TypeScript'],
  },
  {
    title: 'FinTracker',
    type: 'Solo',
    summary:
      'Personal finance app for tracking daily expenses and income with monthly insights, early precursor to Keeep.',
    stack: ['Flutter', 'Dart'],
  },
];

export const experience = [
  {
    company: 'Vimo Software',
    role: 'Senior Full Stack Developer',
    period: 'Feb 2025-present',
    location: 'India',
    details:
      'Designed real-time transaction confirmation systems, integrated financial and blockchain APIs, built encrypted secrets infrastructure, engineered API gateway services, and led legacy migration to React.js, Node.js, and TypeScript.',
    stack: ['Node.js', 'TypeScript', 'React.js', 'Microservices', 'Blockchain APIs'],
  },
  {
    company: 'Softway Solutions',
    role: 'Software Engineer',
    period: 'Mar 2024-Jan 2025',
    location: 'India',
    details:
      'Built backend services, improved internal workflows, worked on Daikin Cloud Services dashboards with Redis caching, and gained hands-on AWS exposure with AppSync, Lambda, and ECS.',
    stack: ['Node.js', 'Redis', 'MySQL', 'AWS AppSync', 'Lambda', 'ECS'],
  },
  {
    company: 'Vimo Software',
    role: 'Full Stack Developer',
    period: 'Apr 2022-Feb 2024',
    location: 'India',
    details:
      'Maintained Vimo wallet infrastructure for 1M+ customers, integrated ETH, Binance, Kraken, and TRON network APIs, and built Sarraf & Sendony fiat transaction systems.',
    stack: ['Node.js', 'React.js', 'MySQL', 'TypeScript', 'Exchange APIs'],
  },
  {
    company: 'Avital Software',
    role: 'Full Stack Developer',
    period: 'Aug 2021-Mar 2022',
    location: 'India',
    details:
      'Built core backend services and admin panel for SuperMD, covering secure data handling, role-based access control, and API performance.',
    stack: ['Node.js', 'React.js', 'MongoDB', 'PHP'],
  },
];

export const stackGroups = [
  { label: 'Language', items: ['TypeScript', 'JavaScript', 'PHP'] },
  { label: 'Backend', items: ['Node.js', 'Express.js', 'Hono.js', 'REST APIs', 'Microservices'] },
  { label: 'Frontend', items: ['React.js', 'Next.js 15', 'Svelte'] },
  { label: 'Mobile', items: ['React Native', 'Expo', 'Flutter'] },
  { label: 'Database', items: ['MongoDB', 'MySQL', 'Redis', 'SQLite'] },
  { label: 'Cloud and tooling', items: ['AWS EC2/S3', 'AppSync', 'Lambda', 'ECS', 'Docker'] },
  { label: 'Financial APIs', items: ['ETH', 'Binance', 'Kraken', 'TRON', 'Payment APIs'] },
];

export const buildSignals = [
  'Backend APIs',
  'Microservices',
  'Financial integrations',
  'Blockchain APIs',
  'Mobile apps',
  'Performance work',
  'Admin systems',
  'Payment APIs',
  'Local-first products',
];
