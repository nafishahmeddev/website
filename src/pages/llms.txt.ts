import type { APIRoute } from 'astro';
import { profile, hero, work, studioApps, side, experience, stack, faqs } from '../data/profile';

// A plain-text profile for AI assistants (https://llmstxt.org), written from
// the same data as the page so the two never disagree.
export const GET: APIRoute = () => {
  const body = `# ${profile.name}

> ${profile.role} in ${profile.city}, ${profile.country}. ${profile.currentTitle} at ${profile.currentCompany} since ${profile.currentSince}. Founder of ${profile.studio.name} (${profile.studio.url}). ${profile.years} years of production Node.js, TypeScript and React.

${hero.summary.replace(/\*/g, '')}

Contact: ${profile.email}
GitHub: ${profile.github}
LinkedIn: ${profile.linkedin}
Website: ${profile.url}/

## Selected work

${work.map((w) => `### ${w.name}: ${w.what}\n${[w.where, w.period, w.role].filter(Boolean).join(' · ')}\n${w.points.map((p) => `- ${p}`).join('\n')}\nStack: ${w.stack.join(', ')}`).join('\n\n')}

## Experience

${experience.map((e) => `- ${e.period}: ${e.role}, ${e.company}. ${e.summary}`).join('\n')}

## ${profile.studio.name} apps

${studioApps.map((a) => `- [${a.name}](${profile.studio.url}/${a.slug}/): ${a.kind}. ${a.line} ${a.live ? 'Live on Google Play.' : 'In progress.'}`).join('\n')}

## Libraries and side projects

${side.map((s) => `- ${s.name}: ${s.detail}${s.href ? ` ${s.href}` : ''}`).join('\n')}

## Stack

${stack.map((g) => `- ${g.label}: ${g.items.join(', ')}`).join('\n')}

## Questions

${faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join('\n\n')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
