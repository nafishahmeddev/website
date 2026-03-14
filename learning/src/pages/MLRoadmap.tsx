import React, { useEffect, useState, useCallback } from 'react';
import {
  Header,
  OverallProgressBar,
  PhaseBlock,
  ResourcesSection,
  Footer,
} from '../components';
import { PHASES, TOTAL_TOPICS, RESOURCES, STORAGE_KEYS } from '../constants';
import {
  loadDoneTopics,
  loadCollapsedPhases,
  saveToLocalStorage
} from '../utils/storage';

/**
 * ML Roadmap Page Component
 * Main page that orchestrates the learning roadmap UI
 */
const MLRoadmap: React.FC = () => {
  // State management
  const [completedTopicIds, setCompletedTopicIds] = useState<Set<string>>(() =>
    loadDoneTopics()
  );
  const [collapsedPhaseIds, setCollapsedPhaseIds] = useState<Set<string>>(() =>
    loadCollapsedPhases()
  );
  const [completedSubtopicIds, setCompletedSubtopicIds] = useState<Set<string>>(() => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMPLETED_SUBTOPICS);
      return data ? new Set(JSON.parse(data)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Persist completed topics to localStorage
  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.COMPLETED_TOPICS, completedTopicIds);
  }, [completedTopicIds]);

  // Persist collapsed phases to localStorage
  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.COLLAPSED_PHASES, collapsedPhaseIds);
  }, [collapsedPhaseIds]);

  // Persist completed subtopics to localStorage
  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.COMPLETED_SUBTOPICS, completedSubtopicIds);
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
          background: '#00ff9d',
          top: -100,
          left: -100,
          position: 'fixed'
        }}
        aria-hidden="true"
      />
      <div
        className="blob w-80 h-80 opacity-5"
        style={{
          background: '#ff6b35',
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
          background: '#6b35ff',
          bottom: '10%',
          left: '30%',
          position: 'fixed',
          animationDelay: '6s'
        }}
        aria-hidden="true"
      />

      {/* Main content */}
      <main>
        <Header />

        <OverallProgressBar
          phases={PHASES}
          completedTopicIds={completedTopicIds}
          totalTopics={TOTAL_TOPICS}
        />

        {/* Phases container */}
        <div className="space-y-3">
          {PHASES.map((phase, index) => (
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

        <ResourcesSection resources={RESOURCES} />

        <Footer onResetProgress={handleResetProgress} />
      </main>
    </div>
  );
};

MLRoadmap.displayName = 'MLRoadmap';

export default MLRoadmap;
