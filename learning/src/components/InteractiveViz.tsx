import { useState, useEffect, useRef } from 'react';

export type VizType =
  | 'gradient-descent'
  | 'neural-network'
  | 'linear-regression'
  | 'logistic-sigmoid'
  | 'decision-tree'
  | 'random-forest'
  | 'kmeans'
  | 'pca-viz'
  | 'cnn-conv'
  | 'attention-heatmap'
  | 'roc-curve'
  | 'bias-variance'
  | 'confusion-matrix'
  | 'probability-dist'
  | 'vector-space'
  | 'backprop'
  | 'rnn-unroll'
  | 'rag-arch';

interface InteractiveVizProps {
  type: VizType;
  color?: string;
}

/* ─── Gradient Descent ─── */
function GradientDescentViz({ color }: { color: string }) {
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const lr = 0.15;
  const maxSteps = 30;

  // Loss fn: f(x) = x^2, starting at x=-2.5
  const startX = -2.5;
  const getX = (s: number) => {
    let x = startX;
    for (let i = 0; i < s; i++) x = x - lr * 2 * x;
    return x;
  };

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => {
      if (step >= maxSteps) {
        setRunning(false);
      } else {
        setStep(s => s + 1);
      }
    }, 100);
    return () => clearTimeout(t);
  }, [running, step]);

  const x = getX(step);
  const loss = x * x;

  const W = 360, H = 220;
  const cx = (v: number) => W / 2 + v * 55;
  const cy = (v: number) => H - 20 - v * 30;

  const pathPoints = Array.from({ length: 61 }, (_, i) => {
    const px = -3 + i * 0.1;
    return `${i === 0 ? 'M' : 'L'}${cx(px)},${cy(px * px)}`;
  }).join(' ');

  const trailPoints = Array.from({ length: step + 1 }, (_, i) => {
    const tx = getX(i);
    return `${i === 0 ? 'M' : 'L'}${cx(tx)},${cy(tx * tx)}`;
  }).join(' ');

  return (
    <div className="text-center">
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: W, borderRadius: '12px', background: 'var(--bg3)' }}>
        {/* Axes */}
        <line x1={20} y1={H - 20} x2={W - 10} y2={H - 20} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
        <line x1={W / 2} y1={10} x2={W / 2} y2={H - 20} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
        {/* Loss curve */}
        <path d={pathPoints} fill="none" stroke={`${color}40`} strokeWidth={2} />
        {/* Trail */}
        {step > 0 && <path d={trailPoints} fill="none" stroke={color} strokeWidth={1.5} strokeDasharray="3,3" opacity={0.6} />}
        {/* Gradient tangent */}
        <line
          x1={cx(x - 0.6)} y1={cy((x - 0.6) * (x - 0.6))}
          x2={cx(x + 0.6)} y2={cy((x + 0.6) * (x + 0.6))}
          stroke="#ff6b35" strokeWidth={1.5} opacity={0.7}
        />
        {/* Ball */}
        <circle cx={cx(x)} cy={cy(loss)} r={7} fill={color} />
        <text x={cx(x)} y={cy(loss) - 14} textAnchor="middle" fill={color} fontSize={11} fontFamily="Space Mono">
          loss={loss.toFixed(3)}
        </text>
        {/* Labels */}
        <text x={W / 2 + 5} y={15} fill="rgba(255,255,255,0.3)" fontSize={10} fontFamily="Space Mono">loss</text>
        <text x={W - 25} y={H - 5} fill="rgba(255,255,255,0.3)" fontSize={10} fontFamily="Space Mono">w</text>
        <text x={12} y={H - 5} fill={color} fontSize={10} fontFamily="Space Mono">step:{step}</text>
      </svg>
      <div className="flex gap-3 justify-center mt-4">
        <button
          onClick={() => { setStep(0); setRunning(true); }}
          style={{ padding: '6px 18px', borderRadius: '8px', background: `${color}20`, color, border: `1px solid ${color}40`, cursor: 'pointer', fontFamily: 'Space Mono', fontSize: '12px' }}
        >
          ▶ Run
        </button>
        <button
          onClick={() => { setRunning(false); setStep(0); }}
          style={{ padding: '6px 18px', borderRadius: '8px', background: 'var(--bg2)', color: 'var(--muted)', border: '1px solid var(--border)', cursor: 'pointer', fontFamily: 'Space Mono', fontSize: '12px' }}
        >
          ↺ Reset
        </button>
      </div>
      <p style={{ color: 'var(--muted)', fontSize: '11px', marginTop: '8px', fontFamily: 'Space Mono' }}>
        Click Run to watch the ball roll down the loss surface using gradient descent
      </p>
    </div>
  );
}

/* ─── Neural Network ─── */
function NeuralNetworkViz({ color }: { color: string }) {
  const [animStep, setAnimStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const layerSizes = [4, 5, 3, 2];
  const maxLayer = layerSizes.length;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => {
      if (animStep >= maxLayer - 1) {
        setRunning(false);
        setAnimStep(-1);
      } else {
        setAnimStep(s => s + 1);
      }
    }, 600);
    return () => clearTimeout(t);
  }, [running, animStep, maxLayer]);

  const W = 380, H = 240;
  const layerX = (i: number) => 50 + i * (W - 80) / (maxLayer - 1);
  const nodeY = (layer: number, idx: number) => {
    const n = layerSizes[layer];
    const spacing = Math.min(44, (H - 40) / n);
    return H / 2 - ((n - 1) * spacing) / 2 + idx * spacing;
  };

  return (
    <div className="text-center">
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: W, borderRadius: '12px', background: 'var(--bg3)' }}>
        {/* Connections */}
        {layerSizes.slice(0, -1).map((n, li) =>
          Array.from({ length: n }, (_, ni) =>
            Array.from({ length: layerSizes[li + 1] }, (_, nj) => (
              <line
                key={`${li}-${ni}-${nj}`}
                x1={layerX(li)} y1={nodeY(li, ni)}
                x2={layerX(li + 1)} y2={nodeY(li + 1, nj)}
                stroke={animStep > li ? `${color}50` : 'rgba(255,255,255,0.06)'}
                strokeWidth={animStep > li ? 1.2 : 0.8}
              />
            ))
          )
        )}
        {/* Nodes */}
        {layerSizes.map((n, li) =>
          Array.from({ length: n }, (_, ni) => {
            const active = animStep >= li;
            return (
              <g key={`${li}-${ni}`}>
                <circle
                  cx={layerX(li)} cy={nodeY(li, ni)} r={10}
                  fill={active ? `${color}30` : 'var(--bg2)'}
                  stroke={active ? color : 'rgba(255,255,255,0.15)'}
                  strokeWidth={active ? 1.5 : 1}
                />
                {active && <circle cx={layerX(li)} cy={nodeY(li, ni)} r={4} fill={color} opacity={0.8} />}
              </g>
            );
          })
        )}
        {/* Layer labels */}
        {['Input', 'Hidden', 'Hidden', 'Output'].map((label, i) => (
          <text key={i} x={layerX(i)} y={H - 8} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={10} fontFamily="Space Mono">
            {label}
          </text>
        ))}
      </svg>
      <div className="flex gap-3 justify-center mt-4">
        <button
          onClick={() => { setAnimStep(0); setRunning(true); }}
          style={{ padding: '6px 18px', borderRadius: '8px', background: `${color}20`, color, border: `1px solid ${color}40`, cursor: 'pointer', fontFamily: 'Space Mono', fontSize: '12px' }}
        >
          ▶ Forward Pass
        </button>
        <button
          onClick={() => { setRunning(false); setAnimStep(-1); }}
          style={{ padding: '6px 18px', borderRadius: '8px', background: 'var(--bg2)', color: 'var(--muted)', border: '1px solid var(--border)', cursor: 'pointer', fontFamily: 'Space Mono', fontSize: '12px' }}
        >
          ↺ Reset
        </button>
      </div>
      <p style={{ color: 'var(--muted)', fontSize: '11px', marginTop: '8px', fontFamily: 'Space Mono' }}>
        Watch signal propagate layer-by-layer during the forward pass
      </p>
    </div>
  );
}

