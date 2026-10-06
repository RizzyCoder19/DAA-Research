import { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { hierarchy, tree } from 'd3-hierarchy'
import { ChevronLeft, ChevronRight, GitBranch, MinusCircle, PlusCircle, RotateCcw, Shield } from 'lucide-react'
import { research } from '../../content/research'
import { createRecursionTree, type RecursionNode } from '../../content/recursionTree'
import { vivaQuestions, alignedAnswers } from '../../content/viva'

// ══════════════════════════════════════════════════════
// TYPE HELPERS
// ══════════════════════════════════════════════════════

type StageId = 'recursion' | 'recurrence' | 'tree' | 'solve' | 'asymptotic' | 'space' | 'context' | 'defense'

const STAGES: Array<{ id: StageId; num: string; label: string }> = [
  { id: 'recursion',   num: '01', label: 'RECURSION' },
  { id: 'recurrence',  num: '02', label: 'RECURRENCE' },
  { id: 'tree',        num: '03', label: 'TREE' },
  { id: 'solve',       num: '04', label: 'SOLVE' },
  { id: 'asymptotic',  num: '05', label: 'ASYMPTOTICS' },
  { id: 'space',       num: '06', label: 'SPACE' },
  { id: 'context',     num: '07', label: 'RESEARCH' },
  { id: 'defense',     num: '08', label: 'DEFENSE' },
]

// ══════════════════════════════════════════════════════
// GEOMETRY HELPERS
// ══════════════════════════════════════════════════════

function curvePath(sx: number, sy: number, tx: number, ty: number): string {
  const my = (sy + ty) / 2
  return `M${sx},${sy} C${sx},${my} ${tx},${my} ${tx},${ty}`
}

// ══════════════════════════════════════════════════════
// LIVE RECURSION TREE (gateway + tree scenes)
// ══════════════════════════════════════════════════════

function buildTree(a: number, depth: number, collapsed: ReadonlySet<string>) {
  const root = hierarchy<RecursionNode>(createRecursionTree(a, depth, collapsed))
  tree<RecursionNode>().size([1, 1])(root)
  return root
}

function getNodeLabel(level: number): string {
  if (level === 0) return 'T(n)'
  return `T(n/b${level > 1 ? `^${level}` : ''})`
}

// ══════════════════════════════════════════════════════
// GATEWAY TREE (Scene 01 — Recursion)
// ══════════════════════════════════════════════════════

function GatewayTree({
  a, depth, selected, onSelect
}: {
  a: number; depth: number; selected: string;
  onSelect: (path: string) => void
}) {
  const svgRef = useRef<SVGSVGElement>(null)
  const prevA = useRef(a)
  const prevD = useRef(depth)

  const root = buildTree(a, depth, new Set())

  const W = 540, H = 440
  const pad = { x: 60, y: 50 }
  const iW = W - pad.x * 2
  const iH = H - pad.y * 2

  useEffect(() => {
    if (!svgRef.current) return
    if (prevA.current === a && prevD.current === depth) return
    prevA.current = a; prevD.current = depth
    const ctx = gsap.context(() => {
      gsap.fromTo('.gt-edge', { opacity: 0.1 }, { opacity: 1, stagger: 0.03, duration: 0.4, ease: 'power2.out' })
      gsap.fromTo('.gt-node', { scale: 0.2, opacity: 0, transformBox: 'fill-box', transformOrigin: 'center' }, { scale: 1, opacity: 1, stagger: 0.04, duration: 0.35, ease: 'back.out(1.6)' })
    }, svgRef)
    return () => ctx.revert()
  }, [a, depth])

  return (
    <svg
      ref={svgRef}
      className="live-tree-svg"
      viewBox={`0 0 ${W} ${H}`}
      aria-label={`Interactive recursion tree: branching factor a=${a}, depth=${depth}`}
    >
      <g>
        {root.links().map((link, i) => {
          const sx = pad.x + (link.source.x ?? 0) * iW
          const sy = pad.y + (link.source.y ?? 0) * iH
          const tx = pad.x + (link.target.x ?? 0) * iW
          const ty = pad.y + (link.target.y ?? 0) * iH
          return (
            <path
              key={i}
              className="gt-edge live-tree-edge"
              d={curvePath(sx, sy, tx, ty)}
            />
          )
        })}
      </g>
      <g>
        {root.descendants().map((node, i) => {
          const nx = pad.x + (node.x ?? 0) * iW
          const ny = pad.y + (node.y ?? 0) * iH
          const r = Math.max(5, 15 - node.depth * 2.5)
          const isRoot = node.depth === 0
          const isSelected = node.data.path === selected
          const label = getNodeLabel(node.depth)
          return (
            <g
              key={i}
              className={`gt-node live-tree-node ${isRoot ? 'root-node' : ''} ${isSelected ? 'selected' : ''}`}
              transform={`translate(${nx},${ny})`}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              aria-label={`${label} — level ${node.depth}`}
              onClick={() => onSelect(node.data.path)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(node.data.path) } }}
            >
              <circle cx={0} cy={0} r={r} />
              {isRoot && <text x={0} y={0}>T(n)</text>}
            </g>
          )
        })}
      </g>
    </svg>
  )
}

// ══════════════════════════════════════════════════════
// ANALYSIS TREE (Scene 03 — Tree)
// ══════════════════════════════════════════════════════

