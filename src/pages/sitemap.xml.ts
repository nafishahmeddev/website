import type { APIRoute } from 'astro';
import { profile } from '../data/profile';

export const GET: APIRoute = () =>
  new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${profile.url}/</loc>
    <lastmod>${profile.updated}</lastmod>
    <image:image><image:loc>${profile.url}/nafish.webp</image:loc></image:image>
  </url>
</urlset>
`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
