import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ArrowRight, SkipForward } from 'lucide-react'
import { research } from '../../content/research'

// Mathematically-placed nodes for a perfect binary tree, 4 levels
// Root → 2 children → 4 children → 8 children
const treeData = {
  nodes: [
    // Level 0 — root
    { x: 500, y: 56, r: 14, level: 0 },
    // Level 1
    { x: 275, y: 158, r: 9, level: 1 },
    { x: 725, y: 158, r: 9, level: 1 },
    // Level 2
    { x: 162, y: 256, r: 6.5, level: 2 },
    { x: 388, y: 256, r: 6.5, level: 2 },
    { x: 612, y: 256, r: 6.5, level: 2 },
    { x: 838, y: 256, r: 6.5, level: 2 },
    // Level 3
    { x: 105, y: 346, r: 4.5, level: 3 },
    { x: 219, y: 346, r: 4.5, level: 3 },
    { x: 331, y: 346, r: 4.5, level: 3 },
    { x: 445, y: 346, r: 4.5, level: 3 },
    { x: 555, y: 346, r: 4.5, level: 3 },
    { x: 669, y: 346, r: 4.5, level: 3 },
    { x: 781, y: 346, r: 4.5, level: 3 },
    { x: 895, y: 346, r: 4.5, level: 3 },
  ],
  // Each edge: [parentIndex, childIndex]
  edges: [
    [0, 1], [0, 2],
    [1, 3], [1, 4], [2, 5], [2, 6],
    [3, 7], [3, 8], [4, 9], [4, 10], [5, 11], [5, 12], [6, 13], [6, 14],
  ],
}

function pathBetween(
  parent: { x: number; y: number },
  child: { x: number; y: number }
): string {
  const midY = (parent.y + child.y) / 2
  return `M${parent.x} ${parent.y} C${parent.x} ${midY} ${child.x} ${midY} ${child.x} ${child.y}`
}

