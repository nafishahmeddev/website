import { TutorialContent } from './TutorialContent';
import { PHASES } from '../data/roadmap';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getTutorial } from '../data/tutorials/index';

interface LessonPageProps {
  lessonId: string;
}

export function LessonPage({ lessonId }: LessonPageProps) {
  const { topicSlug, topicId } = useParams<{ topicSlug?: string; topicId?: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const urlParts = location.pathname.split('/').filter(Boolean);
  const urlTopicSlug = urlParts[0] === 'topic' ? urlParts[1] : undefined;

  const effectiveIdOrSlug = topicSlug || urlTopicSlug || topicId;
  const tutorial = effectiveIdOrSlug ? getTutorial(effectiveIdOrSlug) : null;
  const lessons = tutorial?.lessons || [];
  const activeIndex = lessons.findIndex(l => l.id === lessonId);
  
  const currentPhase = PHASES.find(p => p.topics.some(t => t.id === effectiveIdOrSlug || t.slug === effectiveIdOrSlug));

  if (!tutorial || activeIndex === -1 || !currentPhase) {
    return <div className="p-20 text-center text-(--muted)">Lesson content not found.</div>;
  }

  const handleActiveLessonChange = (index: number) => {
    const nextLessonId = lessons[index]?.id || 'overview';
    const currentTopicData = currentPhase.topics.find(t => t.id === effectiveIdOrSlug || t.slug === effectiveIdOrSlug);
    const slugToUse = currentTopicData?.slug || effectiveIdOrSlug;
    
    navigate(`/topic/${slugToUse}/${nextLessonId}`);
    window.scrollTo(0, 0);
  };

  return (
    <TutorialContent 
      color={currentPhase.color}
      lessons={lessons}
      activeLesson={activeIndex}
      onActiveLessonChange={handleActiveLessonChange}
    />
  );
}
