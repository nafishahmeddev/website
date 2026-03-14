interface InteractiveVisualizerProps {
  type: 'gradient-descent' | 'neural-network' | 'matrix' | 'loss-landscape' | 'distribution';
  title: string;
  description: string;
}

export function InteractiveVisualizer({ type, title, description }: InteractiveVisualizerProps) {
  const renderVisualization = () => {
    switch (type) {
      case 'gradient-descent':
        return (
          <svg width="100%" height="300" viewBox="0 0 400 300" style={{ background: 'var(--bg3)', borderRadius: '8px' }}>
            {/* Loss landscape */}
            <defs>
              <linearGradient id="lossGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#ff6b35', stopOpacity: 0.6 }} />
                <stop offset="50%" style={{ stopColor: '#ffc837', stopOpacity: 0.6 }} />
                <stop offset="100%" style={{ stopColor: '#00ff9d', stopOpacity: 0.6 }} />
              </linearGradient>
            </defs>

            {/* Grid background */}
            <g stroke="rgba(255,255,255,0.1)" strokeWidth="1">
              {[...Array(5)].map((_, i) => (
                <line key={`h-${i}`} x1="0" y1={i * 60} x2="400" y2={i * 60} />
              ))}
              {[...Array(7)].map((_, i) => (
                <line key={`v-${i}`} x1={i * 60} y1="0" x2={i * 60} y2="300" />
              ))}
            </g>

            {/* Loss curve */}
            <path
              d="M 30 200 Q 100 80 200 50 Q 300 80 380 200"
              stroke="#00ccff"
              strokeWidth="3"
              fill="none"
            />

            {/* Gradient descent steps */}
            <circle cx="320" cy="150" r="5" fill="#00ff9d" />
            <circle cx="260" cy="80" r="5" fill="#ffbe00" />
            <circle cx="200" cy="50" r="5" fill="#ff6b35" />

            {/* Arrows showing descent */}
            <path d="M 320 150 L 280 110" stroke="#00ff9d" strokeWidth="2" markerEnd="url(#arrowGreen)" />
            <path d="M 260 80 L 220 60" stroke="#ffbe00" strokeWidth="2" markerEnd="url(#arrowYellow)" />

            {/* Labels */}
            <text x="340" y="170" fill="var(--accent)" fontSize="12">
              Start
            </text>
            <text x="190" y="30" fill="var(--accent)" fontSize="12">
              Minimum
            </text>
          </svg>
        );

      case 'neural-network':
        return (
          <svg width="100%" height="300" viewBox="0 0 400 300" style={{ background: 'var(--bg3)', borderRadius: '8px' }}>
            {/* Input layer */}
            {[...Array(4)].map((_, i) => (
              <g key={`in-${i}`}>
                <circle
                  cx="50"
                  cy={50 + i * 60}
                  r="8"
                  fill="var(--accent)"
                  opacity="0.7"
                />
              </g>
            ))}

            {/* Hidden layer */}
            {[...Array(5)].map((_, i) => (
              <g key={`h-${i}`}>
                <circle
                  cx="200"
                  cy={30 + i * 50}
                  r="8"
                  fill="var(--accent2)"
                  opacity="0.7"
                />
              </g>
            ))}

            {/* Output layer */}
            {[...Array(2)].map((_, i) => (
              <g key={`out-${i}`}>
                <circle
                  cx="350"
                  cy={80 + i * 100}
                  r="8"
                  fill="#00ccff"
                  opacity="0.7"
                />
              </g>
            ))}

            {/* Connections */}
            <g stroke="rgba(255,255,255,0.1)" strokeWidth="1">
              {[...Array(4)].map((_, i) =>
                [...Array(5)].map((_, j) => (
                  <line
                    key={`c1-${i}-${j}`}
                    x1="50"
                    y1={50 + i * 60}
                    x2="200"
                    y2={30 + j * 50}
                  />
                ))
              )}
              {[...Array(5)].map((_, i) =>
                [...Array(2)].map((_, j) => (
                  <line
                    key={`c2-${i}-${j}`}
                    x1="200"
                    y1={30 + i * 50}
                    x2="350"
                    y2={80 + j * 100}
                  />
                ))
              )}
            </g>

            {/* Labels */}
            <text x="30" y="280" fill="var(--muted)" fontSize="11">
              Input
            </text>
            <text x="185" y="280" fill="var(--muted)" fontSize="11">
              Hidden
            </text>
            <text x="330" y="280" fill="var(--muted)" fontSize="11">
              Output
            </text>
          </svg>
        );

      case 'matrix':
        return (
          <svg width="100%" height="250" viewBox="0 0 400 250" style={{ background: 'var(--bg3)', borderRadius: '8px' }}>
            {/* First matrix */}
            <g>
              {[...Array(3)].map((_, i) =>
                [...Array(3)].map((_, j) => (
                  <g key={`m1-${i}-${j}`}>
                    <rect
                      x={30 + j * 30}
                      y={40 + i * 30}
                      width="25"
                      height="25"
                      fill="var(--accent)"
                      opacity="0.3"
                      stroke="var(--accent)"
                    />
                    <text
                      x={42 + j * 30}
                      y={57 + i * 30}
                      textAnchor="middle"
                      fill="var(--accent)"
                      fontSize="10"
                    >
                      {i + j}
                    </text>
                  </g>
                ))
              )}
            </g>

            {/* Multiply symbol */}
            <text x="150" y="80" fontSize="24" fill="var(--text)">
              ×
            </text>

            {/* Second matrix */}
            <g>
              {[...Array(3)].map((_, i) =>
                [...Array(2)].map((_, j) => (
                  <g key={`m2-${i}-${j}`}>
                    <rect
                      x={180 + j * 30}
                      y={40 + i * 30}
                      width="25"
                      height="25"
                      fill="var(--accent2)"
                      opacity="0.3"
                      stroke="var(--accent2)"
                    />
                    <text
                      x={192 + j * 30}
                      y={57 + i * 30}
                      textAnchor="middle"
                      fill="var(--accent2)"
                      fontSize="10"
                    >
                      {i + j}
                    </text>
                  </g>
                ))
              )}
            </g>

            {/* Equals symbol */}
            <text x="280" y="80" fontSize="24" fill="var(--text)">
              =
            </text>

            {/* Result matrix */}
            <g>
              {[...Array(3)].map((_, i) =>
                [...Array(2)].map((_, j) => (
                  <g key={`mr-${i}-${j}`}>
                    <rect
                      x={310 + j * 30}
                      y={40 + i * 30}
                      width="25"
                      height="25"
                      fill="#00ccff"
                      opacity="0.3"
                      stroke="#00ccff"
                    />
                    <text
                      x={322 + j * 30}
                      y={57 + i * 30}
                      textAnchor="middle"
                      fill="#00ccff"
                      fontSize="10"
                    >
                      {i + j}
                    </text>
                  </g>
                ))
              )}
            </g>

            <text x="150" y="170" fill="var(--muted)" fontSize="12" textAnchor="middle">
              Matrix Multiplication
            </text>
          </svg>
        );

      default:
        return (
          <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ color: 'var(--muted)' }}>Interactive visualization</p>
          </div>
        );
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p style={{ color: 'var(--muted)', marginBottom: '16px' }}>{description}</p>
      <div style={{ border: `1px solid var(--border)`, borderRadius: '8px', overflow: 'hidden' }}>
        {renderVisualization()}
      </div>
    </div>
  );
}
