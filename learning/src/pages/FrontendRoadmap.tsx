import React, { useEffect, useState, useCallback } from 'react';
import {
  Header,
  OverallProgressBar,
  PhaseBlock,
  ResourcesSection,
  Footer,
} from '../components';
import { FRONTEND_PHASES, FRONTEND_TOTAL_TOPICS, FRONTEND_STORAGE_KEYS } from '../constants/frontend-roadmap';
import {
  saveToLocalStorage
} from '../utils/storage';

interface FrontendRoadmapProps {
  onBack: () => void;
}

/**
 * Frontend Roadmap Page Component
 */
const FrontendRoadmap: React.FC<FrontendRoadmapProps> = ({ onBack }) => {
  // State management
  const [completedTopicIds, setCompletedTopicIds] = useState<Set<string>>(() => {
    try {
      const data = localStorage.getItem(FRONTEND_STORAGE_KEYS.COMPLETED_TOPICS);
      return data ? new Set(JSON.parse(data)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [collapsedPhaseIds, setCollapsedPhaseIds] = useState<Set<string>>(() => {
    try {
      const data = localStorage.getItem(FRONTEND_STORAGE_KEYS.COLLAPSED_PHASES);
      return data ? new Set(JSON.parse(data)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [completedSubtopicIds, setCompletedSubtopicIds] = useState<Set<string>>(() => {
    try {
      const data = localStorage.getItem(FRONTEND_STORAGE_KEYS.COMPLETED_SUBTOPICS);
      return data ? new Set(JSON.parse(data)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Persist completed topics to localStorage
  useEffect(() => {
    saveToLocalStorage(FRONTEND_STORAGE_KEYS.COMPLETED_TOPICS, completedTopicIds);
  }, [completedTopicIds]);

  // Persist collapsed phases to localStorage
  useEffect(() => {
    saveToLocalStorage(FRONTEND_STORAGE_KEYS.COLLAPSED_PHASES, collapsedPhaseIds);
  }, [collapsedPhaseIds]);

  // Persist completed subtopics to localStorage
  useEffect(() => {
    saveToLocalStorage(FRONTEND_STORAGE_KEYS.COMPLETED_SUBTOPICS, completedSubtopicIds);
  }, [completedSubtopicIds]);

  // Toggle completion status of a topic
  const handleToggleTopic = useCallback((topicId: string): void => {
    setCompletedTopicIds(prev => {
      const next = new Set(prev);
      if (next.has(topicId)) {
        next.delete(topicId);
      } else {
        next.add(topicId);
      }
      return next;
    });
  }, []);

  // Toggle completion status of a subtopic
  const handleToggleSubtopic = useCallback((subtopicId: string): void => {
    setCompletedSubtopicIds(prev => {
      const next = new Set(prev);
      if (next.has(subtopicId)) {
        next.delete(subtopicId);
      } else {
        next.add(subtopicId);
      }
      return next;
    });
  }, []);

  // Toggle collapsed state of a phase
  const handleTogglePhase = useCallback((phaseId: string): void => {
    setCollapsedPhaseIds(prev => {
      const next = new Set(prev);
      if (next.has(phaseId)) {
        next.delete(phaseId);
      } else {
        next.add(phaseId);
      }
      return next;
    });
  }, []);

  // Reset all progress
  const handleResetProgress = useCallback((): void => {
    setCompletedTopicIds(new Set());
    setCompletedSubtopicIds(new Set());
  }, []);

  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
      {/* Background blobs */}
      <div
        className="blob w-96 h-96 opacity-10"
        style={{
          background: '#ff6b35',
          top: -100,
          left: -100,
          position: 'fixed'
        }}
        aria-hidden="true"
      />
      <div
        className="blob w-80 h-80 opacity-5"
        style={{
          background: '#00ccff',
          top: '40%',
          right: -80,
          position: 'fixed',
          animationDelay: '3s'
        }}
        aria-hidden="true"
      />
      <div
        className="blob w-64 h-64 opacity-5"
        style={{
          background: '#00ff9d',
          bottom: '10%',
          left: '30%',
          position: 'fixed',
          animationDelay: '6s'
        }}
        aria-hidden="true"
      />

      {/* Main content */}
      <main>
        <div className="mb-6 flex items-center justify-between">
          <Header
            title="Frontend Engineer"
            subtitle="Roadmap"
            description="Master HTML, CSS, JavaScript, and React. From zero to full-stack ready in 15-21 weeks."
          />
          <button
            onClick={onBack}
            className="mono text-sm px-4 py-2 rounded-lg transition-all"
            style={{
              background: 'var(--bg3)',
              border: '1px solid var(--border)',
              color: 'var(--muted)'
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.color = '#ff6b35';
              el.style.borderColor = 'rgba(255,107,53,0.3)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.color = 'var(--muted)';
              el.style.borderColor = 'var(--border)';
            }}
          >
            ← Back to Home
          </button>
        </div>

        <OverallProgressBar
          phases={FRONTEND_PHASES}
          completedTopicIds={completedTopicIds}
          completedSubtopicIds={completedSubtopicIds}
          totalTopics={FRONTEND_TOTAL_TOPICS}
        />

        {/* Phases container */}
        <div className="space-y-3">
          {FRONTEND_PHASES.map((phase, index) => (
            <React.Fragment key={phase.id}>
              {index > 0 && <div className="phase-connector" />}
              <PhaseBlock
                phase={phase}
                completedTopicIds={completedTopicIds}
                completedSubtopicIds={completedSubtopicIds}
                isCollapsed={collapsedPhaseIds.has(phase.id)}
                animationDelay={0.05 * index}
                onTogglePhase={handleTogglePhase}
                onToggleTopic={handleToggleTopic}
                onToggleSubtopic={handleToggleSubtopic}
              />
            </React.Fragment>
          ))}
        </div>

        <div className="mt-8">
          <ResourcesSection
            resources={[
              { href: 'https://developer.mozilla.org', label: '📚 MDN Web Docs' },
              { href: 'https://react.dev', label: '⚛️ React Docs' },
              { href: 'https://javascript.info', label: '📖 JavaScript.info' },
              { href: 'https://www.youtube.com/@KevinPowell', label: '🎬 Kevin Powell (CSS)' },
              { href: 'https://frontendmasters.com', label: '🔗 Frontend Masters' },
              { href: 'https://testing-library.com', label: '🧪 Testing Library' },
            ]}
          />
        </div>
      </main>

      <Footer onResetProgress={handleResetProgress} />
    </div>
  );
};

export default FrontendRoadmap;
