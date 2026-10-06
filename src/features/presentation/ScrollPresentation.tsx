import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PAPER_DATA } from '../../content/paperData'
import { RecursionTreeVisualizer } from '../visualizers/RecursionTreeVisualizer'
import { AsymptoticCurvesVisualizer } from '../visualizers/AsymptoticCurvesVisualizer'
import { CallStackVisualizer } from '../visualizers/CallStackVisualizer'
import {
  Shield,
  Play,
  Pause,
  ArrowUp,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  BookOpen,
  Code,
  Layers,
  Activity,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  onOpenViva: () => void
  onReplayIntro: () => void
}

export function ScrollPresentation({ onOpenViva, onReplayIntro }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedTerm, setSelectedTerm] = useState<string>('T(n)')
  const [activeMethodStep, setActiveMethodStep] = useState<number>(1)
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false)
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(1)

  // Auto-play smooth scroll loop
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>
    if (isAutoPlay) {
      timer = setInterval(() => {
        const sections = document.querySelectorAll('.pres-section')
        if (!sections.length) return
        const currentScroll = window.scrollY
        let nextIndex = 0
        sections.forEach((sec, idx) => {
          const top = (sec as HTMLElement).offsetTop - 120
          if (currentScroll >= top - 50) {
            nextIndex = (idx + 1) % sections.length
          }
        })
        const target = sections[nextIndex] as HTMLElement
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 70,
            behavior: 'smooth',
          })
        }
      }, 11000) // advance every 11 seconds
    }
    return () => clearInterval(timer)
  }, [isAutoPlay])

  // GSAP ScrollTrigger auto-rendering animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('.pres-section')

      sections.forEach((section, index) => {
        // Trigger section index update for HUD
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveSectionIndex(index + 1),
          onEnterBack: () => setActiveSectionIndex(index + 1),
        })

        // Staggered word & heading reveals
        const titles = section.querySelectorAll('h2, .stage-badge, p.sec-lead')
        if (titles.length) {
          gsap.fromTo(
            titles,
            { opacity: 0, y: 35, filter: 'blur(6px)' },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 1.0,
              stagger: 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        }

        // Staggered glass cards & panels
        const panels = section.querySelectorAll('.glass-panel, .step-card, .app-card')
        if (panels.length) {
          gsap.fromTo(
            panels,
            { opacity: 0, y: 40, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              stagger: 0.12,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 70%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        }

        // Animated SVG lines and curves
        const paths = section.querySelectorAll('path, polyline, line')
        if (paths.length) {
          paths.forEach((p) => {
            const svgPath = p as SVGPathElement
            if (typeof svgPath.getTotalLength === 'function') {
              const len = svgPath.getTotalLength()
              gsap.fromTo(
                svgPath,
                { strokeDasharray: len, strokeDashoffset: len },
                {
                  strokeDashoffset: 0,
                  duration: 1.4,
                  ease: 'power2.out',
                  scrollTrigger: {
                    trigger: section,
                    start: 'top 65%',
                    toggleActions: 'play none none reverse',
                  },
                }
              )
            }
          })
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} style={{ backgroundColor: '#06080E', minHeight: '100vh', position: 'relative' }}>
      {/* PERSISTENT TOP HUD BAR */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '64px',
          backgroundColor: 'rgba(6, 8, 14, 0.88)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(196, 163, 90, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 clamp(16px, 4vw, 48px)',
          zIndex: 100,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span className="font-mono text-gold" style={{ fontSize: '14px', letterSpacing: '0.15em', fontWeight: 600 }}>
            SECTION {String(activeSectionIndex).padStart(2, '0')} / 15
          </span>
          <span style={{ color: 'rgba(142, 154, 176, 0.3)' }}>|</span>
          <span className="text-ivory" style={{ fontSize: '15px', fontWeight: 500 }}>
            {PAPER_DATA.meta.studentName} · Roll {PAPER_DATA.meta.rollNo}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Auto-Play Toggle */}
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '7px 16px',
              borderRadius: 20,
              background: isAutoPlay ? 'rgba(53, 214, 197, 0.2)' : 'rgba(18, 24, 40, 0.7)',
              border: isAutoPlay ? '1px solid #35D6C5' : '1px solid rgba(142, 154, 176, 0.25)',
              color: isAutoPlay ? '#35D6C5' : '#8E9AB0',
              fontSize: '13px',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {isAutoPlay ? <Pause size={14} /> : <Play size={14} />}
            <span>{isAutoPlay ? 'Auto-Advancing' : 'Auto Presentation'}</span>
            <span style={{ opacity: 0.5, fontSize: '11px' }}>[P]</span>
          </button>

          {/* Viva Defense Mode */}
          <button
            onClick={onOpenViva}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '7px 18px',
              borderRadius: 20,
              background: 'rgba(196, 163, 90, 0.18)',
              border: '1.5px solid #C4A35A',
              color: '#C4A35A',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            <Shield size={14} />
            <span>Viva Defense</span>
            <span style={{ opacity: 0.7, fontSize: '11px', fontFamily: 'var(--font-mono)' }}>[V]</span>
          </button>
        </div>
      </nav>

      {/* ================================================================
          SECTION 01: RESEARCH TITLE & ACADEMIC IDENTITY
          ================================================================ */}
      <section className="pres-section" style={{ minHeight: '90vh', paddingTop: '100px' }}>
        <div className="math-substrate" />
        <div className="pres-container">
          <div className="stage-badge">01 · RESEARCH IDENTITY</div>
          <h2
            className="font-serif text-ivory"
            style={{
              fontSize: 'clamp(44px, 6.5vw, 84px)',
              fontWeight: 500,
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
              marginBottom: 20,
            }}
          >
            Mathematical Analysis <br />
            <span className="text-gold font-serif" style={{ fontStyle: 'italic' }}>
              of Recursive Algorithms
            </span>
          </h2>

          <p
            className="sec-lead text-muted"
            style={{ fontSize: 'clamp(19px, 2vw, 24px)', maxWidth: '860px', marginBottom: 40 }}
          >
            {PAPER_DATA.meta.subtitle}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 20,
            }}
          >
            <div className="glass-panel" style={{ borderLeft: '4px solid #C4A35A' }}>
              <span className="font-mono text-gold" style={{ fontSize: '13px' }}>RESEARCHER</span>
              <div style={{ fontSize: '22px', fontWeight: 600, color: '#F5F0E8', marginTop: 6 }}>
                {PAPER_DATA.meta.studentName}
              </div>
              <div style={{ fontSize: '15px', color: '#8E9AB0', marginTop: 2 }}>
                Roll No. {PAPER_DATA.meta.rollNo} · {PAPER_DATA.meta.course}
              </div>
            </div>

            <div className="glass-panel" style={{ borderLeft: '4px solid #35D6C5' }}>
              <span className="font-mono text-teal" style={{ fontSize: '13px' }}>PROJECT GUIDE</span>
              <div style={{ fontSize: '22px', fontWeight: 600, color: '#F5F0E8', marginTop: 6 }}>
                {PAPER_DATA.meta.guide}
              </div>
              <div style={{ fontSize: '15px', color: '#8E9AB0', marginTop: 2 }}>
                HOD: {PAPER_DATA.meta.hod} · {PAPER_DATA.meta.department}
              </div>
            </div>

            <div className="glass-panel" style={{ borderLeft: '4px solid #E87963' }}>
              <span className="font-mono text-coral" style={{ fontSize: '13px' }}>INSTITUTION</span>
              <div style={{ fontSize: '20px', fontWeight: 600, color: '#F5F0E8', marginTop: 6 }}>
                {PAPER_DATA.meta.institution}
              </div>
              <div style={{ fontSize: '14px', color: '#8E9AB0', marginTop: 2 }}>
                {PAPER_DATA.meta.affiliation} · {PAPER_DATA.meta.academicYear}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 02: ABSTRACT & 3 ANALYTICAL DIMENSIONS
          ================================================================ */}
      <section className="pres-section">
        <div className="pres-container">
          <div className="stage-badge">02 · SECTION 2: ABSTRACT & DIMENSIONS</div>
          <h2 className="font-serif text-ivory" style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 500, marginBottom: 20 }}>
            Problem Statement & Scope
          </h2>

          <div className="glass-panel" style={{ borderLeft: '4px solid #35D6C5', marginBottom: 32 }}>
            <p style={{ fontSize: 'clamp(18px, 1.8vw, 22px)', color: '#F5F0E8', lineHeight: 1.75 }}>
              "{PAPER_DATA.abstract.text}"
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            <div className="glass-panel">
              <span className="font-mono text-gold" style={{ fontSize: '13px' }}>DIMENSION 01</span>
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#F5F0E8', marginTop: 6 }}>
                Operational Mechanics
              </h3>
              <p style={{ fontSize: '15px', color: '#8E9AB0', marginTop: 8 }}>
                How the method works algorithmically through successive recursive reductions and base conditions.
              </p>
            </div>

            <div className="glass-panel">
              <span className="font-mono text-teal" style={{ fontSize: '13px' }}>DIMENSION 02</span>
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#F5F0E8', marginTop: 6 }}>
                Required Assumptions
              </h3>
              <p style={{ fontSize: '15px', color: '#8E9AB0', marginTop: 8 }}>
                What data models, subproblem divisions, and pre-conditions are required for the recurrence to hold.
              </p>
            </div>

            <div className="glass-panel">
              <span className="font-mono text-coral" style={{ fontSize: '13px' }}>DIMENSION 03</span>
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#F5F0E8', marginTop: 6 }}>
                Resource Scaling
              </h3>
              <p style={{ fontSize: '15px', color: '#8E9AB0', marginTop: 8 }}>
                How time and space resource demands grow asymptotically as input parameter n scales toward infinity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 03: FIVE OBJECTIVES & DAA IMPORTANCE
          ================================================================ */}
      <section className="pres-section">
        <div className="pres-container">
          <div className="stage-badge">03 · SECTION 1.2: FORMAL OBJECTIVES</div>
          <h2 className="font-serif text-ivory" style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 500, marginBottom: 28 }}>
            Five Research Objectives
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}>
            {PAPER_DATA.objectives.map((obj, i) => (
              <div
                key={i}
                className="glass-panel step-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  padding: '16px 24px',
                }}
              >
                <span className="font-mono text-gold" style={{ fontSize: '20px', fontWeight: 600, minWidth: 32 }}>
                  0{i + 1}
                </span>
                <span style={{ fontSize: 'clamp(17px, 1.8vw, 20px)', color: '#F5F0E8' }}>
                  {obj}
                </span>
              </div>
            ))}
          </div>

          <div className="glass-panel" style={{ borderLeft: '4px solid #C4A35A', background: 'rgba(196, 163, 90, 0.08)' }}>
            <span className="font-mono text-gold" style={{ fontSize: '13px', letterSpacing: '0.12em' }}>
              SECTION 1.3: IMPORTANCE IN DESIGN AND ANALYSIS OF ALGORITHMS
            </span>
            <p style={{ fontSize: '17px', color: '#F5F0E8', marginTop: 8, lineHeight: 1.65 }}>
              {PAPER_DATA.introduction.importance}
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 04: THE GENERAL RECURRENCE EQUATION
          ================================================================ */}
      <section className="pres-section">
        <div className="pres-container">
          <div className="stage-badge">04 · SECTION 1.4 & 4.1: RECURRENCE RELATION</div>
          <h2 className="font-serif text-ivory" style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 500, marginBottom: 20 }}>
            Interactive Recurrence Formulation
          </h2>

          <div
            className="glass-panel"
            style={{
              padding: 'clamp(32px, 5vw, 56px)',
              textAlign: 'center',
              border: '1.5px solid rgba(196, 163, 90, 0.4)',
              marginBottom: 32,
            }}
          >
            <div
              className="font-mono glow-gold text-gold"
              style={{
                fontSize: 'clamp(40px, 6vw, 76px)',
                fontWeight: 600,
                letterSpacing: '0.04em',
                marginBottom: 24,
              }}
            >
              {PAPER_DATA.recurrenceRelation.formula}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
              {PAPER_DATA.recurrenceRelation.terms.map(t => (
                <button
                  key={t.symbol}
                  onClick={() => setSelectedTerm(t.symbol)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 20,
                    background: selectedTerm === t.symbol ? 'rgba(196, 163, 90, 0.25)' : 'rgba(12, 16, 28, 0.7)',
                    border: selectedTerm === t.symbol ? '1.5px solid #C4A35A' : '1px solid rgba(142, 154, 176, 0.2)',
                    color: selectedTerm === t.symbol ? '#C4A35A' : '#F5F0E8',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '15px',
                  }}
                >
                  {t.symbol}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Term Breakdown */}
          {(() => {
            const current = PAPER_DATA.recurrenceRelation.terms.find(t => t.symbol === selectedTerm) || PAPER_DATA.recurrenceRelation.terms[0]
            return (
              <div className="glass-panel" style={{ borderLeft: '4px solid #C4A35A' }}>
                <span className="font-mono text-gold" style={{ fontSize: '13px' }}>
                  TERM BREAKDOWN · {current.symbol} ({current.name})
                </span>
                <p style={{ fontSize: 'clamp(17px, 1.8vw, 20px)', color: '#F5F0E8', marginTop: 10, lineHeight: 1.6 }}>
                  {current.meaning}
                </p>
              </div>
            )
          })()}
        </div>
      </section>

      {/* ================================================================
          SECTION 05: INTERACTIVE RECURSION TREE WORKSTATION
          ================================================================ */}
      <section className="pres-section">
        <div className="pres-container">
          <div className="stage-badge">05 · SECTION 4.1: RECURSION TREE WORKSTATION</div>
          <h2 className="font-serif text-ivory" style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 500, marginBottom: 28 }}>
            Recursive Work Expansion Across Levels
          </h2>

          <RecursionTreeVisualizer />
        </div>
      </section>

      {/* ================================================================
          SECTION 06: METHODOLOGY 7-STEP PROCEDURE
          ================================================================ */}
      <section className="pres-section">
        <div className="pres-container">
          <div className="stage-badge">06 · SECTION 3.1: RESEARCH METHODOLOGY</div>
          <h2 className="font-serif text-ivory" style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 500, marginBottom: 20 }}>
            Descriptive & Analytical 7-Step Procedure
          </h2>
          <p className="sec-lead text-muted" style={{ fontSize: '18px', maxWidth: '840px', marginBottom: 32 }}>
            {PAPER_DATA.methodology.overview}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {PAPER_DATA.methodology.steps.map(step => (
              <div
                key={step.stepNumber}
                className="glass-panel step-card"
                onClick={() => setActiveMethodStep(step.stepNumber)}
                style={{
                  cursor: 'pointer',
                  borderLeft: activeMethodStep === step.stepNumber ? '4px solid #35D6C5' : '1px solid rgba(142, 154, 176, 0.14)',
                  background: activeMethodStep === step.stepNumber ? 'rgba(53, 214, 197, 0.1)' : undefined,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <span className="font-mono text-teal" style={{ fontSize: '16px', fontWeight: 600 }}>
                    STEP {step.stepNumber}
                  </span>
                  <h4 style={{ fontSize: '17px', color: '#F5F0E8', fontWeight: 600 }}>
                    {step.title}
                  </h4>
                </div>
                <p style={{ fontSize: '14px', color: '#8E9AB0', lineHeight: 1.5 }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 07: COMPLEXITY ANALYSIS & GROWTH PATTERNS
          ================================================================ */}
      <section className="pres-section">
        <div className="pres-container">
          <div className="stage-badge">07 · SECTION 4.2: ASYMPTOTIC NOTATION</div>
          <h2 className="font-serif text-ivory" style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 500, marginBottom: 24 }}>
            Asymptotic Definitions & Figure 4.2 Curves
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 32 }}>
            {PAPER_DATA.complexityAnalysis.notations.map(item => (
              <div key={item.symbol} className="glass-panel">
                <span className="font-mono text-gold" style={{ fontSize: '26px', fontWeight: 600 }}>
                  {item.symbol}
                </span>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#F5F0E8', marginTop: 4 }}>
                  {item.meaning}
                </div>
                <p style={{ fontSize: '14px', color: '#8E9AB0', marginTop: 6, lineHeight: 1.5 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <AsymptoticCurvesVisualizer />
        </div>
      </section>

      {/* ================================================================
          SECTION 08: SPACE COMPLEXITY & CALL STACK
          ================================================================ */}
      <section className="pres-section">
        <div className="pres-container">
          <div className="stage-badge">08 · SECTION 4.4: AUXILIARY SPACE</div>
          <h2 className="font-serif text-ivory" style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 500, marginBottom: 28 }}>
            Call Stack Depth & Auxiliary Memory
          </h2>

          <CallStackVisualizer />
        </div>
      </section>

      {/* ================================================================
          SECTION 09: RESULTS & TABLE 3 COMPARATIVE VIEW
          ================================================================ */}
      <section className="pres-section">
        <div className="pres-container">
          <div className="stage-badge">09 · SECTION 5: RESULTS & DISCUSSION</div>
          <h2 className="font-serif text-ivory" style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 500, marginBottom: 24 }}>
            Table 3: General Analytical Observations
          </h2>

          <div className="glass-panel" style={{ marginBottom: 28 }}>
            <p style={{ fontSize: '18px', color: '#F5F0E8', lineHeight: 1.7 }}>
              {PAPER_DATA.resultsAndDiscussion.analyticalResult}
            </p>
          </div>

          <div className="glass-panel">
            <div className="font-mono text-gold" style={{ fontSize: '13px', letterSpacing: '0.12em', marginBottom: 16 }}>
              TABLE 3: GENERAL ANALYTICAL OBSERVATIONS (PAGE 10)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {PAPER_DATA.resultsAndDiscussion.generalObservations.map(obs => (
                <div
                  key={obs.aspect}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 18px',
                    background: 'rgba(6, 8, 14, 0.6)',
                    borderRadius: 6,
                    border: '1px solid rgba(142, 154, 176, 0.1)',
                  }}
                >
                  <span className="font-mono text-gold" style={{ fontSize: '15px', fontWeight: 600 }}>
                    {obs.aspect}
                  </span>
                  <span style={{ fontSize: '15px', color: '#F5F0E8' }}>
                    {obs.observation}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 10: 10 APPLICATION DOMAINS
          ================================================================ */}
      <section className="pres-section">
        <div className="pres-container">
          <div className="stage-badge">10 · SECTION 6.1: COMPUTING APPLICATIONS</div>
          <h2 className="font-serif text-ivory" style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 500, marginBottom: 28 }}>
            Ten Verified Application Contexts
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {PAPER_DATA.applications.map((app, idx) => (
              <div
                key={app}
                className="glass-panel app-card"
                style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px' }}
              >
                <span className="font-mono text-gold" style={{ fontSize: '14px', fontWeight: 600 }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span style={{ fontSize: '16px', fontWeight: 500, color: '#F5F0E8' }}>
                  {app}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 11: ADVANTAGES & LIMITATIONS
          ================================================================ */}
      <section className="pres-section">
        <div className="pres-container">
          <div className="stage-badge">11 · SECTION 6.2 & 6.3: ADVANTAGES & LIMITATIONS</div>
          <h2 className="font-serif text-ivory" style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 500, marginBottom: 32 }}>
            Theoretical Strengths vs Hardware Constraints
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28 }}>
            {/* Advantages */}
            <div className="glass-panel" style={{ borderTop: '4px solid #35D6C5' }}>
              <div className="font-mono text-teal" style={{ fontSize: '13px', letterSpacing: '0.1em', marginBottom: 16 }}>
                RESEARCH ADVANTAGES (SECTION 6.2)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {PAPER_DATA.advantages.map((adv, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <CheckCircle2 size={18} className="text-teal" style={{ flexShrink: 0, marginTop: 3 }} />
                    <span style={{ fontSize: '15px', color: '#F5F0E8', lineHeight: 1.5 }}>
                      {adv}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Limitations */}
            <div className="glass-panel" style={{ borderTop: '4px solid #E87963' }}>
              <div className="font-mono text-coral" style={{ fontSize: '13px', letterSpacing: '0.1em', marginBottom: 16 }}>
                RESEARCH LIMITATIONS (SECTION 6.3)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {PAPER_DATA.limitations.map((lim, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span className="font-mono text-coral" style={{ fontWeight: 600, marginTop: 2 }}>
                      !
                    </span>
                    <span style={{ fontSize: '15px', color: '#F5F0E8', lineHeight: 1.5 }}>
                      {lim}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 12: CORE DISCUSSION & TRADE-OFFS
          ================================================================ */}
      <section className="pres-section">
        <div className="pres-container">
          <div className="stage-badge">12 · SECTION 6.4: DISCUSSION</div>
          <h2 className="font-serif text-ivory" style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 500, marginBottom: 24 }}>
            The Core DAA Principle: Algorithmic Trade-offs
          </h2>

          <div className="glass-panel" style={{ padding: 'clamp(28px, 4vw, 48px)', borderLeft: '4px solid #C4A35A' }}>
            <p style={{ fontSize: 'clamp(18px, 1.8vw, 22px)', color: '#F5F0E8', lineHeight: 1.8 }}>
              "{PAPER_DATA.discussion}"
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 13: FIVE FUTURE SCOPE DIRECTIONS
          ================================================================ */}
      <section className="pres-section">
        <div className="pres-container">
          <div className="stage-badge">13 · SECTION 6.5: FUTURE SCOPE</div>
          <h2 className="font-serif text-ivory" style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 500, marginBottom: 28 }}>
            Five Verified Avenues for Future Work
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {PAPER_DATA.futureScope.map((scope, idx) => (
              <div
                key={idx}
                className="glass-panel"
                style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '16px 24px' }}
              >
                <span className="font-mono text-gold" style={{ fontSize: '16px', fontWeight: 600 }}>
                  0{idx + 1}
                </span>
                <span style={{ fontSize: '16px', color: '#F5F0E8' }}>
                  {scope}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 14: CONCLUSION & RETURN TO T(n)
          ================================================================ */}
      <section className="pres-section">
        <div className="pres-container" style={{ textAlign: 'center' }}>
          <div className="stage-badge">14 · SECTION 7: CONCLUSION</div>
          <h2 className="font-serif text-ivory" style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 500, marginBottom: 20 }}>
            Synthesis of Recursive Analysis
          </h2>

          <p style={{ fontSize: '19px', color: '#F5F0E8', maxWidth: '820px', margin: '0 auto 36px', lineHeight: 1.75 }}>
            {PAPER_DATA.conclusion.summary}
          </p>

          <div
            className="glass-panel"
            style={{
              maxWidth: '720px',
              margin: '0 auto 36px',
              padding: '36px',
              border: '1.5px solid rgba(196, 163, 90, 0.4)',
            }}
          >
            <div className="font-mono glow-gold text-gold" style={{ fontSize: '56px', fontWeight: 600, marginBottom: 16 }}>
              T(n)
            </div>
            <p style={{ fontSize: '18px', color: '#F5F0E8', lineHeight: 1.6 }}>
              {PAPER_DATA.conclusion.keyFinding}
            </p>
            <div className="font-mono text-teal" style={{ fontSize: '15px', marginTop: 16 }}>
              {PAPER_DATA.conclusion.closingStatement}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 15: BIBLIOGRAPHY
          ================================================================ */}
      <section className="pres-section" style={{ borderBottom: 'none', paddingBottom: '120px' }}>
        <div className="pres-container">
          <div className="stage-badge">15 · SECTION 8: BIBLIOGRAPHY</div>
          <h2 className="font-serif text-ivory" style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 500, marginBottom: 28 }}>
            Authoritative References
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: '940px' }}>
            {PAPER_DATA.bibliography.map(ref => (
              <div
                key={ref.id}
                className="glass-panel"
                style={{ display: 'flex', gap: 18, padding: '16px 22px', alignItems: 'flex-start' }}
              >
                <span className="font-mono text-gold" style={{ fontSize: '15px', fontWeight: 600, minWidth: 28 }}>
                  [{ref.id}]
                </span>
                <span style={{ fontSize: '15px', color: '#F5F0E8', lineHeight: 1.6 }}>
                  {ref.citation}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 64,
              paddingTop: 28,
              borderTop: '1px solid rgba(142, 154, 176, 0.15)',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <div>
              <div className="font-mono text-gold" style={{ fontSize: '14px' }}>
                MATHEMATICAL ANALYSIS OF RECURSIVE ALGORITHMS
              </div>
              <div style={{ fontSize: '13px', color: '#8E9AB0', marginTop: 2 }}>
                {PAPER_DATA.meta.studentName} · Roll No. {PAPER_DATA.meta.rollNo} · {PAPER_DATA.meta.institution}
              </div>
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-mono"
              style={{
                fontSize: '13px',
                padding: '8px 18px',
                border: '1px solid rgba(196, 163, 90, 0.3)',
                borderRadius: 20,
                color: '#C4A35A',
              }}
            >
              Return to Top ↑
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