function AnalysisTree() {
  const [a, setA] = useState(2)
  const [depth, setDepth] = useState(3)
  const [level, setLevel] = useState(-1)
  const [selected, setSelected] = useState('root')
  const [tracePath, setTracePath] = useState<string | null>(null)
  const [collapsed, setCollapsed] = useReducer(
    (prev: Set<string>, path: string) => {
      const next = new Set(prev)
      next.has(path) ? next.delete(path) : next.add(path)
      return next
    },
    new Set<string>()
  )
  const [showWork, setShowWork] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)

  const root = buildTree(a, depth, collapsed)
  const nodes = root.descendants()
  const links = root.links()

  const W = 900, H = 430
  const pad = { x: 50, y: 44 }
  const iW = W - pad.x * 2
  const iH = H - pad.y * 2

  const selNode = nodes.find(n => n.data.path === selected) ?? nodes[0]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.at-edge',
        { opacity: 0.05, strokeDashoffset: 60, strokeDasharray: 60 },
        { opacity: 1, strokeDashoffset: 0, stagger: { amount: 0.3 }, duration: 0.4, ease: 'power2.out', clearProps: 'strokeDashoffset,strokeDasharray' }
      )
      gsap.fromTo('.at-node',
        { scale: 0.1, opacity: 0, transformBox: 'fill-box', transformOrigin: 'center' },
        { scale: 1, opacity: 1, stagger: { amount: 0.35 }, duration: 0.35, ease: 'back.out(1.5)' }
      )
    }, svgRef)
    return () => ctx.revert()
  }, [a, depth, collapsed])

  const resetAll = () => { setA(2); setDepth(3); setLevel(-1); setSelected('root'); setTracePath(null) }

  return (
    <div className="scene-tree">
      <div className="tree-workspace">
        {/* Header controls */}
        <div className="tree-header">
          <div className="tree-header-title">
            <span>T(n)</span>
            RECURSION TREE
          </div>
          <div className="tree-param-row">
            <div className="tree-param-group">
              BRANCH <b>a={a}</b>
              <input type="range" min={2} max={3} value={a}
                aria-label="Branching factor a"
                onChange={e => { setA(+e.target.value); setSelected('root'); setTracePath(null) }} />
            </div>
            <div className="tree-param-group">
              DEPTH <b>{depth}</b>
              <input type="range" min={1} max={4} value={depth}
                aria-label="Tree depth"
                onChange={e => { setDepth(+e.target.value); setLevel(-1); setSelected('root'); setTracePath(null) }} />
            </div>
            <button className="tree-reset-btn" onClick={resetAll} aria-label="Reset tree">
              <RotateCcw size={10} style={{ display: 'inline', marginRight: 5 }} />
              RESET
            </button>
          </div>
        </div>

        {/* SVG */}
        <div className="tree-svg-area">
          <svg ref={svgRef} className="analysis-tree-svg" viewBox={`0 0 ${W} ${H}`}
            aria-label={`Recursion tree: a=${a} branches, depth=${depth} levels`}>
            <g>
              {links.map((link, i) => {
                const sx = pad.x + (link.source.x ?? 0) * iW
                const sy = pad.y + (link.source.y ?? 0) * iH
                const tx = pad.x + (link.target.x ?? 0) * iW
                const ty = pad.y + (link.target.y ?? 0) * iH
                const isTrace = tracePath ? link.target.data.path.startsWith(tracePath) || tracePath.startsWith(link.target.data.path) : false
                const isLevel = link.target.depth === level
                return (
                  <path
                    key={i}
                    className={`at-edge ${isTrace ? 'trace-active' : ''} ${isLevel ? 'level-active' : ''}`}
                    d={curvePath(sx, sy, tx, ty)}
                  />
                )
              })}
            </g>
            <g>
              {nodes.map((node, i) => {
                const nx = pad.x + (node.x ?? 0) * iW
                const ny = pad.y + (node.y ?? 0) * iH
                const r = Math.max(4, 14 - node.depth * 2.2)
                const isRoot = node.depth === 0
                const isSel = node.data.path === selected
                const isLevel = node.depth === level
                const isTrace = tracePath ? (node.data.path.startsWith(tracePath) || tracePath.startsWith(node.data.path)) : false
                const label = getNodeLabel(node.depth)
                return (
                  <g
                    key={i}
                    className={`at-node ${isRoot ? 'at-root' : ''} ${isSel ? 'at-selected' : ''} ${isLevel ? 'at-level' : ''} ${isTrace ? 'at-traced' : ''}`}
                    transform={`translate(${nx},${ny})`}
                    role="button" tabIndex={0}
                    aria-pressed={isSel}
                    aria-label={`${label} at level ${node.depth}`}
                    onClick={() => { setSelected(node.data.path); setTracePath(null) }}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected(node.data.path); setTracePath(null) } }}
                  >
                    <circle cx={0} cy={0} r={r} />
                    {(isRoot || isSel) && <text x={0} y={0} className="at-node-label" style={{ fontSize: isRoot ? '9px' : '8px' }}>{label}</text>}
                    {showWork && node.depth > 0 && <text className="at-work-text" x={r + 3} y={3}>{`f(n/b^${node.depth})`}</text>}
                  </g>
                )
              })}
            </g>
          </svg>
        </div>

        {/* Level strip */}
        <div style={{ display: 'flex', gap: 4, padding: '10px clamp(24px,4vw,60px)', borderTop: '1px solid var(--rule)', flexShrink: 0 }}>
          <span className="tree-ctrl-label">LEVEL</span>
          <button
            className={`tree-ctrl-btn ${level === -1 ? 'active' : ''}`}
            onClick={() => setLevel(-1)}
            aria-pressed={level === -1}
          >ALL</button>
          {Array.from({ length: depth + 1 }, (_, i) => (
            <button
              key={i}
              className={`tree-ctrl-btn ${level === i ? 'active' : ''}`}
              onClick={() => setLevel(i)}
              aria-pressed={level === i}
            >L{i}</button>
          ))}
          <label className="show-work-toggle" style={{ marginLeft: 'auto' }}>
            <input type="checkbox" checked={showWork} onChange={e => setShowWork(e.target.checked)} />
            Show work terms
          </label>
        </div>
      </div>

      {/* Inspector panel */}
      <div className="tree-inspector-panel" aria-live="polite">
        <div className="inspector-section">
          <div className="inspector-sec-label">SELECTED NODE</div>
          <div className="inspector-node-name">{getNodeLabel(selNode.depth)}</div>
          <div className="inspector-node-detail">Level {selNode.depth} · Path: {selNode.data.path.replace('root', '⊤')}</div>
        </div>
        <div className="inspector-section">
          <div className="inspector-sec-label">NODE DETAIL</div>
          <div style={{ color: 'rgba(237,233,224,0.6)', fontSize: 11, lineHeight: 1.7, fontWeight: 300 }}>
            {selNode.depth === 0
              ? 'Root problem. Input size n enters the recurrence.'
              : `Level ${selNode.depth} subproblem. Input is n/b^${selNode.depth}. Awaits results from its ${a} recursive children.`
            }
          </div>
        </div>
        <div className="inspector-section">
          <div className="inspector-sec-label">ACTIONS</div>
          <div className="inspector-actions">
            <button
              className="inspector-action-btn"
              onClick={() => setCollapsed(selected)}
              disabled={selNode.depth >= depth}
              aria-label={collapsed.has(selected) ? 'Expand branch' : 'Collapse branch'}
            >
              <GitBranch size={11} />
              {collapsed.has(selected) ? 'EXPAND BRANCH' : 'COLLAPSE BRANCH'}
            </button>
            <button
              className="inspector-action-btn"
              onClick={() => setTracePath(selected)}
              aria-label="Trace path from root"
            >
              TRACE PATH
            </button>
            {tracePath && (
              <button
                className="inspector-action-btn"
                onClick={() => setTracePath(null)}
                aria-label="Clear trace"
              >
                CLEAR TRACE
              </button>
            )}
          </div>
        </div>
        <div className="inspector-section">
          <div className="inspector-sec-label">DISCLAIMER</div>
          <div style={{ color: '#4A5A6A', fontSize: 10, lineHeight: 1.65, fontWeight: 300 }}>
            Illustrative structural model. No complexity bound is calculated here.
          </div>
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════
// ASYMPTOTIC VISUALIZATION
// ══════════════════════════════════════════════════════