/* ─── Linear Regression ─── */
function LinearRegressionViz({ color }: { color: string }) {
  const [showLine, setShowLine] = useState(true);
  const [showResiduals, setShowResiduals] = useState(false);

  const W = 360, H = 220;
  const data = [
    [30, 120], [50, 160], [70, 200], [90, 195], [110, 240],
    [130, 280], [150, 310], [170, 330], [40, 100], [80, 175],
    [120, 260], [160, 350],
  ];
  const minX = 20, maxX = 180, minY = 80, maxY = 370;
  const px = (x: number) => 30 + ((x - minX) / (maxX - minX)) * (W - 50);
  const py = (y: number) => H - 20 - ((y - minY) / (maxY - minY)) * (H - 40);

  // Simple linear regression
  const n = data.length;
  const sumX = data.reduce((s, d) => s + d[0], 0);
  const sumY = data.reduce((s, d) => s + d[1], 0);
  const sumXY = data.reduce((s, d) => s + d[0] * d[1], 0);
  const sumX2 = data.reduce((s, d) => s + d[0] * d[0], 0);
  const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const b = (sumY - m * sumX) / n;
  const lineY = (x: number) => m * x + b;

  return (
    <div className="text-center">
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: W, borderRadius: '12px', background: 'var(--bg3)' }}>
        {/* Axes */}
        <line x1={30} y1={H - 20} x2={W - 10} y2={H - 20} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
        <line x1={30} y1={10} x2={30} y2={H - 20} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
        {/* Residuals */}
        {showResiduals && data.map(([x, y], i) => (
          <line
            key={i}
            x1={px(x)} y1={py(y)}
            x2={px(x)} y2={py(lineY(x))}
            stroke="#ff6b35" strokeWidth={1.5} opacity={0.6}
          />
        ))}
        {/* Regression line */}
        {showLine && (
          <line
            x1={px(minX)} y1={py(lineY(minX))}
            x2={px(maxX)} y2={py(lineY(maxX))}
            stroke={color} strokeWidth={2}
          />
        )}
        {/* Data points */}
        {data.map(([x, y], i) => (
          <circle key={i} cx={px(x)} cy={py(y)} r={5} fill={`${color}60`} stroke={color} strokeWidth={1} />
        ))}
        {/* Formula */}
        <text x={W - 120} y={25} fill={color} fontSize={10} fontFamily="Space Mono">
          y = {m.toFixed(2)}x + {b.toFixed(0)}
        </text>
        <text x={35} y={20} fill="rgba(255,255,255,0.3)" fontSize={10} fontFamily="Space Mono">y</text>
        <text x={W - 20} y={H - 5} fill="rgba(255,255,255,0.3)" fontSize={10} fontFamily="Space Mono">x</text>
      </svg>
      <div className="flex gap-3 justify-center mt-4 flex-wrap">
        <button
          onClick={() => setShowLine(v => !v)}
          style={{ padding: '6px 18px', borderRadius: '8px', background: showLine ? `${color}20` : 'var(--bg2)', color: showLine ? color : 'var(--muted)', border: `1px solid ${showLine ? color + '40' : 'var(--border)'}`, cursor: 'pointer', fontFamily: 'Space Mono', fontSize: '12px' }}
        >
          {showLine ? '✓' : '○'} Best-fit line
        </button>
        <button
          onClick={() => setShowResiduals(v => !v)}
          style={{ padding: '6px 18px', borderRadius: '8px', background: showResiduals ? 'rgba(255,107,53,0.2)' : 'var(--bg2)', color: showResiduals ? '#ff6b35' : 'var(--muted)', border: `1px solid ${showResiduals ? '#ff6b3540' : 'var(--border)'}`, cursor: 'pointer', fontFamily: 'Space Mono', fontSize: '12px' }}
        >
          {showResiduals ? '✓' : '○'} Residuals
        </button>
      </div>
    </div>
  );
}

/* ─── Logistic Sigmoid ─── */
function LogisticSigmoidViz({ color }: { color: string }) {
  const [threshold, setThreshold] = useState(0.5);
  const W = 360, H = 200;
  const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));
  const px = (x: number) => W / 2 + x * 35;
  const py = (y: number) => H - 20 - y * (H - 40);

  const points = Array.from({ length: 100 }, (_, i) => {
    const x = -5 + i * 0.1;
    return `${i === 0 ? 'M' : 'L'}${px(x)},${py(sigmoid(x))}`;
  }).join(' ');

  const tY = py(threshold);
  const tX = px(Math.log(threshold / (1 - threshold)));

  return (
    <div className="text-center">
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: W, borderRadius: '12px', background: 'var(--bg3)' }}>
        {/* Threshold line */}
        <line x1={20} y1={tY} x2={W - 10} y2={tY} stroke="#ff6b35" strokeWidth={1} strokeDasharray="4,3" opacity={0.6} />
        <text x={25} y={tY - 5} fill="#ff6b35" fontSize={10} fontFamily="Space Mono">threshold={threshold.toFixed(2)}</text>
        {/* Regions */}
        <rect x={20} y={tY} width={W - 30} height={H - 20 - tY} fill="rgba(255,107,53,0.06)" />
        <text x={W - 80} y={tY + 20} fill="#ff6b35" fontSize={9} fontFamily="Space Mono">class 0</text>
        <rect x={20} y={10} width={W - 30} height={tY - 10} fill={`${color}06`} />
        <text x={W - 80} y={tY - 10} fill={color} fontSize={9} fontFamily="Space Mono">class 1</text>
        {/* Axes */}
        <line x1={20} y1={H - 20} x2={W - 10} y2={H - 20} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
        <line x1={W / 2} y1={10} x2={W / 2} y2={H - 20} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
        {/* 0.5 line */}
        <line x1={20} y1={py(0.5)} x2={W - 10} y2={py(0.5)} stroke="rgba(255,255,255,0.1)" strokeWidth={1} strokeDasharray="2,4" />
        {/* Sigmoid curve */}
        <path d={points} fill="none" stroke={color} strokeWidth={2.5} />
        {/* Threshold point */}
        <circle cx={tX} cy={tY} r={6} fill="#ff6b35" />
        <text x={10} y={20} fill="rgba(255,255,255,0.3)" fontSize={10} fontFamily="Space Mono">P(y=1)</text>
        <text x={W - 15} y={H - 5} fill="rgba(255,255,255,0.3)" fontSize={10} fontFamily="Space Mono">z</text>
      </svg>
      <div className="flex items-center gap-3 justify-center mt-4">
        <span style={{ fontFamily: 'Space Mono', fontSize: '11px', color: 'var(--muted)' }}>Threshold:</span>
        <input
          type="range" min="0.1" max="0.9" step="0.05" value={threshold}
          onChange={e => setThreshold(Number(e.target.value))}
          style={{ accentColor: color, width: '120px' }}
        />
        <span style={{ fontFamily: 'Space Mono', fontSize: '11px', color }}>{threshold.toFixed(2)}</span>
      </div>
    </div>
  );
}

