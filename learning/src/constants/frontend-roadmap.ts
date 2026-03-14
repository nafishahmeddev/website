import type { Phase } from '../types';

export const FRONTEND_PHASES: Phase[] = [
  {
    id: 'f1',
    title: 'Web Fundamentals',
    label: 'Phase 01',
    duration: '2–3 weeks',
    color: '#ff6b35',
    icon: '🌍',
    desc: 'HTML, CSS, and the basics. Every pixel on the web starts here.',
    topics: [
      {
        id: 'f1_1',
        title: 'HTML Essentials',
        desc: 'Semantic markup, forms, accessibility. Structure before style.',
        diff: 1,
        tag: 'lang',
        subtopics: [
          { id: 'fs1_1_1', title: 'HTML document structure and doctypes' },
          { id: 'fs1_1_2', title: 'Semantic HTML5 elements' },
          { id: 'fs1_1_3', title: 'Form elements and validation' },
          { id: 'fs1_1_4', title: 'Attributes and metadata' },
          { id: 'fs1_1_5', title: 'SEO basics and microdata' },
        ]
      },
      {
        id: 'f1_2',
        title: 'CSS Fundamentals',
        desc: 'Selectors, cascade, specificity, box model. Foundations of styling.',
        diff: 1,
        tag: 'lang',
        subtopics: [
          { id: 'fs1_2_1', title: 'Selectors (element, class, ID, pseudo)' },
          { id: 'fs1_2_2', title: 'Cascade and specificity' },
          { id: 'fs1_2_3', title: 'Box model (margin, padding, border)' },
          { id: 'fs1_2_4', title: 'Units (px, em, rem, vh, vw)' },
          { id: 'fs1_2_5', title: 'Color and typography' },
        ]
      },
      {
        id: 'f1_3',
        title: 'CSS Layout',
        desc: 'Display, positioning, flexbox intuition.',
        diff: 1,
        tag: 'skill',
        subtopics: [
          { id: 'fs1_3_1', title: 'Display property (block, inline, inline-block)' },
          { id: 'fs1_3_2', title: 'Positioning (static, relative, absolute, fixed)' },
          { id: 'fs1_3_3', title: 'Float and clearfix' },
          { id: 'fs1_3_4', title: 'Margins and collapsing' },
          { id: 'fs1_3_5', title: 'Stacking context and z-index' },
        ]
      },
      {
        id: 'f1_4',
        title: 'Flexbox',
        desc: 'Modern 1D layout system. Alignment, distribution, flexibility.',
        diff: 1,
        tag: 'skill',
        subtopics: [
          { id: 'fs1_4_1', title: 'Flex container and flex items' },
          { id: 'fs1_4_2', title: 'Main axis and cross axis' },
          { id: 'fs1_4_3', title: 'Flex properties (flex-grow, flex-shrink)' },
          { id: 'fs1_4_4', title: 'Justify-content and align-items' },
          { id: 'fs1_4_5', title: 'Building responsive layouts' },
        ]
      },
      {
        id: 'f1_5',
        title: 'CSS Grid',
        desc: '2D layout powerhouse. Rows, columns, gaps, areas.',
        diff: 2,
        tag: 'skill',
        subtopics: [
          { id: 'fs1_5_1', title: 'Grid container and grid tracks' },
          { id: 'fs1_5_2', title: 'Grid lines and grid cells' },
          { id: 'fs1_5_3', title: 'Grid template areas' },
          { id: 'fs1_5_4', title: 'Auto-placement and flow' },
          { id: 'fs1_5_5', title: 'Grid vs Flexbox decision-making' },
        ]
      },
      {
        id: 'f1_6',
        title: 'Responsive Design',
        desc: 'Mobile-first, media queries, viewport meta tag.',
        diff: 1,
        tag: 'skill',
        subtopics: [
          { id: 'fs1_6_1', title: 'Viewport meta tag and device pixels' },
          { id: 'fs1_6_2', title: 'Media queries and breakpoints' },
          { id: 'fs1_6_3', title: 'Mobile-first approach' },
          { id: 'fs1_6_4', title: 'Responsive images and srcset' },
          { id: 'fs1_6_5', title: 'Touch-friendly interfaces' },
        ]
      },
      {
        id: 'f1_7',
        title: 'CSS Features',
        desc: 'Variables, transitions, transforms, animations intro.',
        diff: 1,
        tag: 'skill',
        subtopics: [
          { id: 'fs1_7_1', title: 'CSS custom properties (variables)' },
          { id: 'fs1_7_2', title: 'Transitions and timing functions' },
          { id: 'fs1_7_3', title: 'Transforms (translate, scale, rotate)' },
          { id: 'fs1_7_4', title: 'Opacity and filters' },
          { id: 'fs1_7_5', title: 'Gradients and shadows' },
        ]
      },
    ]
  },
  {
    id: 'f2',
    title: 'JavaScript Core',
    label: 'Phase 02',
    duration: '3–4 weeks',
    color: '#00ccff',
    icon: '⚡',
    desc: 'The language of the web. Variables, functions, objects, async.',
    topics: [
      {
        id: 'f2_1',
        title: 'JavaScript Basics',
        desc: 'Variables, types, operators, control flow.',
        diff: 1,
        tag: 'lang',
        subtopics: [
          { id: 'fs2_1_1', title: 'var, let, const and hoisting' },
          { id: 'fs2_1_2', title: 'Primitive types (string, number, boolean)' },
          { id: 'fs2_1_3', title: 'Type coercion and comparison' },
          { id: 'fs2_1_4', title: 'Operators (arithmetic, logical)' },
          { id: 'fs2_1_5', title: 'Control flow (if/else, loops)' },
        ]
      },
      {
        id: 'f2_2',
        title: 'Functions & Scope',
        desc: 'First-class functions, closures, scope chain.',
        diff: 1,
        tag: 'lang',
        subtopics: [
          { id: 'fs2_2_1', title: 'Function declarations vs expressions' },
          { id: 'fs2_2_2', title: 'Arrow functions and this binding' },
          { id: 'fs2_2_3', title: 'Parameters and destructuring' },
          { id: 'fs2_2_4', title: 'Higher-order functions' },
          { id: 'fs2_2_5', title: 'Closure and scope chain' },
        ]
      },
      {
        id: 'f2_3',
        title: 'Objects & Arrays',
        desc: 'The two most important data structures in JS.',
        diff: 1,
        tag: 'lang',
        subtopics: [
          { id: 'fs2_3_1', title: 'Object literals and property access' },
          { id: 'fs2_3_2', title: 'Methods and this keyword' },
          { id: 'fs2_3_3', title: 'Arrays and array methods' },
          { id: 'fs2_3_4', title: 'Destructuring assignment' },
          { id: 'fs2_3_5', title: 'Spread operator' },
        ]
      },
      {
        id: 'f2_4',
        title: 'DOM Manipulation',
        desc: 'Selecting, creating, modifying, removing DOM elements.',
        diff: 1,
        tag: 'skill',
        subtopics: [
          { id: 'fs2_4_1', title: 'Selecting elements with querySelector' },
          { id: 'fs2_4_2', title: 'Creating and appending elements' },
          { id: 'fs2_4_3', title: 'Modifying attributes and styles' },
          { id: 'fs2_4_4', title: 'Event listeners and handling' },
          { id: 'fs2_4_5', title: 'Event delegation and bubbling' },
        ]
      },
      {
        id: 'f2_5',
        title: 'Events & Event Handling',
        desc: 'Click, submit, input, keyboard events. Event object.',
        diff: 1,
        tag: 'skill',
        subtopics: [
          { id: 'fs2_5_1', title: 'Event types (mouse, keyboard, form)' },
          { id: 'fs2_5_2', title: 'Event object and event.target' },
          { id: 'fs2_5_3', title: 'Preventing default and stopping propagation' },
          { id: 'fs2_5_4', title: 'Custom events' },
          { id: 'fs2_5_5', title: 'Input validation with events' },
        ]
      },
      {
        id: 'f2_6',
        title: 'Asynchronous JavaScript',
        desc: 'Callbacks, promises, async/await. Non-blocking operations.',
        diff: 2,
        tag: 'concept',
        subtopics: [
          { id: 'fs2_6_1', title: 'Callback functions and callback hell' },
          { id: 'fs2_6_2', title: 'Promises and .then() chaining' },
          { id: 'fs2_6_3', title: 'Async/await syntax' },
          { id: 'fs2_6_4', title: 'Error handling with try/catch' },
          { id: 'fs2_6_5', title: 'Promise.all and Promise.race' },
        ]
      },
      {
        id: 'f2_7',
        title: 'Fetch & APIs',
        desc: 'HTTP requests, JSON, CORS, error handling.',
        diff: 1,
        tag: 'skill',
        subtopics: [
          { id: 'fs2_7_1', title: 'Fetch API and HTTP methods' },
          { id: 'fs2_7_2', title: 'Headers and request configuration' },
          { id: 'fs2_7_3', title: 'Handling JSON responses' },
          { id: 'fs2_7_4', title: 'CORS and cross-origin requests' },
          { id: 'fs2_7_5', title: 'Error handling and status codes' },
        ]
      },
    ]
  },
  {
    id: 'f3',
    title: 'Modern JavaScript',
    label: 'Phase 03',
    duration: '2–3 weeks',
    color: '#b855ff',
    icon: '🚀',
    desc: 'ES6+, modules, tooling, debugging.',
    topics: [
      {
        id: 'f3_1',
        title: 'ES6+ Features',
        desc: 'Classes, template literals, for-of, Map/Set.',
        diff: 1,
        tag: 'lang',
        subtopics: [
          { id: 'fs3_1_1', title: 'Template literals and string methods' },
          { id: 'fs3_1_2', title: 'Classes and inheritance' },
          { id: 'fs3_1_3', title: 'for-of loops and iterables' },
          { id: 'fs3_1_4', title: 'Map, Set, WeakMap, WeakSet' },
          { id: 'fs3_1_5', title: 'Symbols and iterators' },
        ]
      },
      {
        id: 'f3_2',
        title: 'Destructuring & Spread',
        desc: 'Modern patterns for working with data.',
        diff: 1,
        tag: 'lang',
        subtopics: [
          { id: 'fs3_2_1', title: 'Array destructuring patterns' },
          { id: 'fs3_2_2', title: 'Object destructuring and renaming' },
          { id: 'fs3_2_3', title: 'Default values in destructuring' },
          { id: 'fs3_2_4', title: 'Rest parameters' },
          { id: 'fs3_2_5', title: 'Spread operator for arrays and objects' },
        ]
      },
      {
        id: 'f3_3',
        title: 'Modules & Imports',
        desc: 'ESM, module pattern, code organization.',
        diff: 1,
        tag: 'tool',
        subtopics: [
          { id: 'fs3_3_1', title: 'ES Modules (import/export)' },
          { id: 'fs3_3_2', title: 'Named and default exports' },
          { id: 'fs3_3_3', title: 'Module paths and aliases' },
          { id: 'fs3_3_4', title: 'CommonJS vs ESM' },
          { id: 'fs3_3_5', title: 'Using npm packages' },
        ]
      },
      {
        id: 'f3_4',
        title: 'Error Handling',
        desc: 'Try/catch, error types, debugging strategies.',
        diff: 1,
        tag: 'skill',
        subtopics: [
          { id: 'fs3_4_1', title: 'Error types (SyntaxError, TypeError)' },
          { id: 'fs3_4_2', title: 'try/catch/finally blocks' },
          { id: 'fs3_4_3', title: 'Creating custom errors' },
          { id: 'fs3_4_4', title: 'Console debugging' },
          { id: 'fs3_4_5', title: 'DevTools debugging basics' },
        ]
      },
      {
        id: 'f3_5',
        title: 'Regular Expressions',
        desc: 'Pattern matching, validation, string manipulation.',
        diff: 2,
        tag: 'skill',
        subtopics: [
          { id: 'fs3_5_1', title: 'RegExp syntax and flags' },
          { id: 'fs3_5_2', title: 'Character classes and quantifiers' },
          { id: 'fs3_5_3', title: 'Capturing groups' },
          { id: 'fs3_5_4', title: 'String methods with regex' },
          { id: 'fs3_5_5', title: 'Validation patterns' },
        ]
      },
      {
        id: 'f3_6',
        title: 'Performance Basics',
        desc: 'Event loop, call stack, debounce, throttle.',
        diff: 2,
        tag: 'skill',
        subtopics: [
          { id: 'fs3_6_1', title: 'JavaScript event loop' },
          { id: 'fs3_6_2', title: 'Call stack and task queue' },
          { id: 'fs3_6_3', title: 'setTimeout and setInterval' },
          { id: 'fs3_6_4', title: 'Debouncing and throttling' },
          { id: 'fs3_6_5', title: 'Browser performance APIs' },
        ]
      },
    ]
  },
  {
    id: 'f4',
    title: 'React Fundamentals',
    label: 'Phase 04',
    duration: '4–5 weeks',
    color: '#00ff9d',
    icon: '⚛️',
    desc: 'Components, JSX, hooks, state management basics.',
    topics: [
      {
        id: 'f4_1',
        title: 'React Basics',
        desc: 'JSX, components, rendering, props.',
        diff: 1,
        tag: 'lib',
        subtopics: [
          { id: 'fs4_1_1', title: 'JSX syntax and transpilation' },
          { id: 'fs4_1_2', title: 'Functional and Class components' },
          { id: 'fs4_1_3', title: 'Rendering to DOM with ReactDOM' },
          { id: 'fs4_1_4', title: 'Props and prop passing' },
          { id: 'fs4_1_5', title: 'Component composition' },
        ]
      },
      {
        id: 'f4_2',
        title: 'Hooks — useState',
        desc: 'Managing component state with hooks.',
        diff: 1,
        tag: 'lib',
        subtopics: [
          { id: 'fs4_2_1', title: 'useState hook and state updates' },
          { id: 'fs4_2_2', title: 'Multiple state variables' },
          { id: 'fs4_2_3', title: 'State setter function patterns' },
          { id: 'fs4_2_4', title: 'State vs props' },
          { id: 'fs4_2_5', title: 'Conditional rendering' },
        ]
      },
      {
        id: 'f4_3',
        title: 'Hooks — useEffect',
        desc: 'Side effects, lifecycle, cleanup.',
        diff: 1,
        tag: 'lib',
        subtopics: [
          { id: 'fs4_3_1', title: 'useEffect for side effects' },
          { id: 'fs4_3_2', title: 'Dependency arrays and runs' },
          { id: 'fs4_3_3', title: 'Cleanup functions' },
          { id: 'fs4_3_4', title: 'Multiple useEffect calls' },
          { id: 'fs4_3_5', title: 'Data fetching and subscriptions' },
        ]
      },
      {
        id: 'f4_4',
        title: 'Lists & Keys',
        desc: 'Rendering lists, key prop, reconciliation.',
        diff: 1,
        tag: 'skill',
        subtopics: [
          { id: 'fs4_4_1', title: 'Rendering arrays of components' },
          { id: 'fs4_4_2', title: 'Key prop importance' },
          { id: 'fs4_4_3', title: 'Dynamic list rendering' },
          { id: 'fs4_4_4', title: 'Filtering and sorting lists' },
          { id: 'fs4_4_5', title: 'List performance considerations' },
        ]
      },
      {
        id: 'f4_5',
        title: 'Forms in React',
        desc: 'Controlled components, validation, submission.',
        diff: 1,
        tag: 'skill',
        subtopics: [
          { id: 'fs4_5_1', title: 'Controlled vs uncontrolled components' },
          { id: 'fs4_5_2', title: 'Input, textarea, select elements' },
          { id: 'fs4_5_3', title: 'Form submission handling' },
          { id: 'fs4_5_4', title: 'Form validation strategies' },
          { id: 'fs4_5_5', title: 'useRef for uncontrolled components' },
        ]
      },
      {
        id: 'f4_6',
        title: 'Component Patterns',
        desc: 'Lifting state, prop drilling, composition.',
        diff: 2,
        tag: 'skill',
        subtopics: [
          { id: 'fs4_6_1', title: 'Lifting state up' },
          { id: 'fs4_6_2', title: 'Prop drilling problem' },
          { id: 'fs4_6_3', title: 'Composition over inheritance' },
          { id: 'fs4_6_4', title: 'Compound components' },
          { id: 'fs4_6_5', title: 'Custom components' },
        ]
      },
      {
        id: 'f4_7',
        title: 'Context API',
        desc: 'Avoiding prop drilling, global state basics.',
        diff: 2,
        tag: 'lib',
        subtopics: [
          { id: 'fs4_7_1', title: 'createContext and useContext' },
          { id: 'fs4_7_2', title: 'Context provider pattern' },
          { id: 'fs4_7_3', title: 'Multiple contexts' },
          { id: 'fs4_7_4', title: 'Context limitations' },
          { id: 'fs4_7_5', title: 'When to use Context' },
        ]
      },
    ]
  },
  {
    id: 'f5',
    title: 'Advanced React & Ecosystem',
    label: 'Phase 05',
    duration: '4–6 weeks',
    color: '#ffbe00',
    icon: '🏗️',
    desc: 'Advanced patterns, performance, state management, testing, deployment.',
    topics: [
      {
        id: 'f5_1',
        title: 'Custom Hooks',
        desc: 'Reusable logic, abstracting state.',
        diff: 2,
        tag: 'skill',
        subtopics: [
          { id: 'fs5_1_1', title: 'Creating custom hooks' },
          { id: 'fs5_1_2', title: 'Hook composition' },
          { id: 'fs5_1_3', title: 'Rules of hooks' },
          { id: 'fs5_1_4', title: 'useReducer for complex state' },
          { id: 'fs5_1_5', title: 'useCallback and useMemo' },
        ]
      },
      {
        id: 'f5_2',
        title: 'Performance Optimization',
        desc: 'Memoization, code splitting, lazy loading.',
        diff: 2,
        tag: 'skill',
        subtopics: [
          { id: 'fs5_2_1', title: 'React.memo for component memoization' },
          { id: 'fs5_2_2', title: 'useMemo hook' },
          { id: 'fs5_2_3', title: 'useCallback for function memoization' },
          { id: 'fs5_2_4', title: 'Code splitting and lazy loading' },
          { id: 'fs5_2_5', title: 'Bundle analysis' },
        ]
      },
      {
        id: 'f5_3',
        title: 'Advanced Hooks',
        desc: 'useRef, useReducer, useImperativeHandle.',
        diff: 2,
        tag: 'lib',
        subtopics: [
          { id: 'fs5_3_1', title: 'useRef for DOM access' },
          { id: 'fs5_3_2', title: 'useReducer for complex state logic' },
          { id: 'fs5_3_3', title: 'useLayoutEffect vs useEffect' },
          { id: 'fs5_3_4', title: 'useImperativeHandle and forwardRef' },
          { id: 'fs5_3_5', title: 'useDebugValue for debugging' },
        ]
      },
      {
        id: 'f5_4',
        title: 'State Management',
        desc: 'Redux, Zustand, centralized state.',
        diff: 2,
        tag: 'lib',
        subtopics: [
          { id: 'fs5_4_1', title: 'Redux fundamentals' },
          { id: 'fs5_4_2', title: 'Redux Toolkit setup' },
          { id: 'fs5_4_3', title: 'Zustand as alternative' },
          { id: 'fs5_4_4', title: 'Redux DevTools' },
          { id: 'fs5_4_5', title: 'Middleware and side effects' },
        ]
      },
      {
        id: 'f5_5',
        title: 'Routing & Navigation',
        desc: 'React Router, multi-page apps, URL handling.',
        diff: 2,
        tag: 'lib',
        subtopics: [
          { id: 'fs5_5_1', title: 'React Router setup and configuration' },
          { id: 'fs5_5_2', title: 'Route components and paths' },
          { id: 'fs5_5_3', title: 'Link and navigation' },
          { id: 'fs5_5_4', title: 'Dynamic routing and parameters' },
          { id: 'fs5_5_5', title: 'Nested routes and layouts' },
        ]
      },
      {
        id: 'f5_6',
        title: 'API Integration',
        desc: 'Server communication, caching, synchronization.',
        diff: 2,
        tag: 'skill',
        subtopics: [
          { id: 'fs5_6_1', title: 'Fetching data in useEffect' },
          { id: 'fs5_6_2', title: 'Loading and error states' },
          { id: 'fs5_6_3', title: 'Request cancellation' },
          { id: 'fs5_6_4', title: 'React Query / SWR' },
          { id: 'fs5_6_5', title: 'Real-time data with WebSockets' },
        ]
      },
      {
        id: 'f5_7',
        title: 'Testing React',
        desc: 'Unit tests, integration tests, end-to-end.',
        diff: 3,
        tag: 'skill',
        subtopics: [
          { id: 'fs5_7_1', title: 'Jest testing framework' },
          { id: 'fs5_7_2', title: 'React Testing Library' },
          { id: 'fs5_7_3', title: 'Rendering and querying components' },
          { id: 'fs5_7_4', title: 'User interactions and events' },
          { id: 'fs5_7_5', title: 'Mocking and async testing' },
        ]
      },
      {
        id: 'f5_8',
        title: 'TypeScript & React',
        desc: 'Type safety, prop types, generics.',
        diff: 3,
        tag: 'lang',
        subtopics: [
          { id: 'fs5_8_1', title: 'TypeScript basics for React' },
          { id: 'fs5_8_2', title: 'Typing props and component props' },
          { id: 'fs5_8_3', title: 'Generic components' },
          { id: 'fs5_8_4', title: 'React type utilities' },
          { id: 'fs5_8_5', title: 'TypeScript with hooks' },
        ]
      },
      {
        id: 'f5_9',
        title: 'Next.js Framework',
        desc: 'SSR, SSG, file-based routing, API routes.',
        diff: 3,
        tag: 'arch',
        subtopics: [
          { id: 'fs5_9_1', title: 'Next.js project setup' },
          { id: 'fs5_9_2', title: 'File-based routing' },
          { id: 'fs5_9_3', title: 'Server-Side Rendering (SSR)' },
          { id: 'fs5_9_4', title: 'Static Generation (SSG)' },
          { id: 'fs5_9_5', title: 'API routes and middleware' },
        ]
      },
      {
        id: 'f5_10',
        title: 'Styling Solutions',
        desc: 'CSS Modules, Tailwind, Styled Components.',
        diff: 2,
        tag: 'skill',
        subtopics: [
          { id: 'fs5_10_1', title: 'CSS Modules approach' },
          { id: 'fs5_10_2', title: 'Tailwind CSS integration' },
          { id: 'fs5_10_3', title: 'Styled Components' },
          { id: 'fs5_10_4', title: 'Emotion library' },
          { id: 'fs5_10_5', title: 'PostCSS and custom properties' },
        ]
      },
      {
        id: 'f5_11',
        title: 'Deployment & DevOps',
        desc: 'Building, hosting, CI/CD, monitoring.',
        diff: 2,
        tag: 'deploy',
        subtopics: [
          { id: 'fs5_11_1', title: 'Production build optimization' },
          { id: 'fs5_11_2', title: 'Hosting options (Vercel, Netlify)' },
          { id: 'fs5_11_3', title: 'Environment variables' },
          { id: 'fs5_11_4', title: 'GitHub Actions and CI/CD' },
          { id: 'fs5_11_5', title: 'Performance monitoring' },
        ]
      },
      {
        id: 'f5_12',
        title: 'Accessibility & SEO',
        desc: 'ARIA, semantic HTML, meta tags.',
        diff: 2,
        tag: 'skill',
        subtopics: [
          { id: 'fs5_12_1', title: 'ARIA roles and attributes' },
          { id: 'fs5_12_2', title: 'Keyboard navigation' },
          { id: 'fs5_12_3', title: 'Screen reader testing' },
          { id: 'fs5_12_4', title: 'Next.js SEO with next/head' },
          { id: 'fs5_12_5', title: 'Dynamic meta tags' },
        ]
      },
    ]
  }
];