type BoundId = 'O' | 'Omega' | 'Theta'

function AsymptoticViz({ bound }: { bound: BoundId }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const W = 360, H = 300, pad = 40

  // Sample points for illustrative curves — purely conceptual
  const pts = (fn: (x: number) => number) =>
    Array.from({ length: 50 }, (_, i) => {
      const x = pad + (i / 49) * (W - pad * 2)
      const t = i / 49
      return `${x},${pad + (H - pad * 2) * (1 - Math.max(0, Math.min(1, fn(t))))} `
    }).join('')

  const ref   = pts(t => t * t + 0.12)          // reference f(n)
  const upper = pts(t => t * t * 1.45 + 0.22)    // c₂·f(n)
  const lower = pts(t => t * t * 0.65)           // c₁·f(n)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.a-curve',
        { strokeDashoffset: 900, strokeDasharray: 900, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, stagger: 0.12, duration: 1.2, ease: 'power2.out', clearProps: 'strokeDashoffset,strokeDasharray' }
      )
      if (bound === 'O' || bound === 'Theta') {
        gsap.fromTo('.a-band-upper', { opacity: 0 }, { opacity: 0.08, duration: 0.8, ease: 'power2.out' })
      }
      if (bound === 'Omega' || bound === 'Theta') {
        gsap.fromTo('.a-band-lower', { opacity: 0 }, { opacity: 0.08, duration: 0.8, ease: 'power2.out' })
      }
    }, svgRef)
    return () => ctx.revert()
  }, [bound])

  return (
    <svg
      ref={svgRef}
      className="asymp-svg"
      viewBox={`0 0 ${W} ${H}`}
      aria-label={`Asymptotic bound illustration for ${bound === 'O' ? 'Big-O upper bound' : bound === 'Omega' ? 'Big-Omega lower bound' : 'Big-Theta tight bound'}`}
    >
      {/* Axes */}
      <line className="a-axis" x1={pad} y1={pad} x2={pad} y2={H - pad} />
      <line className="a-axis" x1={pad} y1={H - pad} x2={W - pad} y2={H - pad} />
      <text className="a-label" x={W - pad + 4} y={H - pad + 4}>n</text>
      <text className="a-label" x={pad + 4} y={pad - 6}>T</text>

      {/* Band regions */}
      {(bound === 'O' || bound === 'Theta') && (
        <polygon
          className="a-band a-band-upper"
          points={`${upper} ${[...pts(t => t * t + 0.12)].reverse().join('')}`}
          fill="rgba(196,163,90,0.2)"
        />
      )}
      {(bound === 'Omega' || bound === 'Theta') && (
        <polygon
          className="a-band a-band-lower"
          points={`${lower} ${[...pts(t => t * t + 0.12)].reverse().join('')}`}
          fill="rgba(126,200,216,0.15)"
        />
      )}

      {/* Curves */}
      {(bound === 'O' || bound === 'Theta') && (
        <polyline className="a-curve a-upper" points={upper} />
      )}
      {(bound === 'Omega' || bound === 'Theta') && (
        <polyline className="a-curve a-lower" points={lower} />
      )}
      <polyline className="a-curve a-reference" points={ref} />

      {/* Labels */}
      <text className="a-curve-label" x={W - pad - 18} y={pad + 18}
        fill={bound === 'Theta' ? 'rgba(196,163,90,0.8)' : bound === 'O' ? 'rgba(196,163,90,0.8)' : 'rgba(126,200,216,0.8)'}
        style={{ fontSize: 9, fontFamily: 'var(--system)' }}>
        {bound === 'O' ? 'c·g(n)' : bound === 'Omega' ? 'c₁·g(n)' : 'c₂·g(n)'}
      </text>
      <text className="a-curve-label" x={W - pad - 30} y={H - pad - 30}
        fill="rgba(126,200,216,0.8)"
        style={{ fontSize: 9, fontFamily: 'var(--system)' }}>
        {bound === 'Theta' ? 'c₁·g(n)' : 'f(n)'}
      </text>
      <text className="a-curve-label" x={W - pad - 36} y={H - pad - 60}
        fill="rgba(237,233,224,0.5)"
        style={{ fontSize: 9, fontFamily: 'var(--system)' }}>
        f(n)
      </text>

      {/* Threshold marker */}
      <line className="a-threshold" x1={pad + 120} y1={pad} x2={pad + 120} y2={H - pad} />
      <text className="a-label" x={pad + 122} y={H - pad - 4}>n₀</text>
    </svg>
  )
}

