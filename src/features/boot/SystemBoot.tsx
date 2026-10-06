import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { research } from '../../content/research'

// Precise binary tree geometry — 3 levels
// SVG viewBox 0 0 900 420
const TREE = {
  nodes: [
    { x: 450, y: 48,  r: 13, level: 0, label: 'T(n)' },
    { x: 225, y: 148, r: 8,  level: 1, label: '' },
    { x: 675, y: 148, r: 8,  level: 1, label: '' },
    { x: 112, y: 246, r: 5.5, level: 2, label: '' },
    { x: 338, y: 246, r: 5.5, level: 2, label: '' },
    { x: 562, y: 246, r: 5.5, level: 2, label: '' },
    { x: 788, y: 246, r: 5.5, level: 2, label: '' },
    { x: 56,  y: 336, r: 3.8, level: 3, label: '' },
    { x: 168, y: 336, r: 3.8, level: 3, label: '' },
    { x: 282, y: 336, r: 3.8, level: 3, label: '' },
    { x: 394, y: 336, r: 3.8, level: 3, label: '' },
    { x: 506, y: 336, r: 3.8, level: 3, label: '' },
    { x: 618, y: 336, r: 3.8, level: 3, label: '' },
    { x: 732, y: 336, r: 3.8, level: 3, label: '' },
    { x: 844, y: 336, r: 3.8, level: 3, label: '' },
  ],
  edges: [
    [0, 1], [0, 2],
    [1, 3], [1, 4], [2, 5], [2, 6],
    [3, 7], [3, 8], [4, 9], [4, 10], [5, 11], [5, 12], [6, 13], [6, 14],
  ] as [number, number][],
}

function curvePath(p: { x: number; y: number }, c: { x: number; y: number }) {
  const my = (p.y + c.y) / 2
  return `M${p.x},${p.y} C${p.x},${my} ${c.x},${my} ${c.x},${c.y}`
}

