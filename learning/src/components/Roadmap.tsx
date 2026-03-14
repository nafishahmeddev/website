import { useState, useCallback, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PHASES } from '../data/roadmap';
import { TopicDetail } from './TopicDetail';

const FLAT_TOPICS = PHASES.flatMap((p) => p.topics.map((t) => ({ ...t, phaseId: p.id })));

export function Roadmap() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();

  const [completed, setCompleted] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('ml-roadmap-v2');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  
  const selectedTopicIndex = useMemo(() => {
    const index = FLAT_TOPICS.findIndex(t => t.id === topicId);
    return index !== -1 ? index : 0;
  }, [topicId]);

  // Save progress
  useEffect(() => {
    localStorage.setItem('ml-roadmap-v2', JSON.stringify([...completed]));
  }, [completed]);

  const handleToggleTopic = useCallback((id: string) => {
    setCompleted((prev) => {
      const newCompleted = new Set(prev);
      if (newCompleted.has(id)) {
        newCompleted.delete(id);
      } else {
        newCompleted.add(id);
      }
      return newCompleted;
    });
  }, []);

  const handleNextTopic = useCallback(() => {
    const nextIndex = Math.min(selectedTopicIndex + 1, FLAT_TOPICS.length - 1);
    const nextTopic = FLAT_TOPICS[nextIndex];
    navigate(`/topic/${nextTopic.id}`);
    window.scrollTo(0, 0);
  }, [selectedTopicIndex, navigate]);

  const handlePrevTopic = useCallback(() => {
    const prevIndex = Math.max(0, selectedTopicIndex - 1);
    const prevTopic = FLAT_TOPICS[prevIndex];
    navigate(`/topic/${prevTopic.id}`);
    window.scrollTo(0, 0);
  }, [selectedTopicIndex, navigate]);

  const currentTopicData = FLAT_TOPICS[selectedTopicIndex];
  const currentPhase = PHASES.find((p) => p.id === currentTopicData.phaseId) || PHASES[0];
  const currentTopic = currentPhase.topics.find((t) => t.id === currentTopicData.id) || currentPhase.topics[0];

  const prevTopic = selectedTopicIndex > 0 ? FLAT_TOPICS[selectedTopicIndex - 1] : null;
  const nextTopic = selectedTopicIndex < FLAT_TOPICS.length - 1 ? FLAT_TOPICS[selectedTopicIndex + 1] : null;

  return (
    <TopicDetail
      topic={currentTopic}
      phase={currentPhase}
      completed={completed.has(currentTopic.id)}
      onToggle={() => handleToggleTopic(currentTopic.id)}
      onNext={handleNextTopic}
      onPrev={handlePrevTopic}
      isFirst={selectedTopicIndex === 0}
      isLast={selectedTopicIndex === FLAT_TOPICS.length - 1}
      prevLabel={prevTopic?.title}
      nextLabel={nextTopic?.title}
    />
  );
}