/* ─── Decision Tree ─── */
function DecisionTreeViz({ color }: { color: string }) {
  const W = 380, H = 240;
  const nodes = [
    { x: 190, y: 30, label: 'age > 30?', isLeaf: false },
    { x: 90, y: 100, label: 'income > 50k?', isLeaf: false },
    { x: 290, y: 100, label: 'credit > 700?', isLeaf: false },
    { x: 40, y: 175, label: 'Reject', isLeaf: true, cls: false },
    { x: 140, y: 175, label: 'Approve', isLeaf: true, cls: true },
    { x: 240, y: 175, label: 'Review', isLeaf: true, cls: null },
    { x: 340, y: 175, label: 'Approve', isLeaf: true, cls: true },
  ];
  const edges = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]];
  const edgeLabels = ['No', 'Yes', 'No', 'Yes', 'No', 'Yes'];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: W, borderRadius: '12px', background: 'var(--bg3)' }}>
      {edges.map(([from, to], i) => (
        <g key={i}>
          <line
            x1={nodes[from].x} y1={nodes[from].y + 16}
            x2={nodes[to].x} y2={nodes[to].y - 16}
            stroke="rgba(255,255,255,0.2)" strokeWidth={1.5}
          />
          <text
            x={(nodes[from].x + nodes[to].x) / 2 + (i % 2 === 0 ? -14 : 8)}
            y={(nodes[from].y + nodes[to].y) / 2}
            fill="rgba(255,255,255,0.4)" fontSize={9} fontFamily="Space Mono"
          >
            {edgeLabels[i]}
          </text>
        </g>
      ))}
      {nodes.map((node, i) => (
        <g key={i}>
          {node.isLeaf ? (
            <>
              <rect
                x={node.x - 32} y={node.y - 14} width={64} height={28} rx={14}
                fill={node.cls === true ? `${color}30` : node.cls === false ? 'rgba(255,107,53,0.3)' : 'rgba(255,190,0,0.3)'}
                stroke={node.cls === true ? color : node.cls === false ? '#ff6b35' : '#ffbe00'}
                strokeWidth={1.5}
              />
              <text x={node.x} y={node.y + 5} textAnchor="middle" fill={node.cls === true ? color : node.cls === false ? '#ff6b35' : '#ffbe00'} fontSize={10} fontWeight="bold" fontFamily="Space Mono">
                {node.label}
              </text>
            </>
          ) : (
            <>
              <rect
                x={node.x - 52} y={node.y - 16} width={104} height={32} rx={8}
                fill="var(--bg2)" stroke={color} strokeWidth={1.5}
              />
              <text x={node.x} y={node.y + 5} textAnchor="middle" fill={color} fontSize={11} fontFamily="Space Mono">
                {node.label}
              </text>
            </>
          )}
        </g>
      ))}
    </svg>
  );
}

/* ─── K-Means ─── */
function KMeansViz({ color }: { color: string }) {
  const colors = [color, '#ff6b35', '#b855ff'];
  const seed = [
    [[60, 70], [80, 90], [50, 80], [70, 60], [90, 75]],
    [[220, 80], [240, 60], [200, 70], [260, 90], [230, 50]],
    [[140, 190], [160, 210], [120, 200], [150, 170], [170, 195]],
  ];
  const [iteration, setIteration] = useState(0);
  const maxIter = 3;

  const centroids = [
    [[70, 75], [200, 65], [145, 195]],
    [[74, 75], [230, 74], [148, 194]],
    [[74, 75], [230, 74], [148, 194]],
    [[74, 75], [230, 74], [148, 194]],
  ];

  const W = 360, H = 240;

  return (
    <div className="text-center">
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: W, borderRadius: '12px', background: 'var(--bg3)' }}>
        {seed.map((cluster, ci) =>
          cluster.map(([x, y], pi) => (
            <circle key={`${ci}-${pi}`} cx={x} cy={y} r={6} fill={`${colors[ci]}60`} stroke={colors[ci]} strokeWidth={1.2} />
          ))
        )}
        {centroids[Math.min(iteration, maxIter)].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r={12} fill={`${colors[i]}20`} stroke={colors[i]} strokeWidth={2} strokeDasharray="4,2" />
            <text x={cx} y={cy + 4} textAnchor="middle" fill={colors[i]} fontSize={12} fontWeight="bold">✕</text>
          </g>
        ))}
        <text x={10} y={20} fill="rgba(255,255,255,0.3)" fontSize={10} fontFamily="Space Mono">
          Iteration: {iteration}/{maxIter}
        </text>
      </svg>
      <div className="flex gap-3 justify-center mt-4">
        <button
          onClick={() => setIteration(i => Math.min(i + 1, maxIter))}
          disabled={iteration >= maxIter}
          style={{ padding: '6px 18px', borderRadius: '8px', background: `${color}20`, color, border: `1px solid ${color}40`, cursor: 'pointer', fontFamily: 'Space Mono', fontSize: '12px', opacity: iteration >= maxIter ? 0.4 : 1 }}
        >
          Next Step →
        </button>
        <button
          onClick={() => setIteration(0)}
          style={{ padding: '6px 18px', borderRadius: '8px', background: 'var(--bg2)', color: 'var(--muted)', border: '1px solid var(--border)', cursor: 'pointer', fontFamily: 'Space Mono', fontSize: '12px' }}
        >
          ↺ Reset
        </button>
      </div>
      <p style={{ color: 'var(--muted)', fontSize: '11px', marginTop: '8px', fontFamily: 'Space Mono' }}>
        ✕ = centroid  ● = data point — step through k-means iterations
      </p>
    </div>
  );
}

/* ─── PCA Viz ─── */
function PCAViz({ color }: { color: string }) {
  const [showProjection, setShowProjection] = useState(false);
  const W = 360, H = 220;
  const data = [
    [80, 60], [100, 80], [120, 95], [140, 110], [160, 130],
    [90, 75], [110, 85], [130, 100], [150, 120], [170, 145],
    [75, 50], [105, 70], [125, 90], [145, 125], [165, 135],
  ];
  // PC1 direction (approximate)
  const pcAngle = 0.65; // radians
  const pcCos = Math.cos(pcAngle);
  const pcSin = Math.sin(pcAngle);
  const cx = 120, cy = 110;

  const project = ([x, y]: number[]) => {
    const dx = x - cx, dy = y - cy;
    const t = dx * pcCos + dy * pcSin;
    return [cx + t * pcCos, cy + t * pcSin];
  };

  return (
    <div className="text-center">
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: W, borderRadius: '12px', background: 'var(--bg3)' }}>
        {/* PC1 axis */}
        <line
          x1={cx - 100 * pcCos} y1={cy - 100 * pcSin}
          x2={cx + 120 * pcCos} y2={cy + 120 * pcSin}
          stroke={color} strokeWidth={2} opacity={0.6}
        />
        <text x={cx + 125 * pcCos} y={cy + 125 * pcSin} fill={color} fontSize={11} fontFamily="Space Mono">PC1</text>
        {/* Projections */}
        {showProjection && data.map((pt, i) => {
          const [px, py] = project(pt);
          return (
            <line key={i} x1={pt[0]} y1={pt[1]} x2={px} y2={py} stroke="#ff6b35" strokeWidth={1} opacity={0.5} strokeDasharray="3,2" />
          );
        })}
        {/* Original points */}
        {data.map(([x, y], i) => {
          const [px, py] = project([x, y]);
          return (
            <g key={i}>
              <circle cx={x} cy={y} r={5} fill={`${color}50`} stroke={color} strokeWidth={1} opacity={showProjection ? 0.5 : 1} />
              {showProjection && <circle cx={px} cy={py} r={5} fill={color} />}
            </g>
          );
        })}
        <text x={10} y={20} fill="rgba(255,255,255,0.3)" fontSize={10} fontFamily="Space Mono">
          {showProjection ? '2D → 1D projection' : 'Original 2D data'}
        </text>
      </svg>
      <div className="flex gap-3 justify-center mt-4">
        <button
          onClick={() => setShowProjection(v => !v)}
          style={{ padding: '6px 18px', borderRadius: '8px', background: showProjection ? `${color}20` : 'var(--bg2)', color: showProjection ? color : 'var(--muted)', border: `1px solid ${showProjection ? color + '40' : 'var(--border)'}`, cursor: 'pointer', fontFamily: 'Space Mono', fontSize: '12px' }}
        >
          {showProjection ? 'Hide' : 'Show'} Projection
        </button>
      </div>
    </div>
  );
}