export const FRONTEND_TOTAL_TOPICS = FRONTEND_PHASES.reduce((sum, phase) => sum + phase.topics.length, 0);

// Reuse the same TAG_COLORS from ML roadmap
export const FRONTEND_TAG_COLORS = {
  lang:    { bg: 'rgba(0,255,157,0.08)', color: '#00cc7d', border: 'rgba(0,255,157,0.15)' },
  lib:     { bg: 'rgba(0,204,255,0.08)', color: '#00aaff', border: 'rgba(0,204,255,0.15)' },
  skill:   { bg: 'rgba(184,85,255,0.08)', color: '#a040ee', border: 'rgba(184,85,255,0.15)' },
  concept: { bg: 'rgba(184,85,255,0.08)', color: '#a040ee', border: 'rgba(184,85,255,0.15)' },
  tool:    { bg: 'rgba(255,190,0,0.08)',  color: '#cc9900', border: 'rgba(255,190,0,0.15)' },
  arch:    { bg: 'rgba(184,85,255,0.08)', color: '#a040ee', border: 'rgba(184,85,255,0.15)' },
  deploy:  { bg: 'rgba(255,107,53,0.08)', color: '#ee5522', border: 'rgba(255,107,53,0.15)' },
} as const;

export const FRONTEND_DIFFICULTY_COLORS = ['#00ff9d', '#00ccff', '#ffbe00', '#ff6b35'] as const;
export const FRONTEND_DIFFICULTY_LABELS = ['Beginner', 'Easy', 'Medium', 'Advanced'] as const;

// LocalStorage keys for frontend roadmap
export const FRONTEND_STORAGE_KEYS = {
  COMPLETED_TOPICS: 'fe-roadmap-v1',
  COLLAPSED_PHASES: 'fe-collapsed-v1',
  COMPLETED_SUBTOPICS: 'fe-subtopics-v1',
} as const;