export function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const skipRef = useRef<HTMLButtonElement>(null)
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  // Auto-focus skip button for accessibility
  useEffect(() => { skipRef.current?.focus() }, [])

  useEffect(() => {
    // Keyboard trap + escape
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onComplete()
      if (e.key === 'Tab' && root.current) {
        const focusable = Array.from(
          root.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex="0"]')
        )
        if (!focusable.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }

    window.addEventListener('keydown', onKey)

    if (reduced) return () => window.removeEventListener('keydown', onKey)

    // ═══════════════════════════════════════
    // CINEMATIC GSAP CHOREOGRAPHY
    // ═══════════════════════════════════════
    const ctx = gsap.context(() => {
      // Measure branch paths for dash animation
      const branchEls = gsap.utils.toArray<SVGPathElement>('.intro-branch-link')
      branchEls.forEach((path) => {
        const len = path.getTotalLength()
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
      })

      // Initially hide tree nodes
      gsap.set('.intro-tree-node', { scale: 0, autoAlpha: 0, transformBox: 'fill-box', transformOrigin: 'center' })

      const tl = gsap.timeline({
        onComplete: () => window.setTimeout(onComplete, 500),
      })

      // ── SCENE 01: VOID ──────────────────────
      tl.to({}, { duration: 0.6 })

      // T(n) emerges — vast, precise, from void
      tl.fromTo('.intro-signal',
        { autoAlpha: 0, scale: 1.18, filter: 'blur(12px)' },
        { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 1.4, ease: 'power3.out' }
      )

      // ── SCENE 02: RECURSION — branches draw ──
      // Root node first
      tl.to('.intro-tree-node-0',
        { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(1.7)' },
        '-=0.2'
      )

      // Level 1 branches + nodes
      tl.to('.intro-branch-L0',
        { strokeDashoffset: 0, duration: 0.7, stagger: 0.05, ease: 'power2.inOut' },
        '-=0.1'
      )
      tl.to('.intro-tree-node-L1',
        { autoAlpha: 1, scale: 1, stagger: 0.06, duration: 0.35, ease: 'back.out(1.5)' },
        '-=0.4'
      )

      // Level 2 branches + nodes
      tl.to('.intro-branch-L1',
        { strokeDashoffset: 0, duration: 0.65, stagger: 0.035, ease: 'power2.inOut' },
        '-=0.2'
      )
      tl.to('.intro-tree-node-L2',
        { autoAlpha: 1, scale: 1, stagger: 0.04, duration: 0.3, ease: 'back.out(1.4)' },
        '-=0.4'
      )

      // Level 3 branches + nodes
      tl.to('.intro-branch-L2',
        { strokeDashoffset: 0, duration: 0.6, stagger: 0.025, ease: 'power2.inOut' },
        '-=0.2'
      )
      tl.to('.intro-tree-node-L3',
        { autoAlpha: 1, scale: 1, stagger: 0.03, duration: 0.26, ease: 'back.out(1.3)' },
        '-=0.35'
      )

      // ── SCENE 03: T(n) rises to top as tree is complete ──
      tl.to('.intro-signal',
        { top: '11%', fontSize: 'clamp(26px, 4.5vw, 48px)', letterSpacing: '-0.02em', duration: 1.1, ease: 'power3.inOut' },
        '+=0.3'
      )

      // ── SCENE 04: RECURRENCE — equation reveals ──
      tl.fromTo('.intro-equation-line',
        { autoAlpha: 0, y: 28, letterSpacing: '0.2em', filter: 'blur(6px)' },
        { autoAlpha: 1, y: 0, letterSpacing: '0.01em', filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' },
        '-=0.4'
      )
      tl.fromTo('.intro-transform-note',
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.5'
      )

      // ── SCENE 05: Math environment scales to make room for title ──
      tl.to('.intro-math-space',
        { scale: 0.8, y: -20, duration: 0.9, ease: 'power2.inOut' },
        '+=0.5'
      )

      // ── SCENE 06: TITLE ──
      tl.fromTo('.intro-title-word',
        { autoAlpha: 0, y: 30, filter: 'blur(6px)' },
        { autoAlpha: 1, y: 0, filter: 'blur(0px)', stagger: 0.14, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )

      // ── SCENE 07: IDENTITY ──
      tl.fromTo('.intro-identity-line',
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, stagger: 0.13, duration: 0.55, ease: 'power2.out' },
        '-=0.25'
      )

      // ── SCENE 08: CREDENTIALS & FACULTY ──
      tl.fromTo('.intro-credentials-block',
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.15'
      )

      // ── SCENE 09: ENTRY — fade entire intro ──
      tl.to(root.current,
        { autoAlpha: 0, duration: 1.1, delay: 1.2, ease: 'power2.inOut' }
      )
    }, root)

    return () => {
      ctx.revert()
      window.removeEventListener('keydown', onKey)
    }
  }, [onComplete, reduced])

  return (
    <div
      className={`cinematic-intro ${reduced ? 'reduced' : ''}`}
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label="Cinematic mathematical research introduction"
    >
      <div className="intro-atmosphere" aria-hidden="true" />

      <button className="intro-skip" ref={skipRef} onClick={onComplete} aria-label="Skip introduction">
        Skip intro <SkipForward size={13} />
      </button>

      <div className="intro-content">
        {/* MATHEMATICAL TREE — the spatial centrepiece */}
        <div className="intro-math-space">
          <svg
            className="intro-branch-map"
            viewBox="0 0 1000 400"
            role="img"
            aria-label="A binary recursion tree growing downward, showing how T(n) decomposes"
          >
            {/* Draw edges by level so we can animate level-by-level */}
            <g>
              {treeData.edges.map(([pi, ci], i) => {
                const parent = treeData.nodes[pi]
                const child = treeData.nodes[ci]
                const edgeLevel = child.level - 1
                return (
                  <path
                    key={i}
                    className={`intro-branch-link intro-branch-L${edgeLevel}`}
                    d={pathBetween(parent, child)}
                  />
                )
              })}
            </g>

            {/* Draw nodes by level */}
            <g>
              {treeData.nodes.map((node, i) => (
                <circle
                  key={i}
                  className={`intro-tree-node intro-tree-node-${i === 0 ? '0' : `L${node.level}`}`}
                  cx={node.x}
                  cy={node.y}
                  r={node.r}
                />
              ))}
            </g>
          </svg>

          {/* T(n) — the central mathematical object */}
          <div className="intro-signal" aria-label="T of n — the recurrence function">T(n)</div>

          {/* Recurrence equation */}
          <p className="intro-equation-line" aria-label="T of n equals a times T of n over b plus f of n">
            T(n) = aT(n/b) + f(n)
          </p>

          <p className="intro-transform-note" aria-hidden="true">
            RECURSIVE STRUCTURE → GENERAL RECURRENCE MODEL
          </p>
        </div>

        {/* TITLE BLOCK */}
        <div className="intro-title-block">
          <p className="eyebrow intro-kicker">
            <span className="signal-live" aria-hidden="true" />
            RESEARCH EXPERIENCE · {research.academicYear}
          </p>
          <h1>
            <span className="intro-title-word">MATHEMATICAL</span>
            <span className="intro-title-word">ANALYSIS OF</span>
            <span className="intro-title-word"><em>RECURSIVE</em> ALGORITHMS</span>
          </h1>
          <div className="intro-identity">
            <p className="intro-identity-line">
              <strong>{research.researcher}</strong> · {research.course}
            </p>
            <p className="intro-identity-line">
              {research.institution} <span>· {research.affiliation}</span>
            </p>
          </div>
          
          {/* CREDENTIALS & FACULTY BLOCK */}
          <div className="intro-credentials-block">
            <div className="credentials-row">
              <div className="credential-item">
                <span className="credential-label">GUIDE</span>
                <span className="credential-value">{research.guide}</span>
              </div>
              <div className="credential-divider" aria-hidden="true">·</div>
              <div className="credential-item">
                <span className="credential-label">DEPARTMENT HEAD</span>
                <span className="credential-value">{research.departmentHead}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom label */}
      <div className="intro-bottom" aria-hidden="true">
        <span>MATHEMATICAL ANALYSIS OF RECURSIVE ALGORITHMS</span>
        <span>01 — RESEARCH GATEWAY <b>↓</b></span>
      </div>

      {/* Reduced motion fallback */}
      {reduced && (
        <div className="reduced-entry">
          <button onClick={onComplete}>
            Enter research experience <ArrowRight size={15} />
          </button>
        </div>
      )}
    </div>
  )
}