/* ─── CNN Convolution ─── */
function CNNConvViz({ color }: { color: string }) {
  const [pos, setPos] = useState({ r: 0, c: 0 });
  const [running, setRunning] = useState(false);

  const input = [
    [1, 2, 0, 1, 2], [0, 1, 3, 2, 1], [2, 0, 1, 0, 2],
    [1, 3, 2, 1, 0], [0, 1, 0, 2, 1],
  ];
  const filter = [[1, 0, -1], [1, 0, -1], [1, 0, -1]];
  const maxPos = 2;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => {
      setPos(p => {
        const nc = p.c + 1 > maxPos ? 0 : p.c + 1;
        const nr = nc === 0 ? p.r + 1 : p.r;
        if (nr > maxPos) { setRunning(false); return { r: 0, c: 0 }; }
        return { r: nr, c: nc };
      });
    }, 400);
    return () => clearTimeout(t);
  }, [running, pos]);

  const cellSize = 34;
  const W = 380, H = 230;
  const iStart = [20, 20];
  const fStart = [220, 60];
  const oStart = [300, 60];

  const convResult = (r: number, c: number) => {
    let sum = 0;
    for (let fr = 0; fr < 3; fr++)
      for (let fc = 0; fc < 3; fc++)
        sum += (input[r + fr]?.[c + fc] ?? 0) * filter[fr][fc];
    return sum;
  };

  return (
    <div className="text-center">
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: W, borderRadius: '12px', background: 'var(--bg3)' }}>
        {/* Input grid */}
        <text x={iStart[0]} y={15} fill="rgba(255,255,255,0.4)" fontSize={10} fontFamily="Space Mono">Input (5×5)</text>
        {input.map((row, r) => row.map((val, c) => {
          const inWindow = r >= pos.r && r < pos.r + 3 && c >= pos.c && c < pos.c + 3;
          return (
            <g key={`${r}-${c}`}>
              <rect x={iStart[0] + c * cellSize} y={iStart[1] + r * cellSize} width={cellSize} height={cellSize}
                fill={inWindow ? `${color}25` : 'var(--bg2)'}
                stroke={inWindow ? color : 'rgba(255,255,255,0.1)'} strokeWidth={inWindow ? 1.5 : 0.8}
              />
              <text x={iStart[0] + c * cellSize + cellSize / 2} y={iStart[1] + r * cellSize + cellSize / 2 + 4} textAnchor="middle"
                fill={inWindow ? color : 'rgba(255,255,255,0.4)'} fontSize={11} fontFamily="Space Mono">
                {val}
              </text>
            </g>
          );
        }))}
        {/* Filter grid */}
        <text x={fStart[0]} y={fStart[1] - 8} fill="rgba(255,255,255,0.4)" fontSize={10} fontFamily="Space Mono">Filter</text>
        {filter.map((row, r) => row.map((val, c) => (
          <g key={`f${r}-${c}`}>
            <rect x={fStart[0] + c * 26} y={fStart[1] + r * 26} width={26} height={26}
              fill={`${color}15`} stroke={color} strokeWidth={1} />
            <text x={fStart[0] + c * 26 + 13} y={fStart[1] + r * 26 + 18} textAnchor="middle"
              fill={color} fontSize={11} fontFamily="Space Mono">{val >= 0 ? '+' : ''}{val}
            </text>
          </g>
        )))}
        {/* Arrow */}
        <text x={fStart[0] + 42} y={fStart[1] + 45} fill="rgba(255,255,255,0.3)" fontSize={14}>→</text>
        {/* Output */}
        <text x={oStart[0]} y={fStart[1] - 8} fill="rgba(255,255,255,0.4)" fontSize={10} fontFamily="Space Mono">Output</text>
        {Array.from({ length: 3 }, (_, r) => Array.from({ length: 3 }, (_, c) => {
          const val = convResult(r, c);
          const isCurrent = r === pos.r && c === pos.c;
          return (
            <g key={`o${r}-${c}`}>
              <rect x={oStart[0] + c * 26} y={oStart[1] + r * 26} width={26} height={26}
                fill={isCurrent ? `${color}30` : (r <= pos.r ? `${color}15` : 'var(--bg2)')}
                stroke={isCurrent ? color : 'rgba(255,255,255,0.1)'} strokeWidth={isCurrent ? 1.5 : 0.8}
              />
              {(r < pos.r || (r === pos.r && c < pos.c) || isCurrent) && (
                <text x={oStart[0] + c * 26 + 13} y={oStart[1] + r * 26 + 18} textAnchor="middle"
                  fill={isCurrent ? color : 'rgba(255,255,255,0.4)'} fontSize={10} fontFamily="Space Mono">
                  {val}
                </text>
              )}
            </g>
          );
        }))}
        <text x={iStart[0]} y={H - 8} fill="rgba(255,255,255,0.25)" fontSize={9} fontFamily="Space Mono">
          pos=({pos.r},{pos.c}) → output={convResult(pos.r, pos.c)}
        </text>
      </svg>
      <div className="flex gap-3 justify-center mt-4">
        <button
          onClick={() => { setPos({ r: 0, c: 0 }); setRunning(true); }}
          style={{ padding: '6px 18px', borderRadius: '8px', background: `${color}20`, color, border: `1px solid ${color}40`, cursor: 'pointer', fontFamily: 'Space Mono', fontSize: '12px' }}
        >
          ▶ Animate
        </button>
        <button
          onClick={() => { setRunning(false); setPos({ r: 0, c: 0 }); }}
          style={{ padding: '6px 18px', borderRadius: '8px', background: 'var(--bg2)', color: 'var(--muted)', border: '1px solid var(--border)', cursor: 'pointer', fontFamily: 'Space Mono', fontSize: '12px' }}
        >
          ↺ Reset
        </button>
      </div>
    </div>
  );
}

/* ─── Attention Heatmap ─── */
function AttentionHeatmapViz({ color }: { color: string }) {
  const tokens = ['The', 'cat', 'sat', 'on', 'mat'];
  const n = tokens.length;
  const attention = [
    [0.8, 0.1, 0.05, 0.03, 0.02],
    [0.2, 0.6, 0.1, 0.05, 0.05],
    [0.05, 0.25, 0.55, 0.1, 0.05],
    [0.05, 0.05, 0.15, 0.65, 0.1],
    [0.05, 0.05, 0.1, 0.1, 0.7],
  ];

  const W = 320, H = 280;
  const cellSize = 44;
  const offsetX = 60, offsetY = 60;

  const hexColor = color.replace('#', '');
  const r = parseInt(hexColor.slice(0, 2), 16);
  const g = parseInt(hexColor.slice(2, 4), 16);
  const b = parseInt(hexColor.slice(4, 6), 16);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: W, borderRadius: '12px', background: 'var(--bg3)' }}>
      <text x={W / 2} y={15} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize={10} fontFamily="Space Mono">Attention Weights</text>
      {/* Col headers (key) */}
      {tokens.map((tok, j) => (
        <text key={j} x={offsetX + j * cellSize + cellSize / 2} y={48}
          textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={10} fontFamily="Space Mono">
          {tok}
        </text>
      ))}
      {/* Row headers (query) + cells */}
      {attention.map((row, i) => (
        <g key={i}>
          <text x={offsetX - 5} y={offsetY + i * cellSize + cellSize / 2 + 4}
            textAnchor="end" fill="rgba(255,255,255,0.5)" fontSize={10} fontFamily="Space Mono">
            {tokens[i]}
          </text>
          {row.map((val, j) => (
            <g key={j}>
              <rect
                x={offsetX + j * cellSize} y={offsetY + i * cellSize}
                width={cellSize} height={cellSize}
                fill={`rgba(${r},${g},${b},${val})`}
                stroke="rgba(255,255,255,0.05)" strokeWidth={0.5}
              />
              <text
                x={offsetX + j * cellSize + cellSize / 2} y={offsetY + i * cellSize + cellSize / 2 + 4}
                textAnchor="middle" fill={val > 0.4 ? '#0a0a0f' : 'rgba(255,255,255,0.6)'}
                fontSize={10} fontFamily="Space Mono">
                {val.toFixed(2)}
              </text>
            </g>
          ))}
        </g>
      ))}
      <text x={offsetX + n * cellSize / 2} y={H - 5} textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize={9} fontFamily="Space Mono">
        Key tokens →
      </text>
    </svg>
  );
}

