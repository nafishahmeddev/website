import { type Lesson } from './TutorialContent';

interface LessonSidebarProps {
  lessons: Lesson[];
  activeLesson: number;
  onLessonClick: (index: number) => void;
  color: string;
}

export function LessonSidebar({ lessons, activeLesson, onLessonClick, color }: LessonSidebarProps) {
  return (
    <div className="sticky top-32">
      <div className="flex items-center gap-2 mb-8 opacity-50">
        <div className="w-1 h-1 rounded-full bg-(--accent)" style={{ background: color }}></div>
        <span className="mono text-[10px] uppercase tracking-widest font-bold">Curriculum</span>
      </div>
      <div className="space-y-1">
        {lessons.map((l, idx) => (
          <button
            key={idx}
            onClick={() => onLessonClick(idx)}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
              activeLesson === idx 
                ? 'text-white' 
                : 'text-(--muted) hover:text-(--text) hover:bg-white/5'
            }`}
          >
            {activeLesson === idx && (
              <div 
                className="absolute inset-0 opacity-20" 
                style={{ background: `linear-gradient(to right, ${color}, transparent)` }}
              ></div>
            )}
            <div className="relative z-10 flex items-center gap-3">
              <span className={`mono text-[10px] font-bold ${activeLesson === idx ? '' : 'opacity-30'}`} style={{ color: activeLesson === idx ? color : undefined }}>
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span className="text-sm font-medium tracking-tight">
                {l.title}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-12 p-6 rounded-2xl bg-white/2 border border-white/5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
          <span className="text-4xl">🚀</span>
        </div>
        <h4 className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color }}>Learning Progress</h4>
        <p className="text-[11px] leading-relaxed text-(--muted)">
          You are currently on lesson {activeLesson + 1} of {lessons.length}. Keep going!
        </p>
        <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full transition-all duration-500 rounded-full" 
            style={{ 
              width: `${((activeLesson + 1) / lessons.length) * 100}%`,
              background: color 
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
