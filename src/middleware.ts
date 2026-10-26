import { defineMiddleware } from 'astro:middleware';
import { profileMarkdown, markdownHeaders } from './lib/agent';

// Runs on Cloudflare for every request rendered on demand (the home page and
// any unknown address). Prerendered files are served straight from assets
// with the headers in public/_headers.

const security: Record<string, string> = {
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
};

/** True when the client prefers Markdown over HTML, as AI agents ask. */
const wantsMarkdown = (accept: string) => {
  const q = (type: string) => {
    const m = accept.match(new RegExp(`${type.replace('/', '\\/')}\\s*(;\\s*q=([0-9.]+))?`, 'i'));
    return m ? Number(m[2] ?? 1) : -1;
  };
  const md = q('text/markdown');
  return md > 0 && md >= q('text/html');
};

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);

  // One address for the site: www goes to the bare domain.
  if (url.hostname === 'www.nafish.me') {
    url.hostname = 'nafish.me';
    url.protocol = 'https:';
    url.port = '';
    return context.redirect(url.toString(), 301);
  }

  const accept = context.request.headers.get('accept') ?? '';
  if (url.pathname === '/' && context.request.method === 'GET' && wantsMarkdown(accept)) {
    return new Response(profileMarkdown(), {
      headers: { ...markdownHeaders, ...security, Vary: 'Accept', 'Content-Location': '/index.md' },
    });
  }

  const response = await next();
  for (const [k, v] of Object.entries(security)) response.headers.set(k, v);

  if (response.headers.get('content-type')?.includes('text/html')) {
    response.headers.set('Content-Type', 'text/html; charset=utf-8');
    response.headers.set('Vary', 'Accept');
    response.headers.append('Link', '</index.md>; rel="alternate"; type="text/markdown"');
    response.headers.append('Link', '</llms.txt>; rel="alternate"; type="text/plain"');
    if (response.status === 200 && !response.headers.has('Cache-Control')) {
      // Browsers revalidate; Cloudflare's edge keeps a copy for an hour.
      response.headers.set('Cache-Control', 'public, max-age=0, s-maxage=3600, must-revalidate');
    }
  }
  return response;
});
