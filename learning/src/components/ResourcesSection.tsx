import React from 'react';
import type { Resource } from '../types';

interface ResourcesSectionProps {
  resources: Resource[];
}

/**
 * Resources section with external links
 */
export const ResourcesSection: React.FC<ResourcesSectionProps> = ({ resources }) => {
  return (
    <div className="mt-16 anim-in" style={{ animationDelay: '0.3s' }}>
      <h2
        className="mono text-xs uppercase tracking-widest mb-6"
        style={{ color: 'var(--muted)' }}
      >
        &gt; recommended_resources
      </h2>
      <div className="flex flex-wrap gap-3">
        {resources.map(resource => (
          <a
            key={resource.href}
            href={resource.href}
            target="_blank"
            rel="noopener noreferrer"
            className="resource-chip"
            title={`Open ${resource.label} in new tab`}
          >
            {resource.label}
          </a>
        ))}
      </div>
    </div>
  );
};

ResourcesSection.displayName = 'ResourcesSection';