/* ─── ROC Curve ─── */
function ROCCurveViz({ color }: { color: string }) {
  const W = 280, H = 240;
  const off = 30;
  const pts = [[0, 0], [0.1, 0.5], [0.2, 0.75], [0.35, 0.88], [0.5, 0.93], [0.7, 0.97], [1, 1]];
  const rocPath = pts.map(([x, y], i) =>
    `${i === 0 ? 'M' : 'L'}${off + x * (W - off - 10)},${H - off - y * (H - off - 10)}`
  ).join(' ');

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: W, borderRadius: '12px', background: 'var(--bg3)' }}>
      {/* AUC area */}
      <path d={`${rocPath} L${W - 10},${H - off} L${off},${H - off} Z`} fill={`${color}15`} />
      {/* Diagonal */}
      <line x1={off} y1={H - off} x2={W - 10} y2={off + (H - off - 10) * 0 + 9} stroke="rgba(255,255,255,0.2)" strokeWidth={1} strokeDasharray="4,3" />
      {/* Axes */}
      <line x1={off} y1={off} x2={off} y2={H - off} stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
      <line x1={off} y1={H - off} x2={W - 10} y2={H - off} stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
      {/* ROC curve */}
      <path d={rocPath} fill="none" stroke={color} strokeWidth={2.5} />
      {/* Labels */}
      <text x={off + (W - off) / 2} y={H - 5} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize={10} fontFamily="Space Mono">FPR →</text>
      <text x={12} y={H / 2} fill="rgba(255,255,255,0.4)" fontSize={10} fontFamily="Space Mono" transform={`rotate(-90, 12, ${H / 2})`}>TPR →</text>
      <text x={W - 80} y={80} fill={color} fontSize={10} fontFamily="Space Mono">AUC ≈ 0.88</text>
      <text x={W - 100} y={H - 40} fill="rgba(255,255,255,0.3)" fontSize={9} fontFamily="Space Mono">random (0.5)</text>
    </svg>
  );
}

/* ─── Bias-Variance ─── */
function BiasVarianceViz({ color }: { color: string }) {
  const W = 360, H = 220;
  const off = 36;
  const n = 50;

  const trainPath = Array.from({ length: n }, (_, i) => {
    const x = i / (n - 1);
    const y = 0.05 + 0.85 * Math.exp(-3 * x);
    return `${i === 0 ? 'M' : 'L'}${off + x * (W - off - 10)},${H - off - y * (H - off - 20)}`;
  }).join(' ');

  const valPath = Array.from({ length: n }, (_, i) => {
    const x = i / (n - 1);
    const y = 0.9 - 0.5 * x + 0.5 * x * x;
    return `${i === 0 ? 'M' : 'L'}${off + x * (W - off - 10)},${H - off - y * (H - off - 20)}`;
  }).join(' ');

  const sweetX = off + 0.4 * (W - off - 10);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: W, borderRadius: '12px', background: 'var(--bg3)' }}>
      {/* Sweet spot */}
      <line x1={sweetX} y1={20} x2={sweetX} y2={H - off} stroke="rgba(255,255,255,0.15)" strokeWidth={1} strokeDasharray="4,3" />
      <text x={sweetX + 4} y={30} fill="rgba(255,255,255,0.3)" fontSize={9} fontFamily="Space Mono">sweet spot</text>
      {/* Zones */}
      <text x={off + 10} y={50} fill="#ff6b35" fontSize={9} fontFamily="Space Mono" opacity={0.7}>high bias →</text>
      <text x={sweetX + 20} y={50} fill="#b855ff" fontSize={9} fontFamily="Space Mono" opacity={0.7}>← high variance</text>
      {/* Axes */}
      <line x1={off} y1={20} x2={off} y2={H - off} stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
      <line x1={off} y1={H - off} x2={W - 10} y2={H - off} stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
      {/* Curves */}
      <path d={trainPath} fill="none" stroke={color} strokeWidth={2} />
      <path d={valPath} fill="none" stroke="#ff6b35" strokeWidth={2} />
      {/* Legends */}
      <line x1={off + 10} y1={H - 15} x2={off + 28} y2={H - 15} stroke={color} strokeWidth={2} />
      <text x={off + 34} y={H - 11} fill={color} fontSize={10} fontFamily="Space Mono">training error</text>
      <line x1={180} y1={H - 15} x2={198} y2={H - 15} stroke="#ff6b35" strokeWidth={2} />
      <text x={204} y={H - 11} fill="#ff6b35" fontSize={10} fontFamily="Space Mono">val error</text>
      <text x={off + 10} y={15} fill="rgba(255,255,255,0.3)" fontSize={10} fontFamily="Space Mono">error</text>
      <text x={W - 85} y={H - 5} fill="rgba(255,255,255,0.3)" fontSize={10} fontFamily="Space Mono">Model Complexity →</text>
    </svg>
  );
}

/* ─── Confusion Matrix ─── */
function ConfusionMatrixViz({ color }: { color: string }) {
  const [highlighted, setHighlighted] = useState<string | null>(null);
  const cells = [
    { key: 'TP', label: 'TP', val: 85, r: 0, c: 0, color: color, desc: 'True Positive: Correctly predicted positive' },
    { key: 'FN', label: 'FN', val: 15, r: 0, c: 1, color: '#ff6b35', desc: 'False Negative: Missed positives (Type II error)' },
    { key: 'FP', label: 'FP', val: 10, r: 1, c: 0, color: '#ff6b35', desc: 'False Positive: False alarm (Type I error)' },
    { key: 'TN', label: 'TN', val: 90, r: 1, c: 1, color: color, desc: 'True Negative: Correctly predicted negative' },
  ];
  const W = 340, off = 70, cellSize = 90;

  return (
    <div>
      <svg viewBox={`0 0 ${W} 240`} style={{ width: '100%', maxWidth: W, borderRadius: '12px', background: 'var(--bg3)' }}>
        {/* Headers */}
        <text x={off + cellSize / 2} y={30} textAnchor="middle" fill={color} fontSize={11} fontFamily="Space Mono">Predicted +</text>
        <text x={off + cellSize + cellSize / 2} y={30} textAnchor="middle" fill="#ff6b35" fontSize={11} fontFamily="Space Mono">Predicted −</text>
        <text x={30} y={off + cellSize / 2 + 4} textAnchor="middle" fill={color} fontSize={10} fontFamily="Space Mono" transform={`rotate(-90, 30, ${off + cellSize / 2 + 4})`}>Actual +</text>
        <text x={30} y={off + cellSize + cellSize / 2 + 4} textAnchor="middle" fill="#ff6b35" fontSize={10} fontFamily="Space Mono" transform={`rotate(-90, 30, ${off + cellSize + cellSize / 2 + 4})`}>Actual −</text>
        {cells.map(cell => (
          <g key={cell.key} onClick={() => setHighlighted(h => h === cell.key ? null : cell.key)} style={{ cursor: 'pointer' }}>
            <rect
              x={off + cell.c * cellSize} y={off + cell.r * cellSize}
              width={cellSize} height={cellSize}
              fill={highlighted === cell.key ? `${cell.color}30` : `${cell.color}12`}
              stroke={cell.color} strokeWidth={highlighted === cell.key ? 2 : 1}
            />
            <text x={off + cell.c * cellSize + cellSize / 2} y={off + cell.r * cellSize + cellSize / 2 - 8}
              textAnchor="middle" fill={cell.color} fontSize={14} fontWeight="bold" fontFamily="Space Mono">{cell.label}
            </text>
            <text x={off + cell.c * cellSize + cellSize / 2} y={off + cell.r * cellSize + cellSize / 2 + 12}
              textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize={18} fontWeight="bold">{cell.val}
            </text>
          </g>
        ))}
        {highlighted && (
          <text x={W / 2} y={220} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize={10} fontFamily="Space Mono">
            {cells.find(c => c.key === highlighted)?.desc}
          </text>
        )}
        {!highlighted && (
          <text x={W / 2} y={220} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={10} fontFamily="Space Mono">
            Click a cell for details
          </text>
        )}
      </svg>
    </div>
  );
}

