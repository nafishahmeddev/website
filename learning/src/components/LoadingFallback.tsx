import type { FC } from 'react';

export const LoadingFallback: FC = () => {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" 
      style={{ background: 'var(--bg)' }}
    >
      {/* Background blobs for aesthetic consistency */}
      <div className="blob w-96 h-96 opacity-10" style={{ background: '#00ff9d', top: '20%', left: '10%' }}></div>
      <div className="blob w-80 h-80 opacity-5" style={{ background: '#ff6b35', bottom: '20%', right: '10%', animationDelay: '3s' }}></div>
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated logo/loader */}
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute inset-0 border-2 border-(--accent) opacity-20 rounded-xl rotate-45 animate-pulse"></div>
          <div className="absolute inset-2 border-2 border-(--accent) opacity-40 rounded-lg -rotate-12 animate-spin" style={{ animationDuration: '3s' }}></div>
          <div className="absolute inset-4 border-2 border-(--accent) rounded-lg rotate-12 animate-spin" style={{ animationDuration: '2s' }}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-(--accent) rounded-full shadow-[0_0_15px_var(--accent)]"></div>
          </div>
        </div>
        
        <h2 className="text-xl font-bold tracking-tight mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
          Initialising <span className="text-(--accent)">Intelligence</span>
        </h2>
        <div className="flex gap-1.5">
          <div className="w-1 h-1 bg-(--accent) rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-1 h-1 bg-(--accent) rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-1 h-1 bg-(--accent) rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        
        <div className="mt-12 opacity-20 font-mono text-[10px] tracking-widest uppercase">
          Neural Pathways Connecting...
        </div>
      </div>
      
      {/* Scanline effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-5">
        <div className="w-full h-[2px] bg-(--accent) absolute top-0 animate-scan"></div>
      </div>
    </div>
  );
};
