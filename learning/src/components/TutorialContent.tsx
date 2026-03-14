import { useState, Suspense, lazy } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { InteractiveViz } from './InteractiveViz';

// Lazy load syntax highlighter
const SyntaxHighlighterFull = lazy(() => import('react-syntax-highlighter').then(m => ({ default: m.Prism })));

export type VizType = 'vector-space' | 'probability-dist' | 'linear-regression' | 'gradient-descent' | 'logistic-sigmoid';

// Inline simple styles for the markdown components to match the app's aesthetic
const MarkdownComponents = (color: string): Components => ({
  h3: (props) => <h3 className="text-xl font-bold mt-8 mb-4 tracking-tight" style={{ color }} {...props} />,
  h4: (props) => <h4 className="text-lg font-bold mt-6 mb-3 tracking-tight text-white/90" {...props} />,
  p: (props) => <p className="text-lg leading-relaxed text-(--text)/90 mb-4 font-medium tracking-tight" {...props} />,
  ul: (props) => <ul className="list-none space-y-2 mb-6 ml-1" {...props} />,
  li: ({ children, ...props }) => (
    <li className="flex gap-3 items-start text-(--text)/80" {...props}>
      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }}></span>
      <span>{children}</span>
    </li>
  ),
  code: (props) => {
    // @ts-expect-error - node and inline are passed by react-markdown but not in the standard HTML props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { node: _node, inline: _inline, ...rest } = props;
    return <code className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-sm border border-white/5" style={{ color }} {...rest} />;
  },
  strong: (props) => <strong className="font-bold text-white" {...props} />,
});

export interface Lesson {
  id: string;
  title: string;
  content?: string;
  noobDefinition?: string;
  realWorldExample?: string;
  videoUrl?: string;
  codeExample?: { language: string; code: string };
  vizType?: VizType;
  keyPoints?: string[];
  formula?: string;
}

interface TutorialContentProps {
  color: string;
  lessons: Lesson[];
  activeLesson: number;
  onActiveLessonChange: (index: number) => void;
  onNextTopic?: () => void;
  onPrevTopic?: () => void;
  isLastTopic?: boolean;
  nextTopicLabel?: string;
}

