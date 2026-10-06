import { useState } from 'react'
import { Play, RotateCcw, ArrowDown } from 'lucide-react'

export function CallStackVisualizer() {
  const [currentLevel, setCurrentLevel] = useState<number>(0)
  const [isUnwinding, setIsUnwinding] = useState<boolean>(false)

  const frames = [
    { call: 'Call n', size: 'n', work: 'Non-recursive setup + divide', status: 'Active Frame' },
    { call: 'Call n/b', size: 'n/b', work: 'Subproblem division', status: 'Nested Frame' },
    { call: 'Call n/b²', size: 'n/b²', work: 'Subproblem division', status: 'Nested Frame' },
    { call: 'Call n/b³', size: 'n/b³', work: 'Subproblem division', status: 'Deep Frame' },
    { call: 'Base Case', size: '1', work: 'Constant time resolution O(1)', status: 'Terminal Frame' },
  ]

  const handleStep = () => {
    if (!isUnwinding) {
      if (currentLevel < frames.length - 1) {
        setCurrentLevel(lvl => lvl + 1)
      } else {
        setIsUnwinding(true)
      }
    } else {
      if (currentLevel > 0) {
        setCurrentLevel(lvl => lvl - 1)
      } else {
        setIsUnwinding(false)
      }
    }
  }

  const handleReset = () => {
    setCurrentLevel(0)
    setIsUnwinding(false)
  }

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
            SECTION 4.4 · SPACE ANALYSIS & CALL STACK DEPTH
          </span>
          <h3 className="font-serif text-ivory" style={{ fontSize: '28px', fontWeight: 500, marginTop: 4 }}>
            Auxiliary Memory & Stack Frame Allocation
          </h3>
        </div>

        {/* Stack Controls */}
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={handleStep}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              borderRadius: '8px',
              background: isUnwinding ? 'rgba(232, 121, 99, 0.2)' : 'rgba(53, 214, 197, 0.2)',
              border: isUnwinding ? '1px solid #E87963' : '1px solid #35D6C5',
              color: isUnwinding ? '#E87963' : '#35D6C5',
              fontSize: '14px',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <Play size={14} />
            <span>{isUnwinding ? 'Unwind Stack Frame' : 'Push Recursive Call'}</span>
          </button>

          <button
            onClick={handleReset}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 14px',
              borderRadius: '8px',
              background: 'rgba(155, 142, 170, 0.1)',
              border: '1px solid rgba(155, 142, 170, 0.2)',
              color: '#9B8EAA',
              fontSize: '14px',
            }}
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
          alignItems: 'center',
        }}
      >
        {/* Visual Stack Container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column-reverse',
            gap: 8,
            padding: 16,
            background: 'rgba(18, 13, 23, 0.7)',
            borderRadius: 8,
            border: '1px solid rgba(155, 142, 170, 0.2)',
            minHeight: '260px',
            justifyContent: 'flex-start',
          }}
        >
          {frames.map((frame, index) => {
            const isPushed = index <= currentLevel
            const isTop = index === currentLevel
            return (
              <div
                key={frame.call}
                style={{
                  padding: '12px 18px',
                  borderRadius: 6,
                  border: isTop
                    ? '1.5px solid #35D6C5'
                    : isPushed
                    ? '1px solid rgba(155, 142, 170, 0.3)'
                    : '1px dashed rgba(155, 142, 170, 0.1)',
                  backgroundColor: isTop
                    ? 'rgba(53, 214, 197, 0.15)'
                    : isPushed
                    ? 'rgba(33, 22, 34, 0.8)'
                    : 'transparent',
                  opacity: isPushed ? 1 : 0.25,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span className="font-mono text-teal" style={{ fontSize: '15px', fontWeight: 600 }}>
                    {frame.call}
                  </span>
                  <span className="text-lavender" style={{ fontSize: '13px' }}>
                    ({frame.work})
                  </span>
                </div>
                <span className="font-mono text-ivory" style={{ fontSize: '13px' }}>
                  Input: {frame.size}
                </span>
              </div>
            )
          })}
        </div>

        {/* Stack Telemetry & Paper Explanation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              padding: 16,
              background: 'rgba(33, 22, 34, 0.5)',
              borderRadius: 8,
              border: '1px solid rgba(155, 142, 170, 0.15)',
            }}
          >
            <div className="font-mono text-teal" style={{ fontSize: '13px', letterSpacing: '0.1em', marginBottom: 6 }}>
              STACK METRICS
            </div>
            <div style={{ fontSize: '24px', fontWeight: 600, color: '#F5F0E8' }}>
              Stack Depth: <span className="text-teal font-mono">{currentLevel + 1}</span> / {frames.length}
            </div>
            <div style={{ fontSize: '15px', color: '#9B8EAA', marginTop: 4 }}>
              Current Status:{' '}
              <span className={isUnwinding ? 'text-coral' : 'text-teal'} style={{ fontWeight: 600 }}>
                {isUnwinding ? 'Unwinding / Popping Frames' : 'Pushing Recursive Call Frames'}
              </span>
            </div>
          </div>

          <div style={{ fontSize: '16px', color: '#F5F0E8', lineHeight: 1.6 }}>
            <p style={{ marginBottom: 10 }}>
              <strong className="text-teal">Input Storage vs. Auxiliary Memory:</strong> Space analysis distinguishes memory to store inputs from auxiliary memory created during execution.
            </p>
            <p style={{ color: '#9B8EAA', fontSize: '15px' }}>
              In-place algorithms use <span className="font-mono text-teal">O(1)</span> auxiliary space besides stack overhead. Recursive algorithms require auxiliary memory proportional to maximum recursion depth <span className="font-mono text-teal">O(log n)</span> or <span className="font-mono text-teal">O(n)</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
