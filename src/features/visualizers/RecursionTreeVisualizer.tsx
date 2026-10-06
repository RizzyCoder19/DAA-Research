import { useState } from 'react'
import { Plus, Minus, RotateCcw } from 'lucide-react'

export function RecursionTreeVisualizer() {
  const [depth, setDepth] = useState<number>(3)
  const [a, setA] = useState<number>(2) // subproblems
  const [b, setB] = useState<number>(2) // reduction factor

  const maxDepth = 4
  const minDepth = 1

  return (
    <div className="editorial-panel" style={{ width: '100%' }}>
      {/* Controls Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          borderBottom: '1px solid rgba(155, 142, 170, 0.16)',
          paddingBottom: 20,
          marginBottom: 24,
        }}
      >
        <div>
          <span className="font-mono text-teal" style={{ fontSize: '13px', letterSpacing: '0.12em' }}>
            FIGURE 1.1 & SECTION 4.1 · RECURSION TREE DECOMPOSITION
          </span>
          <h3 className="font-serif text-ivory" style={{ fontSize: '28px', fontWeight: 500, marginTop: 4 }}>
            Recursive Work Expansion Across Levels
          </h3>
        </div>

        {/* Depth & Parameter toggles */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="font-mono text-lavender" style={{ fontSize: '14px' }}>Depth (k):</span>
            <button
              onClick={() => setDepth(d => Math.max(minDepth, d - 1))}
              disabled={depth <= minDepth}
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                background: 'rgba(53, 214, 197, 0.1)',
                border: '1px solid rgba(53, 214, 197, 0.3)',
                opacity: depth <= minDepth ? 0.4 : 1,
              }}
            >
              <Minus size={14} className="text-teal" />
            </button>
            <span className="font-mono text-ivory" style={{ fontSize: '16px', fontWeight: 600, minWidth: 20, textAlign: 'center' }}>
              {depth}
            </span>
            <button
              onClick={() => setDepth(d => Math.min(maxDepth, d + 1))}
              disabled={depth >= maxDepth}
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                background: 'rgba(53, 214, 197, 0.1)',
                border: '1px solid rgba(53, 214, 197, 0.3)',
                opacity: depth >= maxDepth ? 0.4 : 1,
              }}
            >
              <Plus size={14} className="text-teal" />
            </button>
          </div>

          <button
            onClick={() => { setDepth(3); setA(2); setB(2); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 12px',
              borderRadius: '6px',
              background: 'rgba(155, 142, 170, 0.1)',
              border: '1px solid rgba(155, 142, 170, 0.2)',
              fontSize: '13px',
              color: '#9B8EAA',
            }}
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* SVG Tree Representation */}
      <div style={{ position: 'relative', width: '100%', overflowX: 'auto' }}>
        <svg
          viewBox="0 0 900 360"
          style={{ width: '100%', minWidth: '700px', height: '340px' }}
        >
          {/* Level 0: Root */}
          <g>
            <circle cx="450" cy="40" r="28" fill="#211622" stroke="#35D6C5" strokeWidth="2.5" />
            <text x="450" y="46" fill="#F5F0E8" fontSize="16" fontWeight="600" textAnchor="middle" fontFamily="var(--font-mono)">
              T(n)
            </text>
            <text x="820" y="46" fill="#35D6C5" fontSize="14" textAnchor="end" fontFamily="var(--font-mono)">
              Work = f(n)
            </text>
          </g>

          {/* Level 1 */}
          {depth >= 2 && (
            <g>
              <line x1="450" y1="68" x2="250" y2="120" stroke="#35D6C5" strokeWidth="2" strokeDasharray="4 2" />
              <line x1="450" y1="68" x2="650" y2="120" stroke="#35D6C5" strokeWidth="2" strokeDasharray="4 2" />

              <circle cx="250" cy="130" r="24" fill="#211622" stroke="#35D6C5" strokeWidth="2" />
              <text x="250" y="136" fill="#F5F0E8" fontSize="14" textAnchor="middle" fontFamily="var(--font-mono)">
                T(n/{b})
              </text>

              <circle cx="650" cy="130" r="24" fill="#211622" stroke="#35D6C5" strokeWidth="2" />
              <text x="650" y="136" fill="#F5F0E8" fontSize="14" textAnchor="middle" fontFamily="var(--font-mono)">
                T(n/{b})
              </text>

              <text x="820" y="136" fill="#35D6C5" fontSize="14" textAnchor="end" fontFamily="var(--font-mono)">
                Work = {a} · f(n/{b})
              </text>
            </g>
          )}

          {/* Level 2 */}
          {depth >= 3 && (
            <g>
              <line x1="250" y1="154" x2="150" y2="210" stroke="#E87963" strokeWidth="1.5" />
              <line x1="250" y1="154" x2="350" y2="210" stroke="#E87963" strokeWidth="1.5" />
              <line x1="650" y1="154" x2="550" y2="210" stroke="#E87963" strokeWidth="1.5" />
              <line x1="650" y1="154" x2="750" y2="210" stroke="#E87963" strokeWidth="1.5" />

              <circle cx="150" cy="220" r="20" fill="#211622" stroke="#E87963" strokeWidth="1.5" />
              <text x="150" y="225" fill="#F5F0E8" fontSize="12" textAnchor="middle" fontFamily="var(--font-mono)">
                T(n/{b}²)
              </text>

              <circle cx="350" cy="220" r="20" fill="#211622" stroke="#E87963" strokeWidth="1.5" />
              <text x="350" y="225" fill="#F5F0E8" fontSize="12" textAnchor="middle" fontFamily="var(--font-mono)">
                T(n/{b}²)
              </text>

              <circle cx="550" cy="220" r="20" fill="#211622" stroke="#E87963" strokeWidth="1.5" />
              <text x="550" y="225" fill="#F5F0E8" fontSize="12" textAnchor="middle" fontFamily="var(--font-mono)">
                T(n/{b}²)
              </text>

              <circle cx="750" cy="220" r="20" fill="#211622" stroke="#E87963" strokeWidth="1.5" />
              <text x="750" y="225" fill="#F5F0E8" fontSize="12" textAnchor="middle" fontFamily="var(--font-mono)">
                T(n/{b}²)
              </text>

              <text x="820" y="225" fill="#E87963" fontSize="14" textAnchor="end" fontFamily="var(--font-mono)">
                Work = {a * a} · f(n/{b}²)
              </text>
            </g>
          )}

          {/* Level 3: Leaves / Base case */}
          {depth >= 4 && (
            <g>
              <line x1="150" y1="240" x2="110" y2="290" stroke="#9B8EAA" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="150" y1="240" x2="190" y2="290" stroke="#9B8EAA" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="350" y1="240" x2="310" y2="290" stroke="#9B8EAA" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="350" y1="240" x2="390" y2="290" stroke="#9B8EAA" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="550" y1="240" x2="510" y2="290" stroke="#9B8EAA" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="550" y1="240" x2="590" y2="290" stroke="#9B8EAA" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="750" y1="240" x2="710" y2="290" stroke="#9B8EAA" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="750" y1="240" x2="790" y2="290" stroke="#9B8EAA" strokeWidth="1" strokeDasharray="3 3" />

              <text x="450" y="305" fill="#9B8EAA" fontSize="15" textAnchor="middle" fontFamily="var(--font-mono)">
                ... Base Cases: T(1) ... T(1) ... (total leaves: n^(log_b a))
              </text>

              <text x="820" y="305" fill="#9B8EAA" fontSize="14" textAnchor="end" fontFamily="var(--font-mono)">
                Leaves = Θ(n^(log_{b} {a}))
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Summary Footer */}
      <div
        style={{
          marginTop: 18,
          paddingTop: 16,
          borderTop: '1px solid rgba(155, 142, 170, 0.12)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div style={{ fontSize: '15px', color: '#9B8EAA' }}>
          Total cost = Sum of work across all levels: <span className="font-mono text-teal">T(n) = Σ Level_Work + Leaves</span>
        </div>
        <div className="font-mono text-lavender" style={{ fontSize: '13px' }}>
          Tree Height: log_{b} n · Subproblem Reduction: n / {b}^k
        </div>
      </div>
    </div>
  )
}