/* ─── Probability Distribution ─── */
function ProbabilityDistViz({ color }: { color: string }) {
  const [sigma, setSigma] = useState(1);
  const W = 360, H = 200;
  const n = 120;
  const gauss = (x: number, s: number) => Math.exp(-(x * x) / (2 * s * s)) / (s * Math.sqrt(2 * Math.PI));
  const maxY = gauss(0, sigma);
  const px = (x: number) => W / 2 + x * 45;
  const py = (y: number) => H - 25 - (y / Math.max(maxY, 0.01)) * (H - 50);

  const path = Array.from({ length: n }, (_, i) => {
    const x = -3.5 + i * 7 / (n - 1);
    return `${i === 0 ? 'M' : 'L'}${px(x)},${py(gauss(x, sigma))}`;
  }).join(' ');

  return (
    <div className="text-center">
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: W, borderRadius: '12px', background: 'var(--bg3)' }}>
        {/* ±1σ, ±2σ */}
        {[-2, -1, 1, 2].map(s => (
          <line key={s} x1={px(s * sigma)} y1={30} x2={px(s * sigma)} y2={H - 25}
            stroke="rgba(255,255,255,0.1)" strokeWidth={1} strokeDasharray="3,4" />
        ))}
        <text x={px(0)} y={H - 8} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize={9} fontFamily="Space Mono">μ=0</text>
        <text x={px(sigma)} y={H - 8} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={9} fontFamily="Space Mono">+σ</text>
        <text x={px(-sigma)} y={H - 8} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={9} fontFamily="Space Mono">-σ</text>
        {/* Shaded area */}
        <path d={`${path} L${px(3.5)},${H - 25} L${px(-3.5)},${H - 25} Z`} fill={`${color}15`} />
        {/* Curve */}
        <path d={path} fill="none" stroke={color} strokeWidth={2.5} />
        <text x={15} y={20} fill={color} fontSize={10} fontFamily="Space Mono">σ={sigma.toFixed(1)}</text>
        <text x={W - 130} y={20} fill="rgba(255,255,255,0.3)" fontSize={10} fontFamily="Space Mono">Normal Distribution</text>
      </svg>
      <div className="flex items-center gap-3 justify-center mt-4">
        <span style={{ fontFamily: 'Space Mono', fontSize: '11px', color: 'var(--muted)' }}>σ (spread):</span>
        <input type="range" min="0.4" max="2" step="0.1" value={sigma} onChange={e => setSigma(Number(e.target.value))} style={{ accentColor: color, width: '120px' }} />
        <span style={{ fontFamily: 'Space Mono', fontSize: '11px', color }}>{sigma.toFixed(1)}</span>
      </div>
    </div>
  );
}

/* ─── Vector Space ─── */
function VectorSpaceViz({ color }: { color: string }) {
  const W = 320, H = 280;
  const ox = W / 2, oy = H / 2;
  const scale = 50;
  const vA = [2, 1], vB = [1, 2];
  const dot = vA[0] * vB[0] + vA[1] * vB[1];
  const magA = Math.sqrt(vA[0] ** 2 + vA[1] ** 2);
  const magB = Math.sqrt(vB[0] ** 2 + vB[1] ** 2);
  const angle = Math.acos(dot / (magA * magB)) * (180 / Math.PI);

  const arr = (v: number[], c: string, label: string) => {
    const ex = ox + v[0] * scale, ey = oy - v[1] * scale;
    const dx = v[0] * scale, dy = -v[1] * scale;
    const len = Math.sqrt(dx * dx + dy * dy);
    const nx = dx / len, ny = dy / len;
    return (
      <g>
        <line x1={ox} y1={oy} x2={ex} y2={ey} stroke={c} strokeWidth={2.5} markerEnd={`url(#arrowhead-${c.replace('#', '')})`} />
        <defs>
          <marker id={`arrowhead-${c.replace('#', '')}`} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill={c} />
          </marker>
        </defs>
        <text x={ex + nx * 15} y={ey + ny * 15} fill={c} fontSize={13} fontFamily="Space Mono" fontWeight="bold">{label}</text>
      </g>
    );
  };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: W, borderRadius: '12px', background: 'var(--bg3)' }}>
      {/* Grid lines */}
      {[-3, -2, -1, 0, 1, 2, 3].map(i => (
        <g key={i}>
          <line x1={ox + i * scale} y1={20} x2={ox + i * scale} y2={H - 20} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
          <line x1={20} y1={oy - i * scale} x2={W - 20} y2={oy - i * scale} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
        </g>
      ))}
      {/* Axes */}
      <line x1={20} y1={oy} x2={W - 20} y2={oy} stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
      <line x1={ox} y1={20} x2={ox} y2={H - 20} stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
      {/* Angle arc */}
      <path d={`M ${ox + 35} ${oy} A 35 35 0 0 0 ${ox + 25} ${oy - 25}`} fill="none" stroke="#ffbe00" strokeWidth={1.5} />
      <text x={ox + 38} y={oy - 14} fill="#ffbe00" fontSize={10} fontFamily="Space Mono">{angle.toFixed(0)}°</text>
      {/* Vectors */}
      {arr(vA, color, 'a')}
      {arr(vB, '#ff6b35', 'b')}
      {/* Info */}
      <text x={10} y={H - 30} fill={color} fontSize={10} fontFamily="Space Mono">a = [{vA.join(', ')}]</text>
      <text x={10} y={H - 17} fill="#ff6b35" fontSize={10} fontFamily="Space Mono">b = [{vB.join(', ')}]</text>
      <text x={W - 140} y={H - 30} fill="#ffbe00" fontSize={10} fontFamily="Space Mono">a·b = {dot}</text>
      <text x={W - 140} y={H - 17} fill="rgba(255,255,255,0.4)" fontSize={10} fontFamily="Space Mono">θ = {angle.toFixed(1)}°</text>
    </svg>
  );
}

