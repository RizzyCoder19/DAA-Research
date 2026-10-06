import { useEffect, useMemo, useRef, useState } from 'react'
import { hierarchy, tree } from 'd3-hierarchy'
import { gsap } from 'gsap'
import { ChevronDown, ChevronUp, GitBranch, RotateCcw } from 'lucide-react'
import type { RecurrenceTerm } from '../recurrence/RecurrenceExplorer'
import { createRecursionTree, type RecursionNode } from '../../content/recursionTree'

// Generate cubic bezier path between two tree nodes
function edgePath(sx: number, sy: number, tx: number, ty: number): string {
  const midY = (sy + ty) / 2
  return `M${sx + 30},${sy + 30} C${sx + 30},${midY} ${tx + 30},${midY} ${tx + 30},${ty + 30}`
}

// Description panel for selected node
function nodeDescription(depth: number): string {
  if (depth === 0) return 'Root problem. The original input of size n enters the recurrence.'
  if (depth === 1) return `First-level subproblem. Input is reduced to n/b. One of a such calls.`
  return `Level ${depth} subproblem. Input notation: n / b^${depth}. Awaiting results from its own children.`
}

export function RecursionTreeVisualizer({ activeTerm = 'tn' }: { activeTerm?: RecurrenceTerm }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const prevA = useRef(2)
  const prevDepth = useRef(3)

  const [a, setA] = useState(2)
  const [b, setB] = useState(2)
  const [depth, setDepth] = useState(3)
  const [level, setLevel] = useState(0)
  const [selectedPath, setSelectedPath] = useState('root')
  const [tracePath, setTracePath] = useState<string | null>(null)
  const [collapsed, setCollapsed] = useState<Set<string>>(() => new Set())
  const [showWork, setShowWork] = useState(false)

  const nodes = useMemo(() => {
    const root = hierarchy(createRecursionTree(a, depth, collapsed))
    tree<RecursionNode>().size([1000, 450])(root)
    return { links: root.links(), descendants: root.descendants() }
  }, [a, depth, collapsed])

  const selected = nodes.descendants.find((n) => n.data.path === selectedPath)?.data
    ?? nodes.descendants[0].data
  const hasChildren = selected.depth < depth
  const isCollapsed = collapsed.has(selected.path)
  const renderWork = showWork || activeTerm === 'fn'

  // Animate on a or depth change
  useEffect(() => {
    const aChanged = prevA.current !== a
    const dChanged = prevDepth.current !== depth
    prevA.current = a
    prevDepth.current = depth

    if (!aChanged && !dChanged) return
    if (!svgRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // Links draw in
      gsap.fromTo('.tree-links path',
        { autoAlpha: 0.1, strokeDashoffset: 60, strokeDasharray: 60 },
        {
          autoAlpha: 1,
          strokeDashoffset: 0,
          duration: 0.45,
          stagger: { amount: 0.3 },
          ease: 'power2.out',
          clearProps: 'strokeDashoffset,strokeDasharray',
        }
      )
      // Nodes pop in
      gsap.fromTo('.tree-node circle',
        { scale: 0.2, autoAlpha: 0, transformBox: 'fill-box', transformOrigin: 'center' },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 0.38,
          stagger: { amount: 0.35 },
          ease: 'back.out(1.4)',
          clearProps: 'transform,opacity',
        }
      )
    }, svgRef)

    return () => ctx.revert()
  }, [a, depth, collapsed])

  // Animate inspector when selection changes
  useEffect(() => {
    if (!containerRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo('.tree-inspector strong, .tree-inspector p, .tree-inspector small',
        { y: 10, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, stagger: 0.07, duration: 0.4, ease: 'power2.out' }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [selectedPath])

  const toggleSelectedBranch = () => setCollapsed((prev) => {
    const next = new Set(prev)
    if (next.has(selected.path)) next.delete(selected.path)
    else next.add(selected.path)
    return next
  })

  const reset = () => {
    setA(2); setB(2); setDepth(3); setLevel(0)
    setSelectedPath('root'); setTracePath(null)
    setCollapsed(new Set()); setShowWork(false)
  }

  return (
    <div className="tree-experience" ref={containerRef}>
      {/* CONTROLS */}
      <div className="tree-control-ribbon">
        <label>
          SUBPROBLEMS <b>a = {a}</b>
          <input
            aria-label="Illustrative number of subproblems (branching factor)"
            type="range" min="2" max="3" value={a}
            onChange={(e) => {
              setA(Number(e.target.value))
              setSelectedPath('root')
              setTracePath(null)
            }}
          />
        </label>
        <label>
          SIZE REDUCTION <b>b = {b}</b>
          <input
            aria-label="Illustrative input size reduction factor"
            type="range" min="2" max="4" value={b}
            onChange={(e) => setB(Number(e.target.value))}
          />
        </label>
        <label>
          VISIBLE DEPTH <b>{depth} levels</b>
          <input
            aria-label="Visible recursion depth"
            type="range" min="1" max="4" value={depth}
            onChange={(e) => {
              const d = Number(e.target.value)
              setDepth(d)
              setLevel((l) => Math.min(l, d))
              setSelectedPath('root')
              setTracePath(null)
              setCollapsed(new Set())
            }}
          />
        </label>
        <button className="tree-reset" onClick={reset} aria-label="Reset visualizer to defaults">
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      {/* LEVEL CONTROLS */}
      <div className="tree-level-controls" role="group" aria-label="Highlight a tree level">
        <span>HIGHLIGHT LEVEL</span>
        {Array.from({ length: depth + 1 }, (_, i) => (
          <button
            key={i}
            className={level === i ? 'selected' : ''}
            aria-pressed={level === i}
            onClick={() => setLevel(i)}
          >
            L{i}
          </button>
        ))}
        <label className="work-toggle">
          <input
            type="checkbox"
            checked={showWork}
            onChange={(e) => setShowWork(e.target.checked)}
          />
          Show level work
        </label>
      </div>

      {/* TREE STAGE — the visual instrument */}
      <div className={`tree-stage term-${activeTerm}`}>
        <svg
          ref={svgRef}
          viewBox="0 0 1100 530"
          role="group"
          aria-label={`Illustrative recursion tree: a=${a} subproblems, b=${b} reduction, depth=${depth} levels`}
        >
          {/* LINKS */}
          <g className="tree-links">
            {nodes.links.map((link) => {
              const traced = tracePath ? tracePath.startsWith(link.target.data.path) : false
              const isLevelLink = link.target.depth === level || (activeTerm === 'nb' && link.target.depth === level + 1)
              const isTermLink = activeTerm === 'a' && link.source.depth === level
              return (
                <path
                  key={link.target.data.path}
                  className={[
                    traced ? 'trace-link' : '',
                    isLevelLink ? 'level-link' : '',
                    isTermLink ? 'term-link-active' : '',
                  ].filter(Boolean).join(' ')}
                  d={edgePath(link.source.x!, link.source.y!, link.target.x!, link.target.y!)}
                />
              )
            })}
          </g>

          {/* NODES */}
          <g className="tree-nodes">
            {nodes.descendants.map((node) => {
              const radius = Math.max(6, 16 - node.depth * 2.5)
              const isSelected = selectedPath === node.data.path
              const isLevel = node.depth === level
              const isTraced = tracePath ? tracePath.startsWith(node.data.path) : false
              return (
                <g
                  key={node.data.path}
                  className={[
                    'tree-node',
                    isSelected ? 'node-selected' : '',
                    isLevel ? 'node-level-active' : '',
                    isTraced ? 'node-traced' : '',
                  ].filter(Boolean).join(' ')}
                  transform={`translate(${node.x! + 30},${node.y! + 30})`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select recursive node at level ${node.depth}, path ${node.data.path}`}
                  aria-pressed={isSelected}
                  onClick={() => { setSelectedPath(node.data.path); setTracePath(null) }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setSelectedPath(node.data.path)
                      setTracePath(null)
                    }
                  }}
                >
                  <circle r={radius} />
                  {node.depth === 0 && (
                    <text textAnchor="middle" dy="4">T(n)</text>
                  )}
                </g>
              )
            })}
          </g>

          {/* LEVEL WORK ANNOTATIONS */}
          {renderWork && Array.from({ length: depth + 1 }, (_, i) => (
            <g
              key={i}
              className="tree-work-label"
              transform={`translate(1060,${i * (450 / Math.max(depth, 1)) + 30})`}
            >
              <path d="M-28 0 H-10" />
              <text x="0" y="4">
                {i === 0 ? 'f(n)' : `f(n/b^${i})`}
              </text>
            </g>
          ))}
        </svg>

        {/* Level markers on left */}
        <div className="tree-level-markers" aria-hidden="true">
          {Array.from({ length: depth + 1 }, (_, i) => (
            <span key={i} className={i === level ? 'selected' : ''}>L{i}</span>
          ))}
        </div>
      </div>

      {/* INSPECTOR */}
      <div className="tree-inspector" aria-live="polite">
        <div>
          <span className="eyebrow">SELECTED CALL</span>
          <strong>
            {selected.depth === 0 ? 'T(n)' : `T(n / b^${selected.depth})`}
          </strong>
          <small>LEVEL {selected.depth} · {selected.path.replace('root', 'ROOT')}</small>
        </div>
        <p>{nodeDescription(selected.depth)}</p>
        <div className="tree-actions">
          <button
            onClick={toggleSelectedBranch}
            disabled={!hasChildren}
            aria-label={isCollapsed ? 'Expand selected branch' : 'Collapse selected branch'}
          >
            {isCollapsed ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
            {isCollapsed ? 'Expand' : 'Collapse'}
          </button>
          <button
            onClick={() => setTracePath(selected.path)}
            aria-label="Highlight path from root to selected node"
          >
            <GitBranch size={13} /> Trace path
          </button>
        </div>
      </div>

      {/* LEGEND */}
      <div className="tree-legend">
        <span><i className="legend-node" /> Recursive call</span>
        <span><i className="legend-line" /> Call relationship</span>
        <span aria-label="This is an illustrative model, not a performance measurement">
          ILLUSTRATIVE MODEL · NOT A PERFORMANCE RESULT
        </span>
      </div>
    </div>
  )
}
