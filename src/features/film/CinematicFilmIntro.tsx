import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { PAPER_DATA } from '../../content/paperData'
import { ArrowDown, SkipForward } from 'lucide-react'

interface Props {
  onComplete: () => void
}

export function CinematicFilmIntro({ onComplete }: Props) {
  const [phase, setPhase] = useState<number>(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const treeSvgRef = useRef<SVGSVGElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        timelineRef.current?.kill()
        onComplete()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onComplete])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Smooth fade out into main film
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete,
          })
        },
      })
      timelineRef.current = tl

      // Phase 1: Void -> T(n) emerges
      tl.to('.intro-p1-tn', {
        opacity: 1,
        scale: 1,
        duration: 1.8,
        ease: 'power3.out',
      })
      tl.to({}, { duration: 1.0, onStart: () => setPhase(2) })

      // Phase 2: Recursive division into child nodes
      tl.to('.intro-p1-tn', {
        y: -100,
        scale: 0.85,
        duration: 1.2,
        ease: 'power2.inOut',
      })
      tl.to('.intro-tree-branch', {
        strokeDashoffset: 0,
        opacity: 0.8,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power2.out',
      }, '-=0.6')
      tl.to('.intro-tree-node', {
        opacity: 1,
        scale: 1,
        stagger: 0.15,
        duration: 1.0,
        ease: 'back.out(1.4)',
      }, '-=0.8')

      tl.to({}, { duration: 1.0, onStart: () => setPhase(3) })

      // Phase 3: Recurrence equation emergence
      tl.to('.intro-p3-equation', {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: 'power3.out',
      })
      tl.to({}, { duration: 1.2, onStart: () => setPhase(4) })

      // Phase 4: Contraction into Title
      tl.to(['.intro-p1-tn', '.intro-tree-svg', '.intro-p3-equation'], {
        opacity: 0,
        y: -40,
        duration: 0.8,
        ease: 'power2.in',
      })
      tl.to('.intro-p4-title', {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
      })
      tl.to({}, { duration: 1.2, onStart: () => setPhase(5) })

      // Phase 5: Cinematic opening credits reveal
      tl.to('.intro-p4-title', {
        y: -30,
        scale: 0.9,
        duration: 1.0,
        ease: 'power2.inOut',
      })
      tl.to('.intro-credit-item', {
        opacity: 1,
        y: 0,
        stagger: 0.35,
        duration: 1.2,
        ease: 'power3.out',
      }, '-=0.4')
      tl.to('.intro-enter-btn', {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, '+=0.4')

    }, containerRef)

    return () => ctx.revert()
  }, [onComplete])

  const handleSkip = () => {
    timelineRef.current?.kill()
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.4,
      onComplete,
    })
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: '#120D17',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <div className="math-grid-bg" />

      {/* Top controls: Phase counter & Skip */}
      <div
        style={{
          position: 'absolute',
          top: 32,
          left: 40,
          right: 40,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 20,
        }}
      >
        <span
          className="font-mono text-lavender"
          style={{ fontSize: '14px', letterSpacing: '0.15em' }}
        >
          SCENE 0{phase} / 05 · RESEARCH PROLOGUE
        </span>

        <button
          onClick={handleSkip}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 16px',
            background: 'rgba(33, 22, 34, 0.7)',
            border: '1px solid rgba(155, 142, 170, 0.25)',
            borderRadius: 20,
            fontSize: '14px',
            color: '#F5F0E8',
          }}
        >
          <span>Skip Intro</span>
          <SkipForward size={14} className="text-teal" />
          <span style={{ opacity: 0.5, fontSize: '11px' }}>[Esc]</span>
        </button>
      </div>

      {/* Center visual stage */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1000px',
          height: '600px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          padding: '0 24px',
        }}
      >
        {/* Phase 1 & 2: T(n) and branching tree */}
        <div
          className="intro-p1-tn font-mono teal-glow text-teal"
          style={{
            opacity: 0,
            transform: 'scale(0.8)',
            fontSize: 'clamp(54px, 8vw, 96px)',
            fontWeight: 600,
            letterSpacing: '0.04em',
            zIndex: 12,
          }}
        >
          T(n)
        </div>

        {/* Tree SVG */}
        <svg
          ref={treeSvgRef}
          className="intro-tree-svg"
          viewBox="0 0 800 360"
          style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -20%)',
            width: '100%',
            maxWidth: '750px',
            height: '320px',
            pointerEvents: 'none',
          }}
        >
          {/* Branch Lines */}
          <line
            className="intro-tree-branch"
            x1="400" y1="40" x2="220" y2="150"
            stroke="#35D6C5" strokeWidth="2" strokeDasharray="250" strokeDashoffset="250" opacity="0"
          />
          <line
            className="intro-tree-branch"
            x1="400" y1="40" x2="580" y2="150"
            stroke="#35D6C5" strokeWidth="2" strokeDasharray="250" strokeDashoffset="250" opacity="0"
          />

          <line
            className="intro-tree-branch"
            x1="220" y1="150" x2="130" y2="260"
            stroke="#E87963" strokeWidth="1.5" strokeDasharray="200" strokeDashoffset="200" opacity="0"
          />
          <line
            className="intro-tree-branch"
            x1="220" y1="150" x2="310" y2="260"
            stroke="#E87963" strokeWidth="1.5" strokeDasharray="200" strokeDashoffset="200" opacity="0"
          />
          <line
            className="intro-tree-branch"
            x1="580" y1="150" x2="490" y2="260"
            stroke="#E87963" strokeWidth="1.5" strokeDasharray="200" strokeDashoffset="200" opacity="0"
          />
          <line
            className="intro-tree-branch"
            x1="580" y1="150" x2="670" y2="260"
            stroke="#E87963" strokeWidth="1.5" strokeDasharray="200" strokeDashoffset="200" opacity="0"
          />

          {/* Nodes Level 1 */}
          <g className="intro-tree-node" opacity="0" transform="scale(0.5)" style={{ transformOrigin: '220px 150px' }}>
            <circle cx="220" cy="150" r="28" fill="#211622" stroke="#35D6C5" strokeWidth="2" />
            <text x="220" y="156" fill="#F5F0E8" fontSize="16" textAnchor="middle" fontFamily="var(--font-mono)">
              T(n/b)
            </text>
          </g>
          <g className="intro-tree-node" opacity="0" transform="scale(0.5)" style={{ transformOrigin: '580px 150px' }}>
            <circle cx="580" cy="150" r="28" fill="#211622" stroke="#35D6C5" strokeWidth="2" />
            <text x="580" y="156" fill="#F5F0E8" fontSize="16" textAnchor="middle" fontFamily="var(--font-mono)">
              T(n/b)
            </text>
          </g>

          {/* Nodes Level 2 */}
          <g className="intro-tree-node" opacity="0" transform="scale(0.5)" style={{ transformOrigin: '130px 260px' }}>
            <circle cx="130" cy="260" r="24" fill="#211622" stroke="#E87963" strokeWidth="1.5" />
            <text x="130" y="265" fill="#F5F0E8" fontSize="13" textAnchor="middle" fontFamily="var(--font-mono)">
              T(n/b²)
            </text>
          </g>
          <g className="intro-tree-node" opacity="0" transform="scale(0.5)" style={{ transformOrigin: '310px 260px' }}>
            <circle cx="310" cy="260" r="24" fill="#211622" stroke="#E87963" strokeWidth="1.5" />
            <text x="310" y="265" fill="#F5F0E8" fontSize="13" textAnchor="middle" fontFamily="var(--font-mono)">
              T(n/b²)
            </text>
          </g>
          <g className="intro-tree-node" opacity="0" transform="scale(0.5)" style={{ transformOrigin: '490px 260px' }}>
            <circle cx="490" cy="260" r="24" fill="#211622" stroke="#E87963" strokeWidth="1.5" />
            <text x="490" y="265" fill="#F5F0E8" fontSize="13" textAnchor="middle" fontFamily="var(--font-mono)">
              T(n/b²)
            </text>
          </g>
          <g className="intro-tree-node" opacity="0" transform="scale(0.5)" style={{ transformOrigin: '670px 260px' }}>
            <circle cx="670" cy="260" r="24" fill="#211622" stroke="#E87963" strokeWidth="1.5" />
            <text x="670" y="265" fill="#F5F0E8" fontSize="13" textAnchor="middle" fontFamily="var(--font-mono)">
              T(n/b²)
            </text>
          </g>
        </svg>

        {/* Phase 3: Recurrence equation */}
        <div
          className="intro-p3-equation font-mono"
          style={{
            position: 'absolute',
            bottom: '40px',
            opacity: 0,
            transform: 'translateY(30px)',
            fontSize: 'clamp(28px, 4vw, 48px)',
            color: '#F5F0E8',
            textAlign: 'center',
            letterSpacing: '0.04em',
            padding: '12px 28px',
            background: 'rgba(33, 22, 34, 0.7)',
            border: '1px solid rgba(53, 214, 197, 0.3)',
            borderRadius: 12,
          }}
        >
          <span className="text-teal">T(n)</span> = <span className="text-coral">a</span>T(n/<span className="text-coral">b</span>) + <span className="text-lavender">f(n)</span>
        </div>

        {/* Phase 4: Title reveal */}
        <div
          className="intro-p4-title"
          style={{
            position: 'absolute',
            textAlign: 'center',
            opacity: 0,
            transform: 'translateY(40px)',
            width: '100%',
          }}
        >
          <div
            className="font-mono text-teal"
            style={{
              fontSize: '14px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            University of Mumbai · Academic Research Study
          </div>
          <h1
            className="font-serif text-ivory"
            style={{
              fontSize: 'var(--text-hero)',
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: 20,
            }}
          >
            Mathematical Analysis <br />
            <span className="text-teal font-serif" style={{ fontStyle: 'italic' }}>
              of Recursive Algorithms
            </span>
          </h1>
          <p
            className="text-lavender"
            style={{
              fontSize: 'clamp(18px, 2vw, 24px)',
              maxWidth: '720px',
              margin: '0 auto',
            }}
          >
            A Study of recurrence relations, recursion trees, substitution, and recursive complexity.
          </p>
        </div>

        {/* Phase 5: Cinematic opening credits */}
        <div
          style={{
            position: 'absolute',
            bottom: '-20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            width: '100%',
          }}
        >
          <div
            className="intro-credit-item"
            style={{
              opacity: 0,
              transform: 'translateY(20px)',
              textAlign: 'center',
            }}
          >
            <div
              className="font-mono text-teal"
              style={{ fontSize: 'clamp(18px, 2.2vw, 26px)', fontWeight: 600, letterSpacing: '0.08em' }}
            >
              {PAPER_DATA.meta.studentName.toUpperCase()} · ROLL NO. {PAPER_DATA.meta.rollNo}
            </div>
            <div className="text-lavender" style={{ fontSize: '17px', marginTop: 4 }}>
              {PAPER_DATA.meta.course} · {PAPER_DATA.meta.department}
            </div>
          </div>

          <div
            className="intro-credit-item"
            style={{
              opacity: 0,
              transform: 'translateY(20px)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '18px', color: '#F5F0E8', fontWeight: 500 }}>
              {PAPER_DATA.meta.institution}
            </div>
            <div className="text-lavender" style={{ fontSize: '15px' }}>
              {PAPER_DATA.meta.affiliation} · {PAPER_DATA.meta.location}
            </div>
          </div>

          <div
            className="intro-credit-item"
            style={{
              opacity: 0,
              transform: 'translateY(20px)',
              textAlign: 'center',
            }}
          >
            <span className="font-mono text-coral" style={{ fontSize: '14px', letterSpacing: '0.12em' }}>
              UNDER THE GUIDANCE OF
            </span>{' '}
            <span style={{ fontSize: '16px', fontWeight: 600, color: '#F5F0E8' }}>
              {PAPER_DATA.meta.guide}
            </span>{' '}
            <span className="text-lavender" style={{ fontSize: '14px' }}>
              · {PAPER_DATA.meta.academicYear}
            </span>
          </div>

          <button
            onClick={onComplete}
            className="intro-enter-btn font-mono"
            style={{
              opacity: 0,
              transform: 'translateY(20px)',
              marginTop: 16,
              padding: '14px 32px',
              backgroundColor: 'rgba(53, 214, 197, 0.15)',
              border: '1px solid #35D6C5',
              borderRadius: 30,
              color: '#35D6C5',
              fontSize: '16px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              letterSpacing: '0.05em',
            }}
          >
            <span>BEGIN RESEARCH PRESENTATION</span>
            <ArrowDown size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