/* ─── Backprop ─── */
function BackpropViz({ color }: { color: string }) {
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const totalSteps = 8;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => {
      if (step >= totalSteps - 1) {
        setRunning(false);
      } else {
        setStep(s => s + 1);
      }
    }, 400);
    return () => clearTimeout(t);
  }, [running, step, totalSteps]);

  const layerSizes = [3, 4, 2, 1];
  const W = 380, H = 220;
  const layerX = (i: number) => 40 + i * (W - 60) / (layerSizes.length - 1);
  const nodeY = (li: number, ni: number) => {
    const n = layerSizes[li];
    const sp = Math.min(50, (H - 40) / n);
    return H / 2 - ((n - 1) * sp) / 2 + ni * sp;
  };

  // forward: steps 0..3 light up layer 0,1,2,3
  // backward: steps 4..7 light gradients 3,2,1,0
  const forwardLit = (li: number) => step > li && step <= 4;
  const backwardLit = (li: number) => step > 4 + (3 - li);

  return (
    <div className="text-center">
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: W, borderRadius: '12px', background: 'var(--bg3)' }}>
        {layerSizes.slice(0, -1).map((n, li) =>
          Array.from({ length: n }, (_, ni) =>
            Array.from({ length: layerSizes[li + 1] }, (_, nj) => (
              <line key={`${li}-${ni}-${nj}`}
                x1={layerX(li)} y1={nodeY(li, ni)} x2={layerX(li + 1)} y2={nodeY(li + 1, nj)}
                stroke={
                  backwardLit(li) ? 'rgba(255,107,53,0.5)' :
                  forwardLit(li) ? `${color}50` : 'rgba(255,255,255,0.06)'}
                strokeWidth={forwardLit(li) || backwardLit(li) ? 1.5 : 0.8}
              />
            ))
          )
        )}
        {layerSizes.map((n, li) =>
          Array.from({ length: n }, (_, ni) => (
            <circle key={`${li}-${ni}`}
              cx={layerX(li)} cy={nodeY(li, ni)} r={10}
              fill={backwardLit(li) ? 'rgba(255,107,53,0.25)' : forwardLit(li) ? `${color}25` : 'var(--bg2)'}
              stroke={backwardLit(li) ? '#ff6b35' : forwardLit(li) ? color : 'rgba(255,255,255,0.15)'}
              strokeWidth={1.5}
            />
          ))
        )}
        <text x={layerX(0)} y={H - 8} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={9} fontFamily="Space Mono">Input</text>
        <text x={layerX(3)} y={H - 8} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={9} fontFamily="Space Mono">Output</text>
        {step > 0 && step <= 4 && (
          <text x={W / 2} y={18} textAnchor="middle" fill={color} fontSize={11} fontFamily="Space Mono">→ Forward Pass (activations)</text>
        )}
        {step > 4 && (
          <text x={W / 2} y={18} textAnchor="middle" fill="#ff6b35" fontSize={11} fontFamily="Space Mono">← Backward Pass (gradients)</text>
        )}
      </svg>
      <div className="flex gap-3 justify-center mt-4">
        <button
          onClick={() => { setStep(0); setRunning(true); }}
          style={{ padding: '6px 18px', borderRadius: '8px', background: `${color}20`, color, border: `1px solid ${color}40`, cursor: 'pointer', fontFamily: 'Space Mono', fontSize: '12px' }}
        >
          ▶ Animate
        </button>
        <button
          onClick={() => { setRunning(false); setStep(0); }}
          style={{ padding: '6px 18px', borderRadius: '8px', background: 'var(--bg2)', color: 'var(--muted)', border: '1px solid var(--border)', cursor: 'pointer', fontFamily: 'Space Mono', fontSize: '12px' }}
        >
          ↺ Reset
        </button>
      </div>
    </div>
  );
}

/* ─── RNN Unroll ─── */
function RNNUnrollViz({ color }: { color: string }) {
  const [animStep, setAnimStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const n = 5;
  const labels = ['I', 'love', 'ML', 'so', 'much'];

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => {
      if (animStep >= n - 1) {
        setRunning(false);
      } else {
        setAnimStep(s => s + 1);
      }
    }, 600);
    return () => clearTimeout(t);
  }, [running, animStep, n]);

  const W = 380, H = 180;
  const cellW = 56, cellH = 36;
  const startX = 15;
  const hy = 60, iy = 130, oy = 20;

  return (
    <div className="text-center">
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: W, borderRadius: '12px', background: 'var(--bg3)' }}>
        {Array.from({ length: n }, (_, i) => {
          const x = startX + i * (cellW + 12);
          const active = animStep >= i;
          return (
            <g key={i}>
              {/* Hidden state h_t */}
              <rect x={x} y={hy} width={cellW} height={cellH} rx={6}
                fill={active ? `${color}20` : 'var(--bg2)'}
                stroke={active ? color : 'rgba(255,255,255,0.15)'} strokeWidth={active ? 1.5 : 1} />
              <text x={x + cellW / 2} y={hy + cellH / 2 + 4} textAnchor="middle"
                fill={active ? color : 'rgba(255,255,255,0.3)'} fontSize={10} fontFamily="Space Mono">
                h_{i}
              </text>
              {/* Input x_t */}
              <rect x={x + 8} y={iy} width={cellW - 16} height={24} rx={4}
                fill="var(--bg3)" stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
              <text x={x + cellW / 2} y={iy + 16} textAnchor="middle"
                fill="rgba(255,255,255,0.5)" fontSize={10} fontFamily="Space Mono">
                {labels[i]}
              </text>
              {/* Input arrow */}
              <line x1={x + cellW / 2} y1={iy} x2={x + cellW / 2} y2={hy + cellH}
                stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
              {/* Output arrow */}
              <line x1={x + cellW / 2} y1={hy} x2={x + cellW / 2} y2={oy + 14}
                stroke={active ? color : 'rgba(255,255,255,0.1)'} strokeWidth={active ? 1.5 : 1} />
              <rect x={x + 4} y={oy} width={cellW - 8} height={14} rx={3}
                fill={active ? `${color}15` : 'transparent'}
                stroke={active ? `${color}40` : 'transparent'} />
              <text x={x + cellW / 2} y={oy + 10} textAnchor="middle"
                fill={active ? color : 'transparent'} fontSize={8} fontFamily="Space Mono">
                y_{i}
              </text>
              {/* Horizontal h arrow */}
              {i < n - 1 && (
                <line x1={x + cellW} y1={hy + cellH / 2} x2={x + cellW + 12} y2={hy + cellH / 2}
                  stroke={active ? color : 'rgba(255,255,255,0.1)'} strokeWidth={active ? 1.5 : 1} />
              )}
            </g>
          );
        })}
        <text x={startX} y={H - 5} fill="rgba(255,255,255,0.3)" fontSize={9} fontFamily="Space Mono">
          Hidden state flows left → right through time steps
        </text>
      </svg>
      <div className="flex gap-3 justify-center mt-4">
        <button
          onClick={() => { setAnimStep(-1); setRunning(true); }}
          style={{ padding: '6px 18px', borderRadius: '8px', background: `${color}20`, color, border: `1px solid ${color}40`, cursor: 'pointer', fontFamily: 'Space Mono', fontSize: '12px' }}
        >
          ▶ Process Sequence
        </button>
        <button
          onClick={() => { setRunning(false); setAnimStep(-1); }}
          style={{ padding: '6px 18px', borderRadius: '8px', background: 'var(--bg2)', color: 'var(--muted)', border: '1px solid var(--border)', cursor: 'pointer', fontFamily: 'Space Mono', fontSize: '12px' }}
        >
          ↺ Reset
        </button>
      </div>
    </div>
  );
}

/* ─── RAG Architecture ─── */
function RAGArchViz({ color }: { color: string }) {
  const [activeStep, setActiveStep] = useState(-1);
  const steps = [
    { label: 'User Query', icon: '💬', x: 20, y: 90 },
    { label: 'Embed Query', icon: '🔢', x: 100, y: 90 },
    { label: 'Vector Search', icon: '🔍', x: 190, y: 90 },
    { label: 'Retrieved Docs', icon: '📄', x: 270, y: 90 },
    { label: 'LLM', icon: '🤖', x: 270, y: 30 },
    { label: 'Response', icon: '✅', x: 180, y: 30 },
  ];
  const arrows = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]];

  const W = 380, H = 160;

  const sx = (i: number) => steps[i].x + 35;
  const sy = (i: number) => steps[i].y + 20;

  return (
    <div className="text-center">
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: W, borderRadius: '12px', background: 'var(--bg3)' }}>
        {arrows.map(([from, to], i) => (
          <line key={i}
            x1={sx(from)} y1={sy(from)} x2={sx(to) - 5} y2={sy(to)}
            stroke={activeStep >= i ? color : 'rgba(255,255,255,0.15)'}
            strokeWidth={activeStep >= i ? 2 : 1}
          />
        ))}
        {steps.map((step, i) => (
          <g key={i} onClick={() => setActiveStep(i)} style={{ cursor: 'pointer' }}>
            <rect x={step.x} y={step.y} width={70} height={40} rx={8}
              fill={activeStep >= i ? `${color}20` : 'var(--bg2)'}
              stroke={activeStep >= i ? color : 'rgba(255,255,255,0.15)'}
              strokeWidth={activeStep >= i ? 1.5 : 1}
            />
            <text x={step.x + 35} y={step.y + 15} textAnchor="middle" fontSize={14}>{step.icon}</text>
            <text x={step.x + 35} y={step.y + 32} textAnchor="middle" fill={activeStep >= i ? color : 'rgba(255,255,255,0.4)'} fontSize={8} fontFamily="Space Mono">
              {step.label}
            </text>
          </g>
        ))}
        {/* Vector DB */}
        <rect x={190} y={120} width={70} height={30} rx={6}
          fill="rgba(184,85,255,0.1)" stroke="#b855ff" strokeWidth={1}
        />
        <text x={225} y={139} textAnchor="middle" fill="#b855ff" fontSize={9} fontFamily="Space Mono">Vector DB</text>
        <line x1={225} y1={120} x2={225} y2={110} stroke="#b855ff" strokeWidth={1} strokeDasharray="3,2" />
        <text x={W / 2} y={H - 5} textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize={9} fontFamily="Space Mono">
          Click steps to highlight the RAG pipeline
        </text>
      </svg>
      <div className="flex gap-3 justify-center mt-4">
        <button
          onClick={() => setActiveStep(-1)}
          style={{ padding: '6px 18px', borderRadius: '8px', background: 'var(--bg2)', color: 'var(--muted)', border: '1px solid var(--border)', cursor: 'pointer', fontFamily: 'Space Mono', fontSize: '12px' }}
        >
          ↺ Reset
        </button>
      </div>
    </div>
  );
}