export function TutorialContent({ 
  color, 
  lessons, 
  activeLesson,
  onActiveLessonChange,
  onNextTopic, 
  onPrevTopic, 
  isLastTopic,
  nextTopicLabel 
}: TutorialContentProps) {
  const [codeCopied, setCodeCopied] = useState(false);

  const lesson = lessons[activeLesson] || lessons[0];
  const markdownComponents = MarkdownComponents(color);

  const copyCode = () => {
    if (lesson.codeExample) {
      navigator.clipboard.writeText(lesson.codeExample.code);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    }
  };

  return (
    <div className="mb-24">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <div className="fade-up">
          {/* Lesson Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-(--accent)/10 text-(--accent) border border-(--accent)/20 mono text-[10px] font-bold uppercase tracking-widest">
                Lesson {activeLesson + 1}
              </span>
              <div className="h-px flex-1 bg-white/5"></div>
            </div>
            <h2 className="text-5xl font-extrabold mb-8 tracking-tighter leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
              {lesson.title}
            </h2>
          </div>

          {/* Main Lesson Content */}
          <div className="mb-12 relative">
            <div className="absolute -left-6 top-0 bottom-0 w-[2px] bg-linear-to-b from-(--accent) via-(--accent)/20 to-transparent"></div>
            <div className="mb-8">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {lesson.content}
              </ReactMarkdown>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {lesson.noobDefinition && (
                <div className="p-6 rounded-2xl bg-(--accent)/5 border border-(--accent)/20 relative overflow-hidden group">
                  <div className="absolute -right-2 -bottom-2 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                    <span className="text-6xl font-black">?</span>
                  </div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest mb-3 text-(--accent) flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-(--accent)"></span>
                    Explain like I'm 5
                  </h4>
                  <p className="text-sm leading-relaxed text-(--text)/80 italic">
                    "{lesson.noobDefinition}"
                  </p>
                </div>
              )}
              {lesson.realWorldExample && (
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden group">
                  <div className="absolute -right-2 -bottom-2 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                    <span className="text-6xl font-black">💡</span>
                  </div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest mb-3 text-(--muted) flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-(--muted)"></span>
                    Real World Example
                  </h4>
                  <p className="text-sm leading-relaxed text-(--text)/80">
                    {lesson.realWorldExample}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* VERTICAL STACKED LAYOUT */}
          <div className="space-y-12 mb-12">
            {/* 1. Interactive Visualization (Full Width) */}
            {lesson.vizType && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-(--muted) flex items-center gap-2 px-1">
                  Interactive Visualization
                </h3>
                <div className="p-1 rounded-3xl bg-white/5 border border-white/10 overflow-hidden shadow-2xl">
                  <InteractiveViz type={lesson.vizType} color={color} />
                </div>
              </div>
            )}

            {/* 2. Key Takeaways & Formula (Full Width) */}
            {(lesson.formula || (lesson.keyPoints && lesson.keyPoints.length > 0)) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {lesson.formula && (
                  <div className="p-8 rounded-3xl bg-black/40 border border-white/5 backdrop-blur-xl relative overflow-hidden flex flex-col justify-center">
                    <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl">∑</div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest mb-4 text-(--muted)">Mathematical Foundation</h4>
                    <p className="text-2xl font-bold mono tracking-tighter text-white">
                      {lesson.formula}
                    </p>
                  </div>
                )}
                {lesson.keyPoints && lesson.keyPoints.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-(--accent) flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-(--accent) animate-pulse"></span>
                      Key Takeaways
                    </h3>
                    <div className="grid gap-3">
                      {lesson.keyPoints.map((point, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-(--accent)/30 transition-colors flex gap-4 items-start"
                        >
                          <span className="text-(--accent) mt-0.5">✦</span>
                          <span className="text-sm text-(--muted) leading-relaxed">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. Code Example & Video (Full Width) */}
            <div className="space-y-8">
              {lesson.codeExample && (
                <div className="rounded-3xl bg-[#0a0a0f] border border-white/5 overflow-hidden flex flex-col shadow-2xl min-h-[400px]">
                  <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/2">
                    <div className="flex items-center gap-4">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
                      </div>
                      <span className="mono text-[10px] uppercase tracking-widest text-(--muted)">
                        {lesson.codeExample.language} implementation
                      </span>
                    </div>
                    <button
                      onClick={copyCode}
                      className="px-3 py-1 rounded-lg text-[10px] mono transition-all border border-white/10 bg-white/5 hover:bg-white/10"
                      style={{ color }}
                    >
                      {codeCopied ? 'COPIED' : 'COPY'}
                    </button>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <Suspense fallback={<div className="p-6 mono text-[10px] text-(--muted)">Initializing code viewer...</div>}>
                      <SyntaxHighlighterFull
                        language={lesson.codeExample.language.toLowerCase()}
                        style={vscDarkPlus}
                        customStyle={{
                          margin: 0,
                          padding: '24px',
                          fontSize: '0.875rem',
                          lineHeight: '1.6',
                          background: 'transparent',
                          height: '100%',
                        }}
                        codeTagProps={{
                          style: {
                            fontFamily: 'inherit',
                          }
                        }}
                      >
                        {lesson.codeExample.code}
                      </SyntaxHighlighterFull>
                    </Suspense>
                  </div>
                </div>
              )}

              {lesson.videoUrl && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-(--muted) flex items-center gap-2 px-1">
                    Visionary Brief
                  </h3>
                  <div className="aspect-video rounded-3xl bg-(--bg3) border border-white/5 flex items-center justify-center relative group overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                    <div className="relative z-10 text-center">
                      <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                      </div>
                      <p className="mono text-[10px] uppercase tracking-widest">Load Stream</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="pt-12 border-t border-white/5 grid grid-cols-2 gap-6">
            <button
              onClick={() => {
                if (activeLesson === 0) {
                  onPrevTopic?.();
                } else {
                  onActiveLessonChange(activeLesson - 1);
                  window.scrollTo(0, 0);
                }
              }}
              className="group flex flex-col items-start p-6 rounded-2xl transition-all border border-white/5 bg-white/2 hover:bg-white/5 hover:border-white/10 cursor-pointer text-left"
            >
              <span className="mono text-[9px] uppercase tracking-[0.2em] text-(--muted) mb-2 group-hover:text-(--text) transition-colors">
                ← Previous
              </span>
              <span className="text-sm font-bold tracking-tight text-white/70 group-hover:text-white transition-colors">
                {activeLesson === 0 ? 'Previous Topic' : lessons[activeLesson - 1].title}
              </span>
            </button>

            <button
              onClick={() => {
                if (activeLesson === lessons.length - 1) {
                  onNextTopic?.();
                } else {
                  onActiveLessonChange(activeLesson + 1);
                  window.scrollTo(0, 0);
                }
              }}
              className="group flex flex-col items-end p-6 rounded-2xl transition-all border border-(--accent)/20 bg-(--accent)/5 hover:bg-(--accent)/10 hover:border-(--accent)/40 cursor-pointer text-right"
            >
              <span className="mono text-[9px] uppercase tracking-[0.2em] text-(--accent) mb-2 opacity-70 group-hover:opacity-100 transition-opacity">
                {activeLesson === lessons.length - 1 && isLastTopic ? 'Completion' : 'Next →'}
              </span>
              <span className="text-sm font-bold tracking-tight text-(--accent) group-hover:brightness-110 transition-all">
                {activeLesson === lessons.length - 1 
                  ? (isLastTopic ? 'Finish Roadmap' : (nextTopicLabel || 'Next Topic'))
                  : lessons[activeLesson + 1].title}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
