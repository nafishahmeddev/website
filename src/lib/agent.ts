// The whole profile as Markdown, for AI agents and answer engines. Served at
// /llms.txt, at /index.md, and at / to any client that asks for text/markdown.
// Built from src/data/profile.ts, so it never disagrees with the page.
import { profile, hero, work, studioApps, experience, education, stack, faqs } from '../data/profile';

export function profileMarkdown() {
  return `# ${profile.name}

> ${profile.role} in ${profile.city}, ${profile.country}. ${profile.currentTitle} at ${profile.currentCompany} since ${profile.currentSince}. Founder of ${profile.studio.name} (${profile.studio.url}). Works in Node.js, TypeScript and React.

${hero.summary}

- Email: ${profile.email}
- GitHub: ${profile.github}
- LinkedIn: ${profile.linkedin}
- Website: ${profile.url}/

## Selected work

${work.map((w) => `### ${w.name}: ${w.what}\n\n${[w.where, w.period, w.role].filter(Boolean).join(' · ')}\n\n${w.points.map((p) => `- ${p}`).join('\n')}\n\nStack: ${w.stack.join(', ')}`).join('\n\n')}

## Experience

${experience.map((e) => `- **${e.role}, ${e.legalName}** (${e.period}; ${e.type}; ${e.place}). ${e.summary}`).join('\n')}

## Education

${education.map((e) => `- ${e.degree}, ${e.school} (${e.period})`).join('\n')}

## ${profile.studio.name} apps

${studioApps.map((a) => `- [${a.name}](${profile.studio.url}/${a.slug}/): ${a.kind}. ${a.line} ${a.live ? 'On Google Play.' : 'In progress.'}`).join('\n')}

## Stack

${stack.map((g) => `- ${g.label}: ${g.items.join(', ')}`).join('\n')}

## Questions

${faqs.map((f) => `### ${f.q}\n\n${f.a}`).join('\n\n')}
`;
}

export const markdownHeaders = {
  'Content-Type': 'text/markdown; charset=utf-8',
  'Cache-Control': 'public, max-age=600, s-maxage=3600',
  'X-Robots-Tag': 'noindex',
};