/* ─── Random Forest ─── */
function RandomForestViz({ color }: { color: string }) {
  const [vote, setVote] = useState<null | number>(null);
  const trees = [
    { label: 'Tree 1', vote: 'A', correct: true },
    { label: 'Tree 2', vote: 'A', correct: true },
    { label: 'Tree 3', vote: 'B', correct: false },
    { label: 'Tree 4', vote: 'A', correct: true },
  ];
  const W = 360, H = 200;

  return (
    <div className="text-center">
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: W, borderRadius: '12px', background: 'var(--bg3)' }}>
        {/* Trees */}
        {trees.map((tree, i) => {
          const x = 25 + i * 82;
          const active = vote !== null;
          return (
            <g key={i}>
              {/* Tree shape (triangle + trunk) */}
              <polygon points={`${x + 30},${40} ${x + 10},${100} ${x + 50},${100}`}
                fill={active && tree.correct ? `${color}25` : active && !tree.correct ? 'rgba(255,107,53,0.2)' : 'var(--bg2)'}
                stroke={active && tree.correct ? color : active ? '#ff6b35' : 'rgba(255,255,255,0.2)'}
                strokeWidth={1.5}
              />
              <rect x={x + 24} y={100} width={12} height={20} fill="rgba(255,255,255,0.1)" />
              <text x={x + 30} y={70} textAnchor="middle" fill={active && tree.correct ? color : active ? '#ff6b35' : 'rgba(255,255,255,0.4)'} fontSize={13}>
                {active ? tree.vote : '?'}
              </text>
              <text x={x + 30} y={H - 60} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={9} fontFamily="Space Mono">
                {tree.label}
              </text>
              {/* Vote arrow to result */}
              {active && (
                <line x1={x + 30} y1={120} x2={170} y2={145}
                  stroke={tree.correct ? color : '#ff6b35'} strokeWidth={1} opacity={0.5} strokeDasharray="3,2"
                />
              )}
            </g>
          );
        })}
        {/* Final vote */}
        <rect x={130} y={145} width={80} height={36} rx={8}
          fill={vote !== null ? `${color}25` : 'var(--bg2)'}
          stroke={vote !== null ? color : 'rgba(255,255,255,0.2)'} strokeWidth={vote !== null ? 2 : 1}
        />
        <text x={170} y={165} textAnchor="middle"
          fill={vote !== null ? color : 'rgba(255,255,255,0.3)'} fontSize={12} fontFamily="Space Mono" fontWeight="bold">
          {vote !== null ? '→ A (3/4)' : 'Majority Vote'}
        </text>
      </svg>
      <div className="flex gap-3 justify-center mt-4">
        <button
          onClick={() => setVote(1)}
          style={{ padding: '6px 18px', borderRadius: '8px', background: `${color}20`, color, border: `1px solid ${color}40`, cursor: 'pointer', fontFamily: 'Space Mono', fontSize: '12px' }}
        >
          Vote!
        </button>
        <button
          onClick={() => setVote(null)}
          style={{ padding: '6px 18px', borderRadius: '8px', background: 'var(--bg2)', color: 'var(--muted)', border: '1px solid var(--border)', cursor: 'pointer', fontFamily: 'Space Mono', fontSize: '12px' }}
        >
          ↺ Reset
        </button>
      </div>
    </div>
  );
}

/* ─── Main export ─── */
export function InteractiveViz({ type, color = '#00ff9d' }: InteractiveVizProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const title: Record<VizType, string> = {
    'gradient-descent': 'Gradient Descent Animation',
    'neural-network': 'Neural Network Forward Pass',
    'linear-regression': 'Linear Regression Fit',
    'logistic-sigmoid': 'Sigmoid / Decision Boundary',
    'decision-tree': 'Decision Tree Structure',
    'random-forest': 'Random Forest Ensemble Voting',
    'kmeans': 'K-Means Clustering',
    'pca-viz': 'PCA Dimensionality Reduction',
    'cnn-conv': 'Convolutional Filter Sliding',
    'attention-heatmap': 'Self-Attention Weights',
    'roc-curve': 'ROC Curve (AUC)',
    'bias-variance': 'Bias-Variance Tradeoff',
    'confusion-matrix': 'Confusion Matrix',
    'probability-dist': 'Normal Distribution',
    'vector-space': 'Vector Space & Dot Product',
    'backprop': 'Backpropagation Flow',
    'rnn-unroll': 'RNN Unrolled Over Time',
    'rag-arch': 'RAG Pipeline Architecture',
  };

  const renderViz = () => {
    switch (type) {
      case 'gradient-descent': return <GradientDescentViz color={color} />;
      case 'neural-network': return <NeuralNetworkViz color={color} />;
      case 'linear-regression': return <LinearRegressionViz color={color} />;
      case 'logistic-sigmoid': return <LogisticSigmoidViz color={color} />;
      case 'decision-tree': return <DecisionTreeViz color={color} />;
      case 'random-forest': return <RandomForestViz color={color} />;
      case 'kmeans': return <KMeansViz color={color} />;
      case 'pca-viz': return <PCAViz color={color} />;
      case 'cnn-conv': return <CNNConvViz color={color} />;
      case 'attention-heatmap': return <AttentionHeatmapViz color={color} />;
      case 'roc-curve': return <ROCCurveViz color={color} />;
      case 'bias-variance': return <BiasVarianceViz color={color} />;
      case 'confusion-matrix': return <ConfusionMatrixViz color={color} />;
      case 'probability-dist': return <ProbabilityDistViz color={color} />;
      case 'vector-space': return <VectorSpaceViz color={color} />;
      case 'backprop': return <BackpropViz color={color} />;
      case 'rnn-unroll': return <RNNUnrollViz color={color} />;
      case 'rag-arch': return <RAGArchViz color={color} />;
      default: return null;
    }
  };

  return (
    <div ref={containerRef} style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <span style={{ fontSize: '14px' }}>🔬</span>
        <span style={{ fontWeight: '700', fontSize: '14px' }}>{title[type]}</span>
        <span style={{ padding: '2px 8px', borderRadius: '4px', background: `${color}20`, color, border: `1px solid ${color}30`, fontSize: '10px', fontFamily: 'Space Mono' }}>
          interactive
        </span>
      </div>
      <div style={{ padding: '16px', borderRadius: '12px', background: 'var(--bg3)', border: `1px solid ${color}20` }}>
        {renderViz()}
      </div>
    </div>
  );
}
