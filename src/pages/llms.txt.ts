import type { APIRoute } from 'astro';
import { profileMarkdown } from '../lib/agent';

export const prerender = true;

// The profile for AI assistants (https://llmstxt.org).
export const GET: APIRoute = () =>
  new Response(profileMarkdown(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
