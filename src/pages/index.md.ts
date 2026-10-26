import type { APIRoute } from 'astro';
import { profileMarkdown, markdownHeaders } from '../lib/agent';

export const prerender = true;

// The home page as Markdown, linked from the page head as its alternate.
export const GET: APIRoute = () => new Response(profileMarkdown(), { headers: markdownHeaders });