export function SystemBoot({ onComplete }: { onComplete: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const hasRun = useRef(false)

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Keyboard: Escape or Space to skip
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') { e.preventDefault(); complete() }
    }
    window.addEventListener('keydown', onKey)

    const complete = () => {
      window.removeEventListener('keydown', onKey)
      gsap.to(rootRef.current, {
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete,
      })
    }

    if (reduced) {
      // Show everything static immediately, wait briefly, then enter
      if (rootRef.current) rootRef.current.style.opacity = '1'
      const t = window.setTimeout(complete, 800)
      return () => { window.clearTimeout(t); window.removeEventListener('keydown', onKey) }
    }

    // ══════════════════════════════════════════════
    // CINEMATIC GSAP BOOT TIMELINE
    // ══════════════════════════════════════════════

    const ctx = gsap.context(() => {
      // Measure branch paths for draw animation
      const branchEls = gsap.utils.toArray<SVGPathElement>('.boot-edge')
      branchEls.forEach((el) => {
        const len = el.getTotalLength()
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len })
      })

      // Set initial hidden states
      gsap.set(['.boot-status', '.boot-coordinate', '.boot-skip'], { autoAlpha: 0 })
      gsap.set('.boot-status-line', { autoAlpha: 0, x: -10 })
      gsap.set('.boot-node', { scale: 0, autoAlpha: 0, transformBox: 'fill-box', transformOrigin: 'center' })
      gsap.set('.boot-signal', { autoAlpha: 0, scale: 1.2, filter: 'blur(16px)' })
      gsap.set('.boot-tree-svg', { autoAlpha: 0 })
      gsap.set('.boot-equation', { autoAlpha: 0, y: 20, filter: 'blur(8px)' })
      gsap.set('.boot-credentials', { autoAlpha: 0 })
      gsap.set('.boot-enter', { autoAlpha: 0, y: 14 })
      gsap.set('.boot-grid', { opacity: 0 })

      const tl = gsap.timeline()

      // ── PHASE 01: VOID ─────────────────────────────
      // Grid substrate fades in, barely visible
      tl.to('.boot-grid', { opacity: 1, duration: 2.5, ease: 'power1.out' })

      // System status appears top-left
      tl.to('.boot-status', { autoAlpha: 1, duration: 0.5, ease: 'power2.out' }, '-=1.8')
      tl.to('.boot-status-line:nth-child(1)',
        { autoAlpha: 1, x: 0, duration: 0.4, ease: 'power2.out' },
        '-=0.4'
      )
      tl.to('.boot-status-line:nth-child(2)',
        { autoAlpha: 1, x: 0, duration: 0.4, ease: 'power2.out' },
        '+=0.5'
      )
      tl.to('.boot-status-line:nth-child(3)',
        { autoAlpha: 1, x: 0, duration: 0.4, ease: 'power2.out' },
        '+=0.5'
      )

      // Skip and coordinate appear
      tl.to(['.boot-skip', '.boot-coordinate'],
        { autoAlpha: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      )

      // ── PHASE 02: T(n) EMERGES ────────────────────
      // T(n) — the central mathematical object
      tl.to('.boot-signal', {
        autoAlpha: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.8,
        ease: 'power3.out',
      }, '+=0.4')

      // Status line 4 updates
      tl.to('.boot-status-line:nth-child(4)',
        { autoAlpha: 1, x: 0, duration: 0.4, ease: 'power2.out' },
        '-=0.8'
      )

      // ── PHASE 03: RECURSIVE TREE GROWS ────────────
      // T(n) lifts up to make room for tree
      tl.to('.boot-signal', {
        top: '8%',
        fontSize: 'clamp(28px, 5vw, 52px)',
        letterSpacing: '-0.01em',
        textShadow: '0 0 20px rgba(196,163,90,0.2)',
        duration: 1.1,
        ease: 'power3.inOut',
      }, '+=0.6')

      // Tree SVG fades in
      tl.to('.boot-tree-svg', { autoAlpha: 1, duration: 0.6, ease: 'power2.out' }, '-=0.5')

      // Root node
      tl.to('.boot-node-0',
        { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(1.8)' },
        '-=0.2'
      )

      // Level 0→1 edges + nodes
      tl.to('.boot-edge-L0',
        { strokeDashoffset: 0, duration: 0.7, stagger: 0.05, ease: 'power2.inOut' },
        '+=0.15'
      )
      tl.to('.boot-node-L1',
        { autoAlpha: 1, scale: 1, stagger: 0.07, duration: 0.4, ease: 'back.out(1.5)' },
        '-=0.45'
      )

      // Level 1→2 edges + nodes
      tl.to('.boot-edge-L1',
        { strokeDashoffset: 0, duration: 0.65, stagger: 0.04, ease: 'power2.inOut' },
        '+=0.1'
      )
      tl.to('.boot-node-L2',
        { autoAlpha: 1, scale: 1, stagger: 0.04, duration: 0.34, ease: 'back.out(1.4)' },
        '-=0.44'
      )

      // Level 2→3 edges + nodes
      tl.to('.boot-edge-L2',
        { strokeDashoffset: 0, duration: 0.6, stagger: 0.03, ease: 'power2.inOut' },
        '+=0.1'
      )
      tl.to('.boot-node-L3',
        { autoAlpha: 1, scale: 1, stagger: 0.03, duration: 0.28, ease: 'back.out(1.3)' },
        '-=0.4'
      )

      // Status: recursive structure detected
      tl.to('.boot-status-line:nth-child(5)',
        { autoAlpha: 1, x: 0, duration: 0.4, ease: 'power2.out' },
        '-=0.3'
      )

      // ── PHASE 04: RECURRENCE EMERGES ─────────────
      // Tree shrinks to background, recurrence appears
      tl.to('.boot-tree-svg', { scale: 0.72, y: 20, opacity: 0.45, duration: 1, ease: 'power2.inOut' }, '+=0.5')
      tl.to('.boot-signal', { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, '-=0.7')

      tl.fromTo('.boot-equation',
        { autoAlpha: 0, y: 24, filter: 'blur(8px)' },
        { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' },
        '-=0.3'
      )

      tl.to('.boot-status-line:nth-child(6)',
        { autoAlpha: 1, x: 0, duration: 0.4, ease: 'power2.out' },
        '-=0.6'
      )

      // ── PHASE 05: ACADEMIC CREDENTIALS ───────────
      // Tree + equation fade, credentials appear
      tl.to(['.boot-tree-svg', '.boot-equation'],
        { autoAlpha: 0, duration: 0.8, ease: 'power2.in' },
        '+=0.8'
      )

      tl.fromTo('.boot-credentials',
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 1.0, ease: 'power3.out' },
        '-=0.3'
      )

      tl.to('.boot-status-line:nth-child(7)',
        { autoAlpha: 1, x: 0, duration: 0.4, ease: 'power2.out' },
        '-=0.6'
      )

      // ── PHASE 06: ENTER ───────────────────────────
      tl.to('.boot-enter',
        { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '+=0.8'
      )

    }, rootRef)

    return () => {
      ctx.revert()
      window.removeEventListener('keydown', onKey)
    }
  }, [onComplete])

  return (
    <div
      className="boot"
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label="System boot sequence — Mathematical Analysis of Recursive Algorithms"
    >
      {/* Barely-visible mathematical grid */}
      <div className="boot-grid" aria-hidden="true" />

      {/* Skip control */}
      <button
        className="boot-skip"
        onClick={() => gsap.to(rootRef.current, {
          autoAlpha: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete,
        })}
        aria-label="Skip boot sequence and enter the analysis environment"
      >
        SKIP
      </button>

      {/* System status — top left */}
      <div className="boot-status" aria-live="polite" aria-label="System initialization status">
        <div className="boot-status-line done">
          <div className="status-dot" />
          SYSTEM INITIALIZATION
        </div>
        <div className="boot-status-line done">
          <div className="status-dot" />
          MATHEMATICAL MODEL LOADED
        </div>
        <div className="boot-status-line done">
          <div className="status-dot" />
          RECURRENCE ENGINE READY
        </div>
        <div className="boot-status-line active">
          <div className="status-dot pulse" />
          RECURSIVE STRUCTURE DETECTED
        </div>
        <div className="boot-status-line active">
          <div className="status-dot pulse" />
          ANALYSIS FRAMEWORK ACTIVE
        </div>
        <div className="boot-status-line done">
          <div className="status-dot" />
          RESEARCH IDENTITY CONFIRMED
        </div>
        <div className="boot-status-line done">
          <div className="status-dot" />
          ENVIRONMENT READY
        </div>
      </div>

      {/* Boot coordinate — technical label */}
      <div className="boot-coordinate" aria-hidden="true">
        DAA · RECURSIVE ANALYSIS · {research.academicYear}
      </div>

      {/* Central stage */}
      <div className="boot-stage">

        {/* T(n) — the dominant mathematical object */}
        <div
          className="boot-signal"
          aria-label="T of n — the recurrence function representing running time"
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          T(n)
        </div>

        {/* Recursion tree SVG */}
        <svg
          className="boot-tree-svg"
          viewBox="0 0 900 390"
          aria-label="Binary recursion tree growing from T(n) downward through three levels"
          style={{ position: 'absolute', top: '14%', left: '50%', transform: 'translateX(-50%)' }}
        >
          {/* Edges by level */}
          <g>
            {TREE.edges.map(([pi, ci], i) => {
              const parent = TREE.nodes[pi]
              const child = TREE.nodes[ci]
              const edgeLevel = child.level - 1
              return (
                <path
                  key={i}
                  className={`boot-edge boot-edge-L${edgeLevel}`}
                  d={curvePath(parent, child)}
                />
              )
            })}
          </g>
          {/* Nodes by level */}
          <g>
            {TREE.nodes.map((node, i) => (
              <g
                key={i}
                className={`boot-node ${
                  i === 0 ? 'boot-node-0' : `boot-node-L${node.level}`
                }`}
                transform={`translate(${node.x},${node.y})`}
              >
                <circle cx={0} cy={0} r={node.r} />
                {node.label && (
                  <text x={0} y={0} dy="1">
                    {node.label}
                  </text>
                )}
              </g>
            ))}
          </g>
        </svg>

        {/* Recurrence equation */}
        <div
          className="boot-equation"
          aria-label="T of n equals a times T of n over b plus f of n"
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
        >
          T(n) = <em>a</em>T(n/b) + <em>f(n)</em>
        </div>

        {/* Academic credentials */}
        <div
          className="boot-credentials"
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-52%)' }}
        >
          <p className="boot-title-main">
            Mathematical Analysis<br />of Recursive Algorithms
          </p>
          <p className="boot-title-sub">
            A study of recurrence relations, recursion trees,<br />
            substitution, and recursive complexity
          </p>
          <div className="boot-divider" aria-hidden="true" />
          <p className="boot-researcher">{research.researcher}</p>
          <p className="boot-roll">ROLL NO. {research.rollNumber} · {research.course}</p>
          <div className="boot-affiliation">
            <span><strong>{research.department}</strong></span>
            <span><strong>{research.institution}</strong></span>
            <span>{research.affiliation}</span>
            <span>Guided by {research.guide}</span>
            <span>Department Head: {research.departmentHead}</span>
            <span>{research.academicYear}</span>
          </div>
          {/* Enter prompt — inside credentials block for layout */}
          <div className="boot-enter" aria-live="polite">
            <span className="boot-enter-label">ANALYSIS ENVIRONMENT READY</span>
            <button
              className="boot-enter-btn"
              onClick={() => gsap.to(document.querySelector('.boot'), {
                autoAlpha: 0,
                duration: 0.9,
                ease: 'power2.inOut',
              })}
            >
              ENTER ANALYSIS →
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
