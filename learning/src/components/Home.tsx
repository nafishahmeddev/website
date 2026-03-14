import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PHASES, TOTAL, DIFF_COLORS, DIFF_LABELS } from '../data/roadmap';

export function Home() {
  const navigate = useNavigate();
  const [done, setDone] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('ml-roadmap-v2');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  
  const [collapsed, setCollapsed] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('ml-collapsed');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const progressPct = Math.round((done.size / TOTAL) * 100);

  const togglePhase = (id: string) => {
    setCollapsed(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      localStorage.setItem('ml-collapsed', JSON.stringify([...next]));
      return next;
    });
  };

  const handleReset = () => {
    if (confirm('Reset all progress?')) {
      setDone(new Set());
      localStorage.setItem('ml-roadmap-v2', JSON.stringify([]));
    }
  };

  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 anim-in">
      {/* Background blobs */}
      <div className="blob w-96 h-96 opacity-10" style={{ background: 'var(--accent)', top: '-100px', left: '-100px' }}></div>
      <div className="blob w-80 h-80 opacity-5" style={{ background: 'var(--accent2)', top: '40%', right: '-80px', animationDelay: '3s' }}></div>

      {/* Header */}
      <div className="mb-12 relative">
        <div className="flex items-center gap-3 mb-6">
          <span className="pill bg-(--accent)/10 text-(--accent) border border-(--accent)/20">v1.0</span>
          <span className="pill bg-white/5 text-[#64748B] border border-white/10 uppercase tracking-tighter font-bold">FOR WEB DEVS</span>
        </div>
        <h1 className="text-6xl font-extrabold leading-[0.9] mb-4 tracking-tighter" style={{ fontFamily: 'Syne, sans-serif' }}>
          Machine Learning<br/>
          <span className="text-(--accent) drop-shadow-[0_0_15px_rgba(110,231,183,0.3)]">Roadmap</span>
        </h1>
        <p className="text-(--muted) text-lg max-w-xl leading-relaxed" style={{ fontWeight: 400 }}>
          A structured path from zero to deployment — built for Node.js & PHP developers who think in APIs, not notebooks.
        </p>
      </div>

      {/* Overall progress */}
      <div className="phase-block mb-12 bg-[#111118]/60 backdrop-blur-md border border-[#1E1E2E]">
        <div className="p-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-(--muted) mono">System Integrity</span>
            <span className="mono text-sm font-bold text-(--accent)">{done.size} / {TOTAL} TOPICS</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden bg-white/5">
            <div className="master-bar-fill" style={{ width: `${progressPct}%` }}></div>
          </div>
          <div className="flex justify-between mt-3">
            <span className="mono text-[10px] text-(--muted) font-bold uppercase tracking-wider">Initialization</span>
            <span className="mono text-[10px] text-(--muted) font-bold uppercase tracking-wider">{progressPct}%</span>
            <span className="mono text-[10px] text-(--muted) font-bold uppercase tracking-wider">Core Deployment</span>
          </div>
        </div>
        {/* Phase mini progress row */}
        <div className="border-t flex divide-x" style={{ borderColor: 'var(--border)' }}>
          {PHASES.map(phase => {
            const phaseDoneCount = phase.topics.filter(t => done.has(t.id)).length;
            const phasePct = Math.round((phaseDoneCount / phase.topics.length) * 100);
            const r = 14, circ = 2 * Math.PI * r;
            const offset = circ - (circ * phasePct / 100);
            
            return (
              <div key={phase.id} className="flex-1 flex flex-col items-center justify-center py-4 gap-1" style={{ minWidth: 0 }}>
                <svg width="36" height="36" viewBox="0 0 36 36">
                  <circle className="ring-track" cx="18" cy="18" r={r} strokeWidth="2.5"/>
                  <circle 
                    className="ring-fill" 
                    cx="18" cy="18" r={r} strokeWidth="2.5"
                    style={{ 
                      stroke: phase.color, 
                      strokeDasharray: circ, 
                      strokeDashoffset: offset 
                    }}
                  />
                  <text x="18" y="22" textAnchor="middle" fontSize="9" fill={phase.color} className="mono">{phasePct}%</text>
                </svg>
                <span className="mono text-center" style={{ fontSize: '9px', color: 'var(--muted)', lineHeight: 1.3 }}>
                  {phaseDoneCount}/{phase.topics.length}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Phases container */}
      <div className="space-y-4">
        {PHASES.map((phase, pi) => {
          const isCollapsed = collapsed.has(phase.id);
          const doneCt = phase.topics.filter(t => done.has(t.id)).length;
          
          return (
            <div key={phase.id} className="fade-up" style={{ animationDelay: `${pi * 0.1}s` }}>
              {pi > 0 && <div className="phase-connector"></div>}
              <div className="phase-block bg-[#111118]/40 backdrop-blur-sm border border-[#1E1E2E]">
                <div 
                  className={`phase-header py-7 px-8 ${isCollapsed ? 'collapsed-header' : ''}`} 
                  onClick={() => togglePhase(phase.id)}
                >
                  <div 
                    className="phase-num w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black shrink-0 shadow-lg"
                    style={{ background: `${phase.color}10`, border: `1px solid ${phase.color}20`, color: phase.color }}
                  >
                    {phase.icon}
                  </div>
                  <div className="flex-1 min-w-0 text-left px-2">
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <span className="mono text-[10px] uppercase font-bold tracking-widest" style={{ color: phase.color }}>{phase.label}</span>
                      <span className="mono text-[10px] text-(--muted) font-bold lowercase opacity-60">// {phase.duration}</span>
                    </div>
                    <div className="phase-title text-xl font-extrabold tracking-tight text-white mb-1 leading-tight">{phase.title}</div>
                    <div className="text-[13px] leading-relaxed text-(--muted) font-normal max-w-lg">{phase.desc}</div>
                  </div>
                  <div className="flex items-center gap-5 shrink-0 ml-4">
                    <div className="text-right">
                      <div className="mono text-base font-black leading-none mb-1" style={{ color: phase.color }}>{doneCt}<span className="text-(--muted) opacity-40 mx-0.5 text-xs">/</span>{phase.topics.length}</div>
                      <div className="mono text-[9px] uppercase font-bold tracking-widest text-(--muted)">Status</div>
                    </div>
                    <svg className="chevron shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                <div 
                  className={`phase-content ${isCollapsed ? 'collapsed' : ''}`}
                  style={{ maxHeight: isCollapsed ? 0 : '3000px', transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
                >
                  <div className="px-6 pb-8 pt-2">
                    <div className="mb-6 h-px bg-(--border) opacity-50"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {phase.topics.map(topic => {
                        const isTopicDone = done.has(topic.id);
                        const di = topic.diff - 1;
                        
                        return (
                          <div 
                            key={topic.id}
                            className={`topic-card ${isTopicDone ? 'done' : ''} fade-up`}
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/topic/${topic.slug}`);
                            }}
                          >
                            <div className="flex items-start gap-4 mb-4">
                              <div className="cb mt-1">
                                {isTopicDone && (
                                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                    <path d="M1 4l3 3 5-6" stroke="#0a0a0f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-bold text-[15px] leading-snug mb-2 text-white">{topic.title}</div>
                                <div className="text-[13px] leading-relaxed text-(--muted) font-normal">{topic.desc}</div>
                              </div>
                            </div>
                            <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
                              <span className="pill py-1 px-3 bg-white/5 text-(--muted) border border-white/10 uppercase text-[9px] font-bold tracking-widest">
                                {topic.tag}
                              </span>
                              <div className="relative group/tip flex items-center gap-2">
                                <div className="diff" style={{ background: DIFF_COLORS[di], boxShadow: `0 0 8px ${DIFF_COLORS[di]}40` }}></div>
                                <span className="text-[10px] text-(--muted) mono font-bold opacity-0 group-hover/tip:opacity-100 transition-opacity">
                                  {DIFF_LABELS[di]}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-16 pt-8 border-t flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
        <span className="mono text-xs" style={{ color: 'var(--muted)' }}>// progress saved in localStorage</span>
        <button 
          onClick={handleReset}
          className="mono text-xs px-4 py-2 rounded-lg transition-all hover:text-red-400"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--muted)' }}
        >
          reset progress
        </button>
      </div>
    </div>
  );
}
