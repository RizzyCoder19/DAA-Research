import { useState, useEffect } from 'react'
import { PAPER_DATA } from '../../content/paperData'
import { RecursionTreeVisualizer } from '../visualizers/RecursionTreeVisualizer'
import { AsymptoticCurvesVisualizer } from '../visualizers/AsymptoticCurvesVisualizer'
import { CallStackVisualizer } from '../visualizers/CallStackVisualizer'
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Layers,
  RotateCcw,
  Shield,
  ExternalLink,
  Target,
  Cpu,
  Binary,
  GitBranch,
} from 'lucide-react'

interface Props {
  onOpenViva: () => void
  onReplayIntro: () => void
}

export function ResearchFilm({ onOpenViva, onReplayIntro }: Props) {
  const [activeStep, setActiveStep] = useState<number>(1)
  const [selectedTerm, setSelectedTerm] = useState<string>('T(n)')
  const [selectedFactor, setSelectedFactor] = useState<number>(0)

  // Keyboard navigation for presentation mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'v' || e.key === 'V') {
        onOpenViva()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onOpenViva])

  return (
    <div style={{ backgroundColor: '#120D17', minHeight: '100vh', position: 'relative' }}>
      {/* MINIMAL TOP BAR */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '64px',
          backgroundColor: 'rgba(18, 13, 23, 0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(155, 142, 170, 0.15)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 clamp(16px, 4vw, 48px)',
          zIndex: 100,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span className="font-mono text-teal" style={{ fontSize: '14px', letterSpacing: '0.12em' }}>
            DAA · RESEARCH FILM
          </span>
          <span style={{ color: 'rgba(155, 142, 170, 0.4)' }}>|</span>
          <span className="text-ivory" style={{ fontSize: '15px', fontWeight: 500 }}>
            Khan Umar Abdulaziz (Roll No. 45)
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={onReplayIntro}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '18px',
              border: '1px solid rgba(155, 142, 170, 0.25)',
              fontSize: '13px',
              color: '#9B8EAA',
            }}
          >
            <RotateCcw size={13} />
            <span>Prologue</span>
          </button>

          <button
            onClick={onOpenViva}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '18px',
              background: 'rgba(53, 214, 197, 0.15)',
              border: '1px solid #35D6C5',
              color: '#35D6C5',
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            <Shield size={14} />
            <span>Viva Defense</span>
            <span style={{ opacity: 0.6, fontSize: '11px', fontFamily: 'var(--font-mono)' }}>[V]</span>
          </button>
        </div>
      </nav>

      {/* ================================================================
          SCENE 01 — RESEARCH IDENTITY
          ================================================================ */}
      <section className="film-section" style={{ minHeight: '92vh', paddingTop: '100px' }}>
        <div className="math-grid-bg" />
        <div className="film-container">
          <div className="font-mono text-teal" style={{ fontSize: '15px', letterSpacing: '0.2em', marginBottom: 16 }}>
            01 / 23 · RESEARCH IDENTITY
          </div>
          <h1
            className="font-serif text-ivory"
            style={{
              fontSize: 'var(--text-hero)',
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: 24,
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
              fontSize: 'clamp(20px, 2.2vw, 26px)',
              maxWidth: '880px',
              lineHeight: 1.5,
              marginBottom: 44,
            }}
          >
            {PAPER_DATA.meta.subtitle}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 20,
              maxWidth: '1000px',
            }}
          >
            <div className="editorial-panel">
              <span className="font-mono text-teal" style={{ fontSize: '12px', letterSpacing: '0.1em' }}>
                RESEARCHER & ROLL NO.
              </span>
              <div style={{ fontSize: '20px', fontWeight: 600, color: '#F5F0E8', marginTop: 6 }}>
                {PAPER_DATA.meta.studentName}
              </div>
              <div style={{ fontSize: '15px', color: '#9B8EAA', marginTop: 2 }}>
                Roll No. {PAPER_DATA.meta.rollNo} · {PAPER_DATA.meta.course}
              </div>
            </div>

            <div className="editorial-panel">
              <span className="font-mono text-coral" style={{ fontSize: '12px', letterSpacing: '0.1em' }}>
                SUPERVISION & GUIDANCE
              </span>
              <div style={{ fontSize: '20px', fontWeight: 600, color: '#F5F0E8', marginTop: 6 }}>
                {PAPER_DATA.meta.guide}
              </div>
              <div style={{ fontSize: '15px', color: '#9B8EAA', marginTop: 2 }}>
                HOD: {PAPER_DATA.meta.hod} · {PAPER_DATA.meta.academicYear}
              </div>
            </div>

            <div className="editorial-panel">
              <span className="font-mono text-lavender" style={{ fontSize: '12px', letterSpacing: '0.1em' }}>
                ACADEMIC AFFILIATION
              </span>
              <div style={{ fontSize: '20px', fontWeight: 600, color: '#F5F0E8', marginTop: 6 }}>
                {PAPER_DATA.meta.institution}
              </div>
              <div style={{ fontSize: '15px', color: '#9B8EAA', marginTop: 2 }}>
                {PAPER_DATA.meta.affiliation} · {PAPER_DATA.meta.location}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SCENE 02 — ABSTRACT / RESEARCH QUESTION
          ================================================================ */}
      <section className="film-section">
        <div className="film-container">
          <div className="font-mono text-teal" style={{ fontSize: '14px', letterSpacing: '0.18em', marginBottom: 16 }}>
            02 / 23 · SECTION 2: ABSTRACT & RESEARCH QUESTION
          </div>
          <h2 className="font-serif text-ivory" style={{ fontSize: 'var(--text-title)', fontWeight: 500, marginBottom: 24 }}>
            Foundational Analytical Scope
          </h2>

          <div
            className="editorial-panel"
            style={{
              padding: 'clamp(28px, 4vw, 52px)',
              borderLeft: '4px solid #35D6C5',
              marginBottom: 32,
            }}
          >
            <p style={{ fontSize: 'var(--text-body)', color: '#F5F0E8', lineHeight: 1.75 }}>
              "{PAPER_DATA.abstract.text}"
            </p>
          </div>

          <div>
            <div className="font-mono text-lavender" style={{ fontSize: '14px', letterSpacing: '0.1em', marginBottom: 12 }}>
              KEYWORDS DERIVED FROM SECTION 3:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {PAPER_DATA.abstract.keywords.map(kw => (
                <span
                  key={kw}
                  className="font-mono"
                  style={{
                    padding: '6px 14px',
                    borderRadius: 16,
                    background: 'rgba(33, 22, 34, 0.7)',
                    border: '1px solid rgba(155, 142, 170, 0.2)',
                    fontSize: '14px',
                    color: '#35D6C5',
                  }}
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SCENE 03 — INTRODUCTION & PROBLEM STATEMENT
          ================================================================ */}
      <section className="film-section">
        <div className="film-container">
          <div className="font-mono text-coral" style={{ fontSize: '14px', letterSpacing: '0.18em', marginBottom: 16 }}>
            03 / 23 · SECTION 1.1: INTRODUCTION & PROBLEM STATEMENT
          </div>
          <h2 className="font-serif text-ivory" style={{ fontSize: 'var(--text-title)', fontWeight: 500, marginBottom: 28 }}>
            The Three Core Analytical Dimensions
          </h2>

          <p style={{ fontSize: 'var(--text-body)', color: '#F5F0E8', maxWidth: '920px', lineHeight: 1.7, marginBottom: 36 }}>
            {PAPER_DATA.introduction.problemStatement}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24,
            }}
          >
            <div className="editorial-panel" style={{ borderTop: '3px solid #35D6C5' }}>
              <div className="font-mono text-teal" style={{ fontSize: '14px', marginBottom: 8 }}>
                DIMENSION 01
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 600, color: '#F5F0E8', marginBottom: 10 }}>
                Operational Mechanics
              </h3>
              <p style={{ fontSize: '16px', color: '#9B8EAA', lineHeight: 1.6 }}>
                How the chosen method works algorithmically through successive recursive reductions and base conditions.
              </p>
            </div>

            <div className="editorial-panel" style={{ borderTop: '3px solid #E87963' }}>
              <div className="font-mono text-coral" style={{ fontSize: '14px', marginBottom: 8 }}>
                DIMENSION 02
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 600, color: '#F5F0E8', marginBottom: 10 }}>
                Underlying Assumptions
              </h3>
              <p style={{ fontSize: '16px', color: '#9B8EAA', lineHeight: 1.6 }}>
                What data models, subproblem divisions, and pre-conditions are required for the recurrence to hold.
              </p>
            </div>

            <div className="editorial-panel" style={{ borderTop: '3px solid #9B8EAA' }}>
              <div className="font-mono text-lavender" style={{ fontSize: '14px', marginBottom: 8 }}>
                DIMENSION 03
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 600, color: '#F5F0E8', marginBottom: 10 }}>
                Resource Scaling
              </h3>
              <p style={{ fontSize: '16px', color: '#9B8EAA', lineHeight: 1.6 }}>
                How time and space resource demands grow asymptotically as the input parameter n scales toward infinity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SCENE 04 — OBJECTIVES & IMPORTANCE
          ================================================================ */}
      <section className="film-section">
        <div className="film-container">
          <div className="font-mono text-teal" style={{ fontSize: '14px', letterSpacing: '0.18em', marginBottom: 16 }}>
            04 / 23 · SECTION 1.2 & 1.3: OBJECTIVES & IMPORTANCE
          </div>
          <h2 className="font-serif text-ivory" style={{ fontSize: 'var(--text-title)', fontWeight: 500, marginBottom: 28 }}>
            Five Formal Research Objectives
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
            {PAPER_DATA.objectives.map((obj, i) => (
              <div
                key={i}
                className="editorial-panel"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  padding: '18px 28px',
                }}
              >
                <span className="font-mono text-teal" style={{ fontSize: '20px', fontWeight: 600, minWidth: '32px' }}>
                  0{i + 1}
                </span>
                <span style={{ fontSize: 'var(--text-body)', color: '#F5F0E8' }}>
                  {obj}
                </span>
              </div>
            ))}
          </div>

          <div
            className="editorial-panel"
            style={{
              borderLeft: '4px solid #E87963',
              background: 'rgba(232, 121, 99, 0.06)',
            }}
          >
            <div className="font-mono text-coral" style={{ fontSize: '13px', letterSpacing: '0.12em', marginBottom: 8 }}>
              RESEARCH IMPORTANCE IN DAA (SECTION 1.3)
            </div>
            <p style={{ fontSize: '18px', color: '#F5F0E8', lineHeight: 1.7 }}>
              {PAPER_DATA.introduction.importance}
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
          SCENE 05 — FUNDAMENTAL CONCEPT
          ================================================================ */}
      <section className="film-section">
        <div className="film-container">
          <div className="font-mono text-teal" style={{ fontSize: '14px', letterSpacing: '0.18em', marginBottom: 16 }}>
            05 / 23 · SECTION 1.4: FUNDAMENTAL CONCEPT
          </div>
          <h2 className="font-serif text-ivory" style={{ fontSize: 'var(--text-title)', fontWeight: 500, marginBottom: 24 }}>
            Subproblem Decomposition & Mathematical Formulation
          </h2>

          <p style={{ fontSize: 'var(--text-body)', color: '#F5F0E8', maxWidth: '900px', lineHeight: 1.7, marginBottom: 36 }}>
            {PAPER_DATA.introduction.fundamentalConcept}
          </p>

          <div
            style={{
              padding: 'clamp(32px, 5vw, 60px)',
              background: 'rgba(33, 22, 34, 0.8)',
              border: '1px solid rgba(53, 214, 197, 0.35)',
              borderRadius: 12,
              textAlign: 'center',
            }}
          >
            <div className="font-mono text-lavender" style={{ fontSize: '14px', letterSpacing: '0.15em', marginBottom: 12 }}>
              THE GENERAL RECURRENCE FORMULATION
            </div>
            <div
              className="font-mono teal-glow text-teal"
              style={{
                fontSize: 'var(--text-equation)',
                fontWeight: 600,
                letterSpacing: '0.04em',
                marginBottom: 16,
              }}
            >
              T(n) = aT(n/b) + f(n)
            </div>
            <p className="text-lavender" style={{ fontSize: '18px', maxWidth: '640px', margin: '0 auto' }}>
              Connecting algorithmic reduction directly with asymptotic derivation through recursion trees, substitution, and standard recurrence results.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
          SCENE 06 — LITERATURE REVIEW
          ================================================================ */}
      <section className="film-section">
        <div className="film-container">
          <div className="font-mono text-lavender" style={{ fontSize: '14px', letterSpacing: '0.18em', marginBottom: 16 }}>
            06 / 23 · SECTION 2: LITERATURE REVIEW
          </div>
          <h2 className="font-serif text-ivory" style={{ fontSize: 'var(--text-title)', fontWeight: 500, marginBottom: 24 }}>
            Classical Foundations & Three Academic Inquiries
          </h2>

          <p style={{ fontSize: 'var(--text-body)', color: '#F5F0E8', maxWidth: '900px', lineHeight: 1.7, marginBottom: 32 }}>
            {PAPER_DATA.literatureReview.overview}
          </p>

          {/* Three Questions */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 20,
              marginBottom: 36,
            }}
          >
            {PAPER_DATA.literatureReview.researchPerspective.questions.map((q, idx) => (
              <div key={idx} className="editorial-panel">
                <span className="font-mono text-teal" style={{ fontSize: '13px' }}>
                  RESEARCH QUESTION {idx + 1}
                </span>
                <p style={{ fontSize: '19px', fontWeight: 500, color: '#F5F0E8', marginTop: 10, lineHeight: 1.5 }}>
                  "{q}"
                </p>
              </div>
            ))}
          </div>

          {/* Table 2.4 Summary of literature */}
          <div className="editorial-panel">
            <div className="font-mono text-lavender" style={{ fontSize: '13px', letterSpacing: '0.1em', marginBottom: 16 }}>
              TABLE 2.4 & FIGURE 2.1: LITERATURE SOURCES & CONTRIBUTIONS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {PAPER_DATA.literatureReview.summary.map(item => (
                <div
                  key={item.sourceType}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 18px',
                    background: 'rgba(18, 13, 23, 0.5)',
                    borderRadius: 6,
                    border: '1px solid rgba(155, 142, 170, 0.1)',
                  }}
                >
                  <span className="font-mono text-teal" style={{ fontSize: '16px', fontWeight: 600 }}>
                    {item.sourceType}
                  </span>
                  <span style={{ fontSize: '15px', color: '#F5F0E8' }}>
                    {item.contribution}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SCENE 07 — METHODOLOGY: 7-STEP PROCEDURE
          ================================================================ */}
      <section className="film-section">
        <div className="film-container">
          <div className="font-mono text-teal" style={{ fontSize: '14px', letterSpacing: '0.18em', marginBottom: 16 }}>
            07 / 23 · SECTION 3: METHODOLOGY
          </div>
          <h2 className="font-serif text-ivory" style={{ fontSize: 'var(--text-title)', fontWeight: 500, marginBottom: 20 }}>
            Descriptive & Analytical 7-Step Procedure
          </h2>
          <p style={{ fontSize: 'var(--text-body)', color: '#9B8EAA', maxWidth: '880px', lineHeight: 1.6, marginBottom: 32 }}>
            {PAPER_DATA.methodology.overview}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 16,
            }}
          >
            {PAPER_DATA.methodology.steps.map(step => (
              <div
                key={step.stepNumber}
                className="editorial-panel"
                onClick={() => setActiveStep(step.stepNumber)}
                style={{
                  cursor: 'pointer',
                  borderLeft: activeStep === step.stepNumber ? '4px solid #35D6C5' : '1px solid rgba(155, 142, 170, 0.16)',
                  backgroundColor: activeStep === step.stepNumber ? 'rgba(53, 214, 197, 0.08)' : 'rgba(33, 22, 34, 0.6)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <span className="font-mono text-teal" style={{ fontSize: '16px', fontWeight: 600 }}>
                    STEP {step.stepNumber}
                  </span>
                  <h4 style={{ fontSize: '18px', color: '#F5F0E8', fontWeight: 600 }}>
                    {step.title}
                  </h4>
                </div>
                <p style={{ fontSize: '15px', color: '#9B8EAA', lineHeight: 1.5 }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SCENE 08 — TOOLS, RESOURCES & EVALUATION CRITERIA
          ================================================================ */}
      <section className="film-section">
        <div className="film-container">
          <div className="font-mono text-coral" style={{ fontSize: '14px', letterSpacing: '0.18em', marginBottom: 16 }}>
            08 / 23 · SECTION 3.2 & 3.3: TOOLS, RESOURCES & CRITERIA
          </div>
          <h2 className="font-serif text-ivory" style={{ fontSize: 'var(--text-title)', fontWeight: 500, marginBottom: 28 }}>
            Implementation Scope & Table 2 Evaluation Criteria
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {/* Tools */}
            <div className="editorial-panel">
              <span className="font-mono text-teal" style={{ fontSize: '13px', letterSpacing: '0.1em' }}>
                STUDY IMPLEMENTATION SCOPE
              </span>
              <p style={{ fontSize: '16px', color: '#F5F0E8', marginTop: 12, lineHeight: 1.6 }}>
                {PAPER_DATA.methodology.toolsAndResources.description}
              </p>
              <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                {PAPER_DATA.methodology.toolsAndResources.programmingLanguages.map(lang => (
                  <span
                    key={lang}
                    className="font-mono"
                    style={{
                      padding: '4px 12px',
                      background: 'rgba(53, 214, 197, 0.1)',
                      border: '1px solid rgba(53, 214, 197, 0.3)',
                      borderRadius: 14,
                      fontSize: '13px',
                      color: '#35D6C5',
                    }}
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Evaluation Criteria Table 2 */}
            <div className="editorial-panel">
              <span className="font-mono text-coral" style={{ fontSize: '13px', letterSpacing: '0.1em' }}>
                TABLE 2: EVALUATION CRITERIA
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
                {PAPER_DATA.methodology.evaluationCriteria.map(item => (
                  <div
                    key={item.criterion}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px 12px',
                      background: 'rgba(18, 13, 23, 0.5)',
                      borderRadius: 6,
                    }}
                  >
                    <span className="font-mono text-ivory" style={{ fontSize: '15px', fontWeight: 600 }}>
                      {item.criterion}
                    </span>
                    <span style={{ fontSize: '14px', color: '#9B8EAA' }}>
                      {item.question}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SCENE 09 — WORKING PRINCIPLE
          ================================================================ */}
      <section className="film-section">
        <div className="film-container">
          <div className="font-mono text-teal" style={{ fontSize: '14px', letterSpacing: '0.18em', marginBottom: 16 }}>
            09 / 23 · SECTION 4.1: WORKING PRINCIPLE
          </div>
          <h2 className="font-serif text-ivory" style={{ fontSize: 'var(--text-title)', fontWeight: 500, marginBottom: 28 }}>
            Figure 4.1: Problem Reduction & Combination Pipeline
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
              gap: 16,
              marginBottom: 36,
            }}
          >
            {PAPER_DATA.workingPrinciple.stages.map((stg, i) => (
              <div
                key={stg.label}
                className="editorial-panel"
                style={{ textAlign: 'center', position: 'relative' }}
              >
                <span className="font-mono text-teal" style={{ fontSize: '13px' }}>
                  PHASE 0{i + 1}
                </span>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#F5F0E8', marginTop: 6 }}>
                  {stg.label}
                </div>
                <div style={{ fontSize: '14px', color: '#9B8EAA', marginTop: 4 }}>
                  {stg.sub}
                </div>
              </div>
            ))}
          </div>

          <div className="editorial-panel" style={{ borderLeft: '4px solid #35D6C5' }}>
            <span className="font-mono text-teal" style={{ fontSize: '13px', letterSpacing: '0.1em' }}>
              DOMINANT OPERATIONS PRINCIPLE
            </span>
            <p style={{ fontSize: '17px', color: '#F5F0E8', marginTop: 8, lineHeight: 1.6 }}>
              {PAPER_DATA.workingPrinciple.analysisTask}
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
          SCENE 10 — RECURRENCE RELATION: INTERACTIVE DECONSTRUCTION
          ================================================================ */}
      <section className="film-section">
        <div className="film-container">
          <div className="font-mono text-teal" style={{ fontSize: '14px', letterSpacing: '0.18em', marginBottom: 16 }}>
            10 / 23 · SECTION 4.1: RECURRENCE FORMULATION
          </div>
          <h2 className="font-serif text-ivory" style={{ fontSize: 'var(--text-title)', fontWeight: 500, marginBottom: 24 }}>
            Deconstructing the Recurrence Terms
          </h2>

          <div
            style={{
              padding: 'clamp(28px, 4vw, 48px)',
              background: 'rgba(33, 22, 34, 0.8)',
              border: '1px solid rgba(53, 214, 197, 0.35)',
              borderRadius: 12,
              textAlign: 'center',
              marginBottom: 32,
            }}
          >
            <div
              className="font-mono teal-glow text-teal"
              style={{
                fontSize: 'var(--text-equation)',
                fontWeight: 600,
                letterSpacing: '0.04em',
                marginBottom: 20,
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
                    background: selectedTerm === t.symbol ? 'rgba(53, 214, 197, 0.25)' : 'rgba(18, 13, 23, 0.6)',
                    border: selectedTerm === t.symbol ? '1.5px solid #35D6C5' : '1px solid rgba(155, 142, 170, 0.2)',
                    color: selectedTerm === t.symbol ? '#35D6C5' : '#F5F0E8',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '16px',
                  }}
                >
                  {t.symbol}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Term Detail */}
          {(() => {
            const current = PAPER_DATA.recurrenceRelation.terms.find(t => t.symbol === selectedTerm) || PAPER_DATA.recurrenceRelation.terms[0]
            return (
              <div className="editorial-panel" style={{ borderLeft: '4px solid #35D6C5' }}>
                <span className="font-mono text-teal" style={{ fontSize: '14px' }}>
                  TERM DEFINITION · {current.symbol} ({current.name})
                </span>
                <p style={{ fontSize: 'var(--text-body)', color: '#F5F0E8', marginTop: 10, lineHeight: 1.6 }}>
                  {current.meaning}
                </p>
              </div>
            )
          })()}
        </div>
      </section>

      {/* ================================================================
          SCENE 11 — RECURSION TREE WORKSTATION
          ================================================================ */}
      <section className="film-section">
        <div className="film-container">
          <div className="font-mono text-teal" style={{ fontSize: '14px', letterSpacing: '0.18em', marginBottom: 16 }}>
            11 / 23 · SECTION 4.1: RECURSION TREE
          </div>
          <h2 className="font-serif text-ivory" style={{ fontSize: 'var(--text-title)', fontWeight: 500, marginBottom: 28 }}>
            Interactive Multi-Level Work Expansion
          </h2>

          <RecursionTreeVisualizer />
        </div>
      </section>

      {/* ================================================================
          SCENE 12 — COMPLEXITY ANALYSIS & ASYMPTOTIC NOTATIONS
          ================================================================ */}
      <section className="film-section">
        <div className="film-container">
          <div className="font-mono text-teal" style={{ fontSize: '14px', letterSpacing: '0.18em', marginBottom: 16 }}>
            12 / 23 · SECTION 4.2 & 4.3: COMPLEXITY ANALYSIS
          </div>
          <h2 className="font-serif text-ivory" style={{ fontSize: 'var(--text-title)', fontWeight: 500, marginBottom: 24 }}>
            Asymptotic Notations & Figure 4.2 Growth Curves
          </h2>

          {/* Asymptotic Definitions */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 20,
              marginBottom: 32,
            }}
          >
            {PAPER_DATA.complexityAnalysis.notations.map(item => (
              <div key={item.symbol} className="editorial-panel">
                <span className="font-mono text-teal" style={{ fontSize: '24px', fontWeight: 600 }}>
                  {item.symbol}
                </span>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#F5F0E8', marginTop: 6 }}>
                  {item.meaning}
                </div>
                <p style={{ fontSize: '15px', color: '#9B8EAA', marginTop: 6, lineHeight: 1.5 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Curves Visualizer */}
          <AsymptoticCurvesVisualizer />
        </div>
      </section>

      {/* ================================================================
          SCENE 13 — REPRESENTATIVE EXAMPLE
          ================================================================ */}
      <section className="film-section">
        <div className="film-container">
          <div className="font-mono text-coral" style={{ fontSize: '14px', letterSpacing: '0.18em', marginBottom: 16 }}>
            13 / 23 · SECTION 4.3: REPRESENTATIVE EXAMPLE
          </div>
          <h2 className="font-serif text-ivory" style={{ fontSize: 'var(--text-title)', fontWeight: 500, marginBottom: 28 }}>
            Input Growth & Defining Operations
          </h2>

          <div className="editorial-panel" style={{ borderLeft: '4px solid #E87963', marginBottom: 28 }}>
            <p style={{ fontSize: 'var(--text-body)', color: '#F5F0E8', lineHeight: 1.75 }}>
              "{PAPER_DATA.representativeExample.text}"
            </p>
          </div>

          <div
            style={{
              padding: '16px 24px',
              borderRadius: 8,
              background: 'rgba(232, 121, 99, 0.08)',
              border: '1px solid rgba(232, 121, 99, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <span className="font-mono text-coral" style={{ fontSize: '14px', fontWeight: 600 }}>
              CRITICAL VIVA POINT:
            </span>
            <span style={{ fontSize: '16px', color: '#F5F0E8' }}>
              {PAPER_DATA.representativeExample.derivationNote}
            </span>
          </div>
        </div>
      </section>

      {/* ================================================================
          SCENE 14 — SPACE COMPLEXITY & CALL STACK
          ================================================================ */}
      <section className="film-section">
        <div className="film-container">
          <div className="font-mono text-teal" style={{ fontSize: '14px', letterSpacing: '0.18em', marginBottom: 16 }}>
            14 / 23 · SECTION 4.4: SPACE CONSIDERATIONS
          </div>
          <h2 className="font-serif text-ivory" style={{ fontSize: 'var(--text-title)', fontWeight: 500, marginBottom: 28 }}>
            Auxiliary Memory & Recursion Stack Depth
          </h2>

          <CallStackVisualizer />
        </div>
      </section>

      {/* ================================================================
          SCENE 15 — RESULTS AND DISCUSSION
          ================================================================ */}
      <section className="film-section">
        <div className="film-container">
          <div className="font-mono text-lavender" style={{ fontSize: '14px', letterSpacing: '0.18em', marginBottom: 16 }}>
            15 / 23 · SECTION 5: RESULTS & DISCUSSION
          </div>
          <h2 className="font-serif text-ivory" style={{ fontSize: 'var(--text-title)', fontWeight: 500, marginBottom: 24 }}>
            Table 3: General Analytical Observations
          </h2>

          <div className="editorial-panel" style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 'var(--text-body)', color: '#F5F0E8', lineHeight: 1.7 }}>
              {PAPER_DATA.resultsAndDiscussion.analyticalResult}
            </p>
          </div>

          {/* Table 3 */}
          <div className="editorial-panel">
            <div className="font-mono text-teal" style={{ fontSize: '13px', letterSpacing: '0.1em', marginBottom: 16 }}>
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
                    background: 'rgba(18, 13, 23, 0.6)',
                    borderRadius: 6,
                    border: '1px solid rgba(155, 142, 170, 0.1)',
                  }}
                >
                  <span className="font-mono text-teal" style={{ fontSize: '16px', fontWeight: 600 }}>
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
          SCENE 16 — PRACTICAL INTERPRETATION
          ================================================================ */}
      <section className="film-section">
        <div className="film-container">
          <div className="font-mono text-teal" style={{ fontSize: '14px', letterSpacing: '0.18em', marginBottom: 16 }}>
            16 / 23 · SECTION 5.3: PRACTICAL INTERPRETATION
          </div>
          <h2 className="font-serif text-ivory" style={{ fontSize: 'var(--text-title)', fontWeight: 500, marginBottom: 28 }}>
            Six Factors Influencing Real-World Implementation Choice
          </h2>

          <p style={{ fontSize: 'var(--text-body)', color: '#9B8EAA', maxWidth: '880px', lineHeight: 1.6, marginBottom: 32 }}>
            {PAPER_DATA.resultsAndDiscussion.practicalInterpretation.overview}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 16,
              marginBottom: 32,
            }}
          >
            {PAPER_DATA.resultsAndDiscussion.practicalInterpretation.factors.map((factor, idx) => (
              <div
                key={factor}
                className="editorial-panel"
                onClick={() => setSelectedFactor(idx)}
                style={{
                  cursor: 'pointer',
                  borderTop: selectedFactor === idx ? '3px solid #35D6C5' : '1px solid rgba(155, 142, 170, 0.16)',
                }}
              >
                <span className="font-mono text-teal" style={{ fontSize: '13px' }}>
                  FACTOR 0{idx + 1}
                </span>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#F5F0E8', marginTop: 6 }}>
                  {factor}
                </div>
              </div>
            ))}
          </div>

          <div className="editorial-panel" style={{ borderLeft: '4px solid #35D6C5' }}>
            <span className="font-mono text-teal" style={{ fontSize: '13px', letterSpacing: '0.1em' }}>
              SECTION 5.4: RESEARCH OUTCOME
            </span>
            <p style={{ fontSize: '17px', color: '#F5F0E8', marginTop: 8, lineHeight: 1.6 }}>
              {PAPER_DATA.resultsAndDiscussion.outcome}
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
          SCENE 17 — APPLICATIONS
          ================================================================ */}
      <section className="film-section">
        <div className="film-container">
          <div className="font-mono text-teal" style={{ fontSize: '14px', letterSpacing: '0.18em', marginBottom: 16 }}>
            17 / 23 · SECTION 6.1: APPLICATIONS
          </div>
          <h2 className="font-serif text-ivory" style={{ fontSize: 'var(--text-title)', fontWeight: 500, marginBottom: 28 }}>
            Ten Computing Application Domains
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 16,
            }}
          >
            {PAPER_DATA.applications.map((app, idx) => (
              <div
                key={app}
                className="editorial-panel"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '18px 22px',
                }}
              >
                <span className="font-mono text-teal" style={{ fontSize: '14px', fontWeight: 600 }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span style={{ fontSize: '17px', fontWeight: 500, color: '#F5F0E8' }}>
                  {app}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SCENE 18 & 19 — ADVANTAGES & LIMITATIONS
          ================================================================ */}
      <section className="film-section">
        <div className="film-container">
          <div className="font-mono text-lavender" style={{ fontSize: '14px', letterSpacing: '0.18em', marginBottom: 16 }}>
            18 & 19 / 23 · SECTION 6.2 & 6.3: ADVANTAGES & LIMITATIONS
          </div>
          <h2 className="font-serif text-ivory" style={{ fontSize: 'var(--text-title)', fontWeight: 500, marginBottom: 32 }}>
            Theoretical Strengths vs Practical Constraints
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28 }}>
            {/* Advantages */}
            <div className="editorial-panel" style={{ borderTop: '4px solid #35D6C5' }}>
              <div className="font-mono text-teal" style={{ fontSize: '14px', letterSpacing: '0.1em', marginBottom: 16 }}>
                RESEARCH ADVANTAGES (SECTION 6.2)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {PAPER_DATA.advantages.map((adv, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <CheckCircle2 size={18} className="text-teal" style={{ flexShrink: 0, marginTop: 4 }} />
                    <span style={{ fontSize: '16px', color: '#F5F0E8', lineHeight: 1.5 }}>
                      {adv}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Limitations */}
            <div className="editorial-panel" style={{ borderTop: '4px solid #E87963' }}>
              <div className="font-mono text-coral" style={{ fontSize: '14px', letterSpacing: '0.1em', marginBottom: 16 }}>
                RESEARCH LIMITATIONS (SECTION 6.3)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {PAPER_DATA.limitations.map((lim, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span className="font-mono text-coral" style={{ fontWeight: 600, marginTop: 2 }}>
                      !
                    </span>
                    <span style={{ fontSize: '16px', color: '#F5F0E8', lineHeight: 1.5 }}>
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
          SCENE 20 — DISCUSSION
          ================================================================ */}
      <section className="film-section">
        <div className="film-container">
          <div className="font-mono text-teal" style={{ fontSize: '14px', letterSpacing: '0.18em', marginBottom: 16 }}>
            20 / 23 · SECTION 6.4: DISCUSSION
          </div>
          <h2 className="font-serif text-ivory" style={{ fontSize: 'var(--text-title)', fontWeight: 500, marginBottom: 28 }}>
            The Core DAA Principle: Design Trade-offs
          </h2>

          <div
            className="editorial-panel"
            style={{
              padding: 'clamp(28px, 4vw, 48px)',
              borderLeft: '4px solid #35D6C5',
            }}
          >
            <p style={{ fontSize: 'var(--text-body)', color: '#F5F0E8', lineHeight: 1.8 }}>
              "{PAPER_DATA.discussion}"
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
          SCENE 21 — FUTURE SCOPE
          ================================================================ */}
      <section className="film-section">
        <div className="film-container">
          <div className="font-mono text-coral" style={{ fontSize: '14px', letterSpacing: '0.18em', marginBottom: 16 }}>
            21 / 23 · SECTION 6.5: FUTURE SCOPE
          </div>
          <h2 className="font-serif text-ivory" style={{ fontSize: 'var(--text-title)', fontWeight: 500, marginBottom: 28 }}>
            Five Verified Avenues for Future Work
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {PAPER_DATA.futureScope.map((scope, idx) => (
              <div
                key={idx}
                className="editorial-panel"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 18,
                  padding: '16px 24px',
                }}
              >
                <span className="font-mono text-coral" style={{ fontSize: '16px', fontWeight: 600 }}>
                  0{idx + 1}
                </span>
                <span style={{ fontSize: '17px', color: '#F5F0E8' }}>
                  {scope}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SCENE 22 — CONCLUSION & RETURN TO T(n)
          ================================================================ */}
      <section className="film-section">
        <div className="film-container" style={{ textAlign: 'center' }}>
          <div className="font-mono text-teal" style={{ fontSize: '14px', letterSpacing: '0.18em', marginBottom: 16 }}>
            22 / 23 · SECTION 7: CONCLUSION
          </div>
          <h2
            className="font-serif text-ivory"
            style={{ fontSize: 'var(--text-title)', fontWeight: 500, marginBottom: 24 }}
          >
            Synthesis of Recursive Analysis
          </h2>

          <p
            style={{
              fontSize: 'var(--text-body)',
              color: '#F5F0E8',
              maxWidth: '840px',
              margin: '0 auto 36px',
              lineHeight: 1.75,
            }}
          >
            {PAPER_DATA.conclusion.summary}
          </p>

          <div
            className="editorial-panel"
            style={{
              maxWidth: '750px',
              margin: '0 auto 40px',
              padding: '36px',
              border: '1px solid rgba(53, 214, 197, 0.3)',
            }}
          >
            <div
              className="font-mono teal-glow text-teal"
              style={{
                fontSize: 'clamp(36px, 5vw, 64px)',
                fontWeight: 600,
                marginBottom: 16,
              }}
            >
              T(n)
            </div>
            <p style={{ fontSize: '18px', color: '#F5F0E8', lineHeight: 1.6 }}>
              {PAPER_DATA.conclusion.keyFinding}
            </p>
            <div
              className="font-mono text-coral"
              style={{ fontSize: '15px', marginTop: 16, letterSpacing: '0.05em' }}
            >
              {PAPER_DATA.conclusion.closingStatement}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SCENE 23 — BIBLIOGRAPHY
          ================================================================ */}
      <section className="film-section" style={{ borderBottom: 'none', paddingBottom: '120px' }}>
        <div className="film-container">
          <div className="font-mono text-lavender" style={{ fontSize: '14px', letterSpacing: '0.18em', marginBottom: 16 }}>
            23 / 23 · SECTION 8: BIBLIOGRAPHY
          </div>
          <h2 className="font-serif text-ivory" style={{ fontSize: 'var(--text-title)', fontWeight: 500, marginBottom: 32 }}>
            Authoritative References
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: '960px' }}>
            {PAPER_DATA.bibliography.map(ref => (
              <div
                key={ref.id}
                className="editorial-panel"
                style={{
                  display: 'flex',
                  gap: 18,
                  padding: '16px 24px',
                  alignItems: 'flex-start',
                }}
              >
                <span className="font-mono text-teal" style={{ fontSize: '16px', fontWeight: 600, minWidth: '32px' }}>
                  [{ref.id}]
                </span>
                <span style={{ fontSize: '16px', color: '#F5F0E8', lineHeight: 1.6 }}>
                  {ref.citation}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 64,
              paddingTop: 32,
              borderTop: '1px solid rgba(155, 142, 170, 0.15)',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <div>
              <div className="font-mono text-teal" style={{ fontSize: '14px' }}>
                MATHEMATICAL ANALYSIS OF RECURSIVE ALGORITHMS
              </div>
              <div style={{ fontSize: '14px', color: '#9B8EAA', marginTop: 2 }}>
                Khan Umar Abdulaziz · Roll No. 45 · R.P. Institute of Hospitality & Management
              </div>
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-mono text-lavender"
              style={{
                fontSize: '13px',
                padding: '8px 16px',
                border: '1px solid rgba(155, 142, 170, 0.2)',
                borderRadius: 20,
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
