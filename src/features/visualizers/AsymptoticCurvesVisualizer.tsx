import { useState } from 'react'

export function AsymptoticCurvesVisualizer() {
  const [activeCurve, setActiveCurve] = useState<'all' | 'log' | 'linear' | 'quad'>('all')

  return (
    <div className="editorial-panel" style={{ width: '100%' }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          borderBottom: '1px solid rgba(155, 142, 170, 0.16)',
          paddingBottom: 16,
          marginBottom: 20,
        }}
      >
        <div>
          <span className="font-mono text-teal" style={{ fontSize: '13px', letterSpacing: '0.12em' }}>
            FIGURE 4.2 & SECTION 4.3 · COMMON GROWTH PATTERNS
          </span>
          <h3 className="font-serif text-ivory" style={{ fontSize: '28px', fontWeight: 500, marginTop: 4 }}>
            Asymptotic Scaling: O(log n), O(n), O(n²)
          </h3>
        </div>

        {/* Filter controls */}
        <div style={{ display: 'flex', gap: 8 }}>
          {(['all', 'log', 'linear', 'quad'] as const).map(key => (
            <button
              key={key}
              onClick={() => setActiveCurve(key)}
              style={{
                padding: '6px 14px',
                borderRadius: '16px',
                fontSize: '13px',
                fontFamily: 'var(--font-mono)',
                backgroundColor: activeCurve === key ? 'rgba(53, 214, 197, 0.2)' : 'rgba(33, 22, 34, 0.6)',
                border: activeCurve === key ? '1px solid #35D6C5' : '1px solid rgba(155, 142, 170, 0.2)',
                color: activeCurve === key ? '#35D6C5' : '#9B8EAA',
              }}
            >
              {key === 'all' && 'All Patterns'}
              {key === 'log' && 'O(log n)'}
              {key === 'linear' && 'O(n)'}
              {key === 'quad' && 'O(n²)'}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Canvas for curves */}
      <div style={{ position: 'relative', width: '100%' }}>
        <svg viewBox="0 0 800 320" style={{ width: '100%', height: '300px' }}>
          {/* Axis lines */}
          <line x1="60" y1="260" x2="740" y2="260" stroke="#9B8EAA" strokeWidth="1.5" />
          <line x1="60" y1="260" x2="60" y2="30" stroke="#9B8EAA" strokeWidth="1.5" />

          {/* Axis arrowheads */}
          <polygon points="740,256 750,260 740,264" fill="#9B8EAA" />
          <polygon points="56,30 60,20 64,30" fill="#9B8EAA" />

          {/* Labels */}
          <text x="750" y="280" fill="#9B8EAA" fontSize="14" textAnchor="end" fontFamily="var(--font-mono)">
            Input Size (n) →
          </text>
          <text x="50" y="24" fill="#9B8EAA" fontSize="14" textAnchor="end" fontFamily="var(--font-mono)">
            Time / Operations ↑
          </text>

          {/* Logarithmic Curve: O(log n) */}
          {(activeCurve === 'all' || activeCurve === 'log') && (
            <g>
              <path
                d="M 60 260 Q 200 230 400 220 T 720 210"
                fill="none"
                stroke="#35D6C5"
                strokeWidth="3"
              />
              <text x="725" y="206" fill="#35D6C5" fontSize="15" fontWeight="600" fontFamily="var(--font-mono)">
                O(log n) · Logarithmic
              </text>
            </g>
          )}

          {/* Linear Curve: O(n) */}
          {(activeCurve === 'all' || activeCurve === 'linear') && (
            <g>
              <path
                d="M 60 260 L 720 80"
                fill="none"
                stroke="#9B8EAA"
                strokeWidth="2.5"
                strokeDasharray="6 3"
              />
              <text x="725" y="75" fill="#F5F0E8" fontSize="15" fontWeight="600" fontFamily="var(--font-mono)">
                O(n) · Linear
              </text>
            </g>
          )}

          {/* Quadratic Curve: O(n^2) */}
          {(activeCurve === 'all' || activeCurve === 'quad') && (
            <g>
              <path
                d="M 60 260 Q 240 250 480 160 T 640 40"
                fill="none"
                stroke="#E87963"
                strokeWidth="3"
              />
              <text x="645" y="42" fill="#E87963" fontSize="15" fontWeight="600" fontFamily="var(--font-mono)">
                O(n²) · Quadratic
              </text>
            </g>
          )}
        </svg>
      </div>

      <div
        style={{
          marginTop: 12,
          padding: '12px 18px',
          background: 'rgba(33, 22, 34, 0.5)',
          borderRadius: 8,
          border: '1px solid rgba(155, 142, 170, 0.1)',
          fontSize: '14px',
          color: '#9B8EAA',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <span className="font-mono text-teal">ACADEMIC NOTE:</span>
        <span>
          Illustrative mathematical representation reproducing Figure 4.2 of the paper. Demonstrates asymptotic divergence as n increases, not measured hardware benchmarks.
        </span>
      </div>
    </div>
  )
}
