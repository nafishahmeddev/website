import type { APIRoute } from 'astro';
import { profile } from '../data/profile';

// Search engines and AI assistants are all welcome. The assistants are named
// so a stricter default added later cannot shut one out by accident.
const assistants = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot', 'Applebot-Extended', 'Bingbot', 'DuckAssistBot', 'Meta-ExternalAgent', 'Amazonbot', 'MistralAI-User', 'CCBot'];

export const GET: APIRoute = () =>
  new Response(
    [`User-agent: *\nAllow: /`, ...assistants.map((b) => `User-agent: ${b}\nAllow: /`), `Sitemap: ${profile.url}/sitemap.xml`].join('\n\n') + '\n',
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
