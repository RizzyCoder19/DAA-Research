import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { PAPER_DATA } from '../../content/paperData'
import { ChevronDown, ArrowDown, Award, BookOpen, GraduationCap } from 'lucide-react'

interface Props {
  onEnter: () => void
}

export function CinematicIntroScroll({ onEnter }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<number>(1)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Stay on final credentials stage
        },
      })

      // Phase 1: Void -> T(n) emerges
      tl.fromTo('.intro-tn',
        { opacity: 0, scale: 0.6, filter: 'blur(16px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.8, ease: 'power3.out' }
      )
      tl.to({}, { duration: 0.8, onStart: () => setPhase(2) })

      // Phase 2: Recurrence equation reveals
      tl.to('.intro-tn', { y: -40, scale: 0.85, duration: 1.0, ease: 'power2.inOut' })
      tl.fromTo('.intro-eq',
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' },
        '-=0.4'
      )
      tl.to({}, { duration: 0.8, onStart: () => setPhase(3) })

      // Phase 3: Dissolve into center-stage credentials & title
      tl.to(['.intro-tn', '.intro-eq'], {
        opacity: 0,
        y: -30,
        duration: 0.8,
        ease: 'power2.in',
      })

      tl.fromTo('.intro-credentials-card',
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: 'power3.out' },
        '-=0.2'
      )

      tl.fromTo('.intro-scroll-prompt',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '+=0.2'
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#06080E',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(32px, 6vw, 64px) 24px',
        overflow: 'hidden',
        zIndex: 10,
      }}
    >
      <div className="math-substrate" />

      {/* Phase 1 & 2: Emergence stage */}
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 5,
          pointerEvents: 'none',
        }}
      >
        <div
          className="intro-tn font-mono text-gold glow-gold"
          style={{
            fontSize: 'clamp(64px, 10vw, 120px)',
            fontWeight: 600,
            letterSpacing: '0.02em',
          }}
        >
          T(n)
        </div>

        <div
          className="intro-eq font-mono text-ivory"
          style={{
            marginTop: 20,
            fontSize: 'clamp(24px, 4vw, 48px)',
            padding: '12px 28px',
            background: 'rgba(12, 16, 28, 0.7)',
            border: '1px solid rgba(196, 163, 90, 0.3)',
            borderRadius: 14,
            opacity: 0,
          }}
        >
          <span className="text-gold">T(n)</span> = <span className="text-teal">a</span>T(n/<span className="text-teal">b</span>) + <span className="text-coral">f(n)</span>
        </div>
      </div>

      {/* Phase 3: Centered, Prestigious Academic Credentials Reveal */}
      <div
        className="intro-credentials-card"
        style={{
          maxWidth: '920px',
          width: '100%',
          margin: 'auto 0',
          position: 'relative',
          zIndex: 15,
          opacity: 0,
          textAlign: 'center',
          background: 'rgba(12, 16, 28, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(196, 163, 90, 0.3)',
          borderRadius: 16,
          padding: 'clamp(32px, 5vw, 56px) clamp(24px, 4vw, 48px)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
        }}
      >
        {/* Top University Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '8px 20px',
            background: 'rgba(196, 163, 90, 0.12)',
            border: '1px solid rgba(196, 163, 90, 0.4)',
            borderRadius: 30,
            marginBottom: 28,
          }}
        >
          <GraduationCap size={18} className="text-gold" />
          <span className="font-mono text-gold" style={{ fontSize: '14px', letterSpacing: '0.15em' }}>
            UNIVERSITY OF MUMBAI · DAA RESEARCH PAPER
          </span>
        </div>

        {/* Paper Title */}
        <h1
          className="font-serif text-ivory"
          style={{
            fontSize: 'clamp(36px, 5.5vw, 68px)',
            fontWeight: 500,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: 16,
          }}
        >
          Mathematical Analysis <br />
          <span className="text-gold font-serif" style={{ fontStyle: 'italic' }}>
            of Recursive Algorithms
          </span>
        </h1>

        <p
          className="text-muted"
          style={{
            fontSize: 'clamp(17px, 2vw, 21px)',
            maxWidth: '740px',
            margin: '0 auto 36px',
            lineHeight: 1.5,
          }}
        >
          A Study of recurrence relations, recursion trees, substitution, and recursive complexity.
        </p>

        {/* Highlighted Student & Roll No */}
        <div
          style={{
            padding: '24px 28px',
            background: 'rgba(196, 163, 90, 0.08)',
            border: '1.5px solid rgba(196, 163, 90, 0.5)',
            borderRadius: 12,
            marginBottom: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <div className="font-mono text-gold" style={{ fontSize: '13px', letterSpacing: '0.2em' }}>
            RESEARCH PAPER SUBMISSION BY
          </div>
          <div
            className="font-serif text-ivory glow-gold"
            style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 600,
              letterSpacing: '0.04em',
            }}
          >
            {PAPER_DATA.meta.studentName.toUpperCase()}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginTop: 4 }}>
            <span
              className="font-mono"
              style={{
                padding: '4px 14px',
                background: 'rgba(53, 214, 197, 0.15)',
                border: '1px solid #35D6C5',
                borderRadius: 14,
                color: '#35D6C5',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              ROLL NO. {PAPER_DATA.meta.rollNo}
            </span>
            <span
              className="font-mono text-ivory"
              style={{
                padding: '4px 14px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: 14,
                fontSize: '14px',
              }}
            >
              {PAPER_DATA.meta.course}
            </span>
          </div>
        </div>

        {/* Guidance and Institution Meta */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 16,
            textAlign: 'left',
          }}
        >
          <div
            style={{
              padding: '16px 20px',
              background: 'rgba(18, 24, 40, 0.6)',
              borderRadius: 8,
              border: '1px solid rgba(142, 154, 176, 0.15)',
            }}
          >
            <div className="font-mono text-teal" style={{ fontSize: '12px', letterSpacing: '0.12em' }}>
              UNDER THE GUIDANCE OF
            </div>
            <div style={{ fontSize: '18px', fontWeight: 600, color: '#F5F0E8', marginTop: 4 }}>
              {PAPER_DATA.meta.guide}
            </div>
            <div style={{ fontSize: '13px', color: '#8E9AB0', marginTop: 2 }}>
              HOD: {PAPER_DATA.meta.hod} · {PAPER_DATA.meta.department}
            </div>
          </div>

          <div
            style={{
              padding: '16px 20px',
              background: 'rgba(18, 24, 40, 0.6)',
              borderRadius: 8,
              border: '1px solid rgba(142, 154, 176, 0.15)',
            }}
          >
            <div className="font-mono text-gold" style={{ fontSize: '12px', letterSpacing: '0.12em' }}>
              INSTITUTION & ACADEMIC YEAR
            </div>
            <div style={{ fontSize: '17px', fontWeight: 600, color: '#F5F0E8', marginTop: 4 }}>
              {PAPER_DATA.meta.institution}
            </div>
            <div style={{ fontSize: '13px', color: '#8E9AB0', marginTop: 2 }}>
              {PAPER_DATA.meta.affiliation} · {PAPER_DATA.meta.academicYear}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div style={{ marginTop: 32 }}>
          <button
            onClick={onEnter}
            className="intro-scroll-prompt font-mono"
            style={{
              padding: '14px 36px',
              background: 'linear-gradient(135deg, rgba(196, 163, 90, 0.25), rgba(53, 214, 197, 0.25))',
              border: '1.5px solid #C4A35A',
              borderRadius: 30,
              color: '#F5F0E8',
              fontSize: '16px',
              fontWeight: 500,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              letterSpacing: '0.06em',
              boxShadow: '0 8px 24px rgba(196, 163, 90, 0.2)',
            }}
          >
            <span>START RESEARCH EXPLORATION</span>
            <ArrowDown size={18} className="text-gold" />
          </button>
        </div>
      </div>
    </div>
  )
}