// ══════════════════════════════════════════════════════
// DEFENSE MODE
// ══════════════════════════════════════════════════════

function DefenseScene() {
  const [started, setStarted] = useState(false)
  const [qIdx, setQIdx] = useState(0)
  const [draft, setDraft] = useState('')
  const [revealed, setRevealed] = useState(false)
  const total = vivaQuestions.length

  const q = vivaQuestions[qIdx]
  const answer = alignedAnswers[qIdx]

  const next = () => { setQIdx(i => Math.min(i + 1, total - 1)); setDraft(''); setRevealed(false) }
  const prev = () => { setQIdx(i => Math.max(i - 1, 0)); setDraft(''); setRevealed(false) }
  const pct = `${Math.round(((qIdx + 1) / total) * 100)}%`

  if (!started) {
    return (
      <div className="scene-defense">
        <div className="defense-header">
          <div className="defense-mode-label">
            <div className="pulse-dot" />
            DEFENSE MODE
          </div>
        </div>
        <div className="defense-start-screen">
          <h2 className="defense-start-heading">
            Ready to defend<br /><em>the research?</em>
          </h2>
          <p className="defense-start-body">
            {total} questions drawn from the viva handout and the research paper.
            Think through each question, draft your answer, then reveal the paper-aligned response.
            Every answer is strictly grounded in the research — no invented claims.
          </p>
          <button className="defense-start-btn" onClick={() => setStarted(true)}>
            <Shield size={13} /> BEGIN DEFENSE SIMULATION
          </button>
          <p className="source-note" style={{ marginTop: 24 }}>
            <span>PAPER-ALIGNED</span>
            <i />
            Common Viva Questions · DAA_Common_Viva_Questions.pdf
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="scene-defense" aria-live="polite">
      <div className="defense-header">
        <div className="defense-mode-label">
          <div className="pulse-dot" />
          DEFENSE MODE
        </div>
        <div className="defense-progress-bar">
          {String(qIdx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          <div className="progress-track">
            <div className="progress-fill" style={{ width: pct }} />
          </div>
        </div>
      </div>

      <div className="defense-question-area">
        <div className="defense-q-label">EXAMINER QUESTION {String(qIdx + 1).padStart(2, '0')}</div>
        <h2 className="defense-question">{q.question}</h2>

        {!revealed && (
          <div className="defense-draft-area">
            <div className="defense-draft-label">
              <span>YOUR RESPONSE (OPTIONAL)</span>
              <span>{draft.length} chars</span>
            </div>
            <textarea
              className="defense-textarea"
              value={draft}
              onChange={e => setDraft(e.target.value)}
              placeholder="Think through the answer before revealing..."
              aria-label="Draft your answer here"
              rows={3}
            />
            <button className="defense-reveal-btn" onClick={() => setRevealed(true)}>
              REVEAL PAPER-ALIGNED ANSWER →
            </button>
          </div>
        )}

        {revealed && (
          <div className="defense-answer-panel">
            <div className="defense-answer-badge">
              <span>PAPER-ALIGNED ANSWER</span>
              <strong>SOURCE-FAITHFUL · NO INVENTED CLAIMS</strong>
            </div>
            <p className="defense-answer-text">{answer}</p>
            <details className="defense-handout">
              <summary>
                VIVA PDF NOTE
                <span>SHOW CONTEXT ↓</span>
              </summary>
              <p>{q.note}</p>
            </details>
          </div>
        )}
      </div>

      <div className="defense-nav">
        <button className="defense-nav-btn" onClick={prev} disabled={qIdx === 0} aria-label="Previous question">
          <ChevronLeft size={13} /> PREVIOUS
        </button>
        <p className="defense-integrity">
          All answers are strictly grounded in the research paper and the provided viva handout. No experimental results or invented claims are added.
        </p>
        <button className="defense-nav-btn next" onClick={next} disabled={qIdx === total - 1} aria-label="Next question">
          NEXT <ChevronRight size={13} />
        </button>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════
// CONTEXT SCENE (Applications / Limitations / Future)
// ══════════════════════════════════════════════════════

type ContextTab = 'applications' | 'limitations' | 'future'

function ContextScene() {
  const [tab, setTab] = useState<ContextTab>('applications')
  const [selApp, setSelApp] = useState(0)

  return (
    <div className="scene-context">
      <div className="context-header">
        <h2 className="context-title">Research <em>context.</em></h2>
        <p className="context-subtitle">
          The paper identifies application areas, qualifications, and proposed future directions.
          This section strictly represents what the paper states — no invented experiments.
        </p>
      </div>

      <div>
        <div className="context-sub-nav" role="group" aria-label="Context tabs">
          {(['applications', 'limitations', 'future'] as ContextTab[]).map(t => (
            <button
              key={t}
              className={`sub-nav-btn ${tab === t ? 'active' : ''}`}
              aria-pressed={tab === t}
              onClick={() => setTab(t)}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        {tab === 'applications' && (
          <div>
            <div className="app-grid" role="group" aria-label="Application areas listed in the paper">
              {research.applications.map((app, i) => (
                <div
                  key={app}
                  className={`app-cell ${selApp === i ? 'active' : ''}`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={selApp === i}
                  onClick={() => setSelApp(i)}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelApp(i) } }}
                >
                  <div className="app-cell-num">{String(i + 1).padStart(2, '0')}</div>
                  <div className="app-cell-name">{app}</div>
                </div>
              ))}
            </div>
            <p className="source-note" style={{ marginTop: 16 }}>
              <span>PAPER-ALIGNED</span>
              <i />
              Section 6.1 Applications · Printed page 7
            </p>
          </div>
        )}

        {tab === 'limitations' && (
          <div>
            <div className="limits-list" role="list" aria-label="Research limitations">
              {research.limitations.map((item, i) => (
                <div key={item} className="limit-item" role="listitem">
                  <div className="limit-num">0{i + 1}</div>
                  <div className="limit-text">{item}</div>
                </div>
              ))}
            </div>
            <p className="source-note" style={{ marginTop: 16 }}>
              <span>PAPER-ALIGNED</span>
              <i />
              Section 6.3 Limitations · Printed page 7
            </p>
          </div>
        )}

        {tab === 'future' && (
          <div>
            <div className="future-list" role="list" aria-label="Future scope proposed in the paper">
              {research.futureScope.map((item, i) => (
                <div key={item} className="future-item" role="listitem">
                  <div className="future-num">0{i + 1}</div>
                  <div className="future-text">{item}</div>
                  <div className="future-tag">PROPOSED</div>
                </div>
              ))}
            </div>
            <p className="source-note" style={{ marginTop: 16 }}>
              <span>PAPER-ALIGNED</span>
              <i />
              Section 6.5 Future Scope · Printed page 7
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════
// MAIN ANALYSIS ENVIRONMENT
// ══════════════════════════════════════════════════════

export function AnalysisEnvironment() {
  const [stage, setStage] = useState<StageId>('recursion')

  // Gateway tree state
  const [gatewayA, setGatewayA] = useState(2)
  const [gatewayDepth, setGatewayDepth] = useState(3)
  const [gatewaySelected, setGatewaySelected] = useState('root')

  // Recurrence term state
  const [activeTerm, setActiveTerm] = useState<string>('tn')
  const canvasRef = useRef<HTMLDivElement>(null)

  // Scene transition
  const goTo = useCallback((id: StageId) => {
    setStage(id)
    canvasRef.current?.scrollTo({ top: 0 })
  }, [])

  // Solving method state
  const [solveMethod, setSolveMethod] = useState<'tree' | 'substitution' | 'standard'>('tree')

  // Asymptotic state
  const [bound, setBound] = useState<BoundId>('O')

  // Space/call stack state
  const [stackDepth, setStackDepth] = useState(3)
  const [unwinding, setUnwinding] = useState(false)

  // Term descriptions
  const termMap: Record<string, { symbol: string; label: string; description: string; treeNote: string }> = {
    tn:  { symbol: 'T(n)', label: 'RUNNING TIME', description: research.equationTerms[0].description, treeNote: 'Represents the entire tree — the total cost of solving the problem.' },
    a:   { symbol: 'a', label: 'RECURSIVE CALLS', description: research.equationTerms[1].description, treeNote: 'Equals the branching factor — how many subtrees each node spawns.' },
    nb:  { symbol: 'T(n/b)', label: 'REDUCED INPUT', description: research.equationTerms[2].description, treeNote: 'Each child node represents one T(n/b) — a smaller recursive instance.' },
    fn:  { symbol: 'f(n)', label: 'OTHER WORK', description: research.equationTerms[3].description, treeNote: 'Represents the non-recursive work at each level of the tree.' },
  }
  const term = termMap[activeTerm]

  // Method descriptions
  const methodMap: Record<string, { title: string; body: string; highlighted: string[]; hint: string }> = {
    tree:         { title: 'Recursion Tree', body: research.methods[0].description, highlighted: ['a', 'T(n/b)'], hint: 'Draw the recursion tree. Sum the work across all levels. Identify which level or summation dominates.' },
    substitution: { title: 'Substitution', body: research.methods[1].description, highlighted: ['T(n)', 'T(n/b)', 'f(n)'], hint: 'Guess a bound. Substitute it into the recurrence. Verify algebraically that it holds.' },
    standard:     { title: 'Standard Recurrence Results', body: research.methods[2].description, highlighted: ['T(n)', 'f(n)'], hint: 'Match the recurrence to a known form and apply the corresponding standard result.' },
  }
  const method = methodMap[solveMethod]

  // Bound descriptions — correct mathematical definitions
  const boundMap: Record<BoundId, { symbol: string; name: string; formal: string; visual: string }> = {
    O:     { symbol: 'O', name: 'UPPER BOUND', formal: 'f(n) = O(g(n)): There exist positive constants c and n₀ such that f(n) ≤ c·g(n) for all n ≥ n₀.', visual: 'g(n) lies above f(n) after n₀. O does not say "worst case" — it is an upper bound on the function.' },
    Omega: { symbol: 'Ω', name: 'LOWER BOUND', formal: 'f(n) = Ω(g(n)): There exist positive constants c and n₀ such that f(n) ≥ c·g(n) for all n ≥ n₀.', visual: 'g(n) lies below f(n) after n₀. Ω does not mean "best case" — it is a lower bound on the function.' },
    Theta: { symbol: 'Θ', name: 'TIGHT BOUND', formal: 'f(n) = Θ(g(n)): f(n) = O(g(n)) and f(n) = Ω(g(n)) simultaneously.', visual: 'g(n) sandwiches f(n) within constant factors. A tight bound when both upper and lower match.' },
  }
  const bnd = boundMap[bound]

  // Stack frames
  const frames = Array.from({ length: stackDepth }, (_, i) => i)

  return (
    <div className="env ready">
      {/* STAGE RAIL */}
      <aside className="stage-rail" aria-label="Analysis stages">
        <div className="rail-logo" aria-label="Recursive Analysis">R</div>
        <nav className="rail-stages" aria-label="Analysis stage navigation">
          {STAGES.slice(0, 7).map(s => (
            <button
              key={s.id}
              className={`rail-stage-btn ${stage === s.id ? 'active' : ''}`}
              data-label={`${s.num} ${s.label}`}
              aria-label={`${s.label} — stage ${s.num}`}
              aria-current={stage === s.id ? 'page' : undefined}
              onClick={() => goTo(s.id)}
            >
              <div className="stage-dot" />
            </button>
          ))}
        </nav>
        <div className="rail-bottom">
          <button
            className={`rail-defense-btn ${stage === 'defense' ? 'defense-active' : ''}`}
            data-label="08 DEFENSE"
            aria-label="Defense mode — viva preparation"
            aria-current={stage === 'defense' ? 'page' : undefined}
            onClick={() => goTo('defense')}
          >
            DEF
          </button>
        </div>
      </aside>

      {/* ANALYSIS CANVAS */}
      <main className="analysis-canvas" ref={canvasRef} aria-label="Analysis environment">

        {/* ── SCENE 01: RECURSION ────────────────── */}
        <div className={`scene scene-gateway ${stage === 'recursion' ? 'scene-visible' : ''}`}
          aria-hidden={stage !== 'recursion'} inert={stage !== 'recursion' ? true : undefined}>
          <div className="gateway-left">
            <p className="gateway-question">
              THE CENTRAL QUESTION<br />
              <strong>How does the cost of a recursive algorithm grow as the input grows?</strong>
            </p>
            <h1 className="gateway-heading">
              Recursion.<br /><em>Structure that calls itself.</em>
            </h1>
            <p className="gateway-body">
              {research.abstract.split('Their running')[0].trim()}
            </p>
            <div className="gateway-actions">
              <button className="gateway-primary-btn" onClick={() => goTo('recurrence')}>
                EXPLORE RECURRENCE →
              </button>
              <button className="gateway-secondary-btn" onClick={() => goTo('tree')}>
                VIEW TREE
              </button>
            </div>
            <div className="gateway-meta">
              <div className="meta-chip">
                <strong>RESEARCH</strong>
                {research.title}
              </div>
              <div className="meta-chip">
                <strong>RESEARCHER</strong>
                {research.researcher} · Roll {research.rollNumber}
              </div>
              <div className="meta-chip">
                <strong>YEAR</strong>
                {research.academicYear}
              </div>
            </div>
          </div>
          <div className="gateway-right">
            <GatewayTree
              a={gatewayA}
              depth={gatewayDepth}
              selected={gatewaySelected}
              onSelect={setGatewaySelected}
            />
            <div className="tree-controls-bar">
              <span className="tree-param-label">
                BRANCH <span className="tree-param-val">{gatewayA}</span>
              </span>
              <input type="range" min={2} max={3} value={gatewayA} className="tree-range"
                aria-label="Branching factor"
                onChange={e => { setGatewayA(+e.target.value); setGatewaySelected('root') }} />
              <span className="tree-param-label" style={{ marginLeft: 8 }}>
                DEPTH <span className="tree-param-val">{gatewayDepth}</span>
              </span>
              <input type="range" min={1} max={4} value={gatewayDepth} className="tree-range"
                aria-label="Tree depth"
                onChange={e => { setGatewayDepth(+e.target.value); setGatewaySelected('root') }} />
            </div>
          </div>
        </div>

        {/* ── SCENE 02: RECURRENCE ─────────────── */}
        <div className={`scene scene-recurrence ${stage === 'recurrence' ? 'scene-visible' : ''}`}
          aria-hidden={stage !== 'recurrence'} inert={stage !== 'recurrence' ? true : undefined}>
          <div className="recurrence-field">
            <p className="recurrence-eyebrow">THE RECURRENCE · SELECT A TERM TO INSPECT</p>
            <div className="recurrence-eq"
              role="group" aria-label="Recurrence equation T(n) = a·T(n/b) + f(n)">
              <span className={`eq-term ${activeTerm === 'tn' ? 'eq-active' : ''}`}
                role="button" tabIndex={0} aria-pressed={activeTerm === 'tn'}
                aria-label="T of n — total running time"
                onClick={() => setActiveTerm('tn')}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveTerm('tn') } }}>
                T(n)
              </span>
              <span className="eq-op">=</span>
              <span className={`eq-term ${activeTerm === 'a' ? 'eq-active' : ''}`}
                role="button" tabIndex={0} aria-pressed={activeTerm === 'a'}
                aria-label="a — number of recursive subproblems"
                onClick={() => setActiveTerm('a')}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveTerm('a') } }}>
                a
              </span>
              <span className={`eq-term ${activeTerm === 'nb' ? 'eq-active' : ''}`}
                role="button" tabIndex={0} aria-pressed={activeTerm === 'nb'}
                aria-label="T of n over b — reduced input subproblem"
                onClick={() => setActiveTerm('nb')}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveTerm('nb') } }}>
                T(n/b)
              </span>
              <span className="eq-op">+</span>
              <span className={`eq-term ${activeTerm === 'fn' ? 'eq-active' : ''}`}
                role="button" tabIndex={0} aria-pressed={activeTerm === 'fn'}
                aria-label="f of n — non-recursive work"
                onClick={() => setActiveTerm('fn')}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveTerm('fn') } }}>
                f(n)
              </span>
            </div>

            <div className="eq-inspector" aria-live="polite">
              <div className="inspector-left">
                <div className="inspector-symbol">{term.symbol}</div>
                <div className="inspector-label">{term.label}</div>
                <p className="inspector-body">{term.description}</p>
                <p className="source-note" style={{ marginTop: 14 }}>
                  <span>PAPER-ALIGNED</span>
                  <i />
                  Section 1.4 &amp; 4.1 · Pages 2, 5
                </p>
              </div>
              <div className="inspector-right">
                <div className="inspector-tree-note">
                  <strong>TREE CONNECTION</strong>
                  {term.treeNote}
                </div>
                <button
                  style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 8, padding: '10px 0', color: 'var(--gold)', font: '8px var(--system)', letterSpacing: '0.1em', borderBottom: '1px solid transparent', transition: 'border-color 0.2s' }}
                  onClick={() => goTo('tree')}
                >
                  SEE IN RECURSION TREE →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── SCENE 03: TREE ────────────────────── */}
        <div className={`scene ${stage === 'tree' ? 'scene-visible' : ''}`}
          aria-hidden={stage !== 'tree'} inert={stage !== 'tree' ? true : undefined}>
          <AnalysisTree />
        </div>

        {/* ── SCENE 04: SOLVE ───────────────────── */}
        <div className={`scene scene-solve ${stage === 'solve' ? 'scene-visible' : ''}`}
          aria-hidden={stage !== 'solve'} inert={stage !== 'solve' ? true : undefined}>
          <p className="solve-eyebrow">THREE ANALYTICAL LENSES · SAME RECURRENCE</p>
          <div className="solve-method-tabs" role="group" aria-label="Solving method">
            {research.methods.map(m => (
              <button key={m.id}
                className={`solve-tab ${solveMethod === m.id ? 'active' : ''}`}
                aria-pressed={solveMethod === m.id}
                onClick={() => setSolveMethod(m.id as typeof solveMethod)}>
                {m.name}
              </button>
            ))}
          </div>
          <div className="solve-eq"
            role="group" aria-label="Recurrence equation with highlighted terms for selected method">
            {['T(n)', '=', 'a', 'T(n/b)', '+', 'f(n)'].map((tok, i) => {
              const isOp = tok === '=' || tok === '+'
              const lit = method.highlighted.includes(tok)
              return isOp
                ? <span key={i} className="solve-op">{tok}</span>
                : <span key={i} className={`solve-term ${lit ? 'lit' : ''}`}>{tok}</span>
            })}
          </div>
          <div className="solve-explanation">
            <div>
              <h2 className="solve-method-title">{method.title}</h2>
              <p className="solve-method-body">{method.body}</p>
              <p className="source-note" style={{ marginTop: 16 }}>
                <span>PAPER-ALIGNED</span>
                <i />
                Section 4.1 Working Principle · Page 5
              </p>
            </div>
            <div>
              <div className="solve-hint">
                <strong>ANALYTICAL PROCEDURE</strong>
                {method.hint}
              </div>
              <p style={{ marginTop: 18, color: '#4A5A6A', fontSize: 11, lineHeight: 1.7, fontWeight: 300 }}>
                The same recurrence T(n) = aT(n/b) + f(n) — each method approaches its analysis differently.
                No method yields a single universal result; the bound depends on the specific functions involved.
              </p>
            </div>
          </div>
        </div>

        {/* ── SCENE 05: ASYMPTOTIC ──────────────── */}
        <div className={`scene scene-asymptotic bound-${bound} ${stage === 'asymptotic' ? 'scene-visible' : ''}`}
          aria-hidden={stage !== 'asymptotic'} inert={stage !== 'asymptotic' ? true : undefined}>
          <div className="asymp-left">
            <div className="asymp-selector" role="group" aria-label="Asymptotic bound selector">
              {(Object.keys(boundMap) as BoundId[]).map(b => (
                <button key={b}
                  className={`asymp-tab ${bound === b ? 'active' : ''}`}
                  aria-pressed={bound === b}
                  onClick={() => setBound(b)}>
                  {b === 'Omega' ? 'Ω' : b === 'Theta' ? 'Θ' : 'O'}
                </button>
              ))}
            </div>
            <div className="asymp-symbol" aria-label={bnd.name}>
              {bnd.symbol === 'Omega' ? 'Ω' : bnd.symbol === 'Theta' ? 'Θ' : bnd.symbol}
            </div>
            <div className="asymp-bound-name">{bnd.name}</div>
            <p className="asymp-formal">{bnd.formal}</p>
            <p className="asymp-visual-note">{bnd.visual}</p>
            <p className="source-note" style={{ marginTop: 18 }}>
              <span>PAPER-ALIGNED</span>
              <i />
              Section 4.2 Complexity Analysis · Page 5
            </p>
          </div>
          <div className="asymp-right">
            <AsymptoticViz bound={bound} />
          </div>
        </div>

        {/* ── SCENE 06: SPACE ───────────────────── */}
        <div className={`scene scene-space ${stage === 'space' ? 'scene-visible' : ''}`}
          aria-hidden={stage !== 'space'} inert={stage !== 'space' ? true : undefined}>
          <div className="space-left">
            <p className="space-eyebrow">SPACE · RECURSIVE CALL STACK</p>
            <h2 className="space-heading">Calls accumulate.<br /><em>Then return.</em></h2>
            <p className="space-body">
              Each active recursive call occupies a stack frame while it waits for its sub-calls to complete.
              The paper discusses space requirements using asymptotic notation. No universal bound is assigned here —
              it depends on the specific recursive structure.
            </p>
            <div className="space-controls">
              <button className="space-btn"
                onClick={() => { setStackDepth(d => Math.min(d + 1, 6)); setUnwinding(false) }}
                aria-label="Add a recursive call to the stack">
                <PlusCircle size={12} /> CALL <span className="btn-badge">+</span>
              </button>
              <button className="space-btn"
                onClick={() => { setStackDepth(d => Math.max(d - 1, 1)); setUnwinding(true) }}
                aria-label="Return from the current recursive call">
                <MinusCircle size={12} /> RETURN <span className="btn-badge">−</span>
              </button>
              <button className="space-btn"
                onClick={() => { setStackDepth(3); setUnwinding(false) }}
                aria-label="Reset call stack">
                <RotateCcw size={11} /> RESET
              </button>
            </div>
            <div className="space-readout">
              <div className="readout-item">
                <span>ACTIVE FRAMES</span>
                <strong>{stackDepth}</strong>
              </div>
              <div className="readout-item">
                <span>STATE</span>
                <strong style={{ fontSize: 14, color: unwinding ? 'var(--cyan)' : 'var(--gold)' }}>
                  {unwinding ? 'RETURNING' : 'CALLING'}
                </strong>
              </div>
            </div>
            <p className="source-note">
              <span>PAPER-ALIGNED</span>
              <i />
              Illustrative stack model only. Section 4.2 · Page 5
            </p>
          </div>

          <div className="space-right">
            <div
              className={`call-stack ${unwinding ? 'unwinding' : ''}`}
              aria-live="polite"
              aria-label={`Call stack with ${stackDepth} active frames`}
            >
              {frames.map((f, i) => {
                const isCurrent = i === frames.length - 1
                return (
                  <div
                    key={f}
                    className={`stack-frame ${isCurrent ? 'frame-current' : ''}`}
                    style={{ opacity: 1 - (frames.length - 1 - i) * 0.07 }}
                  >
                    <div className="frame-call">CALL {String(i + 1).padStart(2, '0')}</div>
                    <div className="frame-name">{f === 0 ? 'T(n)' : `T(n/b^${f})`}</div>
                    <div className="frame-status">{isCurrent ? 'ACTIVE' : 'WAITING'}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── SCENE 07: RESEARCH CONTEXT ────────── */}
        <div className={`scene ${stage === 'context' ? 'scene-visible' : ''}`}
          aria-hidden={stage !== 'context'} inert={stage !== 'context' ? true : undefined}>
          <ContextScene />
        </div>

        {/* ── SCENE 08: DEFENSE ─────────────────── */}
        <div className={`scene ${stage === 'defense' ? 'scene-visible' : ''}`}
          aria-hidden={stage !== 'defense'} inert={stage !== 'defense' ? true : undefined}>
          <DefenseScene />
        </div>

      </main>

      {/* System HUD */}
      <div className="system-hud" aria-hidden="true">
        <div className="hud-item">
          <b>{STAGES.find(s => s.id === stage)?.num ?? '—'}</b>
          {STAGES.find(s => s.id === stage)?.label ?? '—'}
        </div>
        <div className="hud-item">
          <b>REC</b>
          {research.equation}
        </div>
      </div>
    </div>
  )
}
