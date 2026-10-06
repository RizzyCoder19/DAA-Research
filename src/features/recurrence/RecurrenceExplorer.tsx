import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { research } from '../../content/research'
import type { sourceMap } from '../../content/sourceMap'

export type RecurrenceTerm = 'tn' | 'a' | 'nb' | 'fn'

const termContent: Record<RecurrenceTerm, { heading: string; detail: string; treeConnection: string }> = {
  tn: {
    heading: 'T(n) — running time',
    detail: research.equationTerms[0].description,
    treeConnection: 'The complete tree represents this recurrence. Every node is a recursive instance of T(n) with a smaller input.',
  },
  a: {
    heading: 'a — recursive multiplier',
    detail: research.equationTerms[1].description,
    treeConnection: 'Each node branches into exactly a children. The branching factor determines how rapidly the number of subproblems grows at each level.',
  },
  nb: {
    heading: 'n/b — reduced input',
    detail: research.equationTerms[2].description,
    treeConnection: 'At each successive level, the input size is divided by b. The notation n/b^k labels the size at level k of the recursion tree.',
  },
  fn: {
    heading: 'f(n) — non-recursive work',
    detail: research.equationTerms[3].description,
    treeConnection: 'At each level, non-recursive work is performed alongside the recursive calls. The total work across all levels determines the overall complexity.',
  },
}

const termSymbols: Record<RecurrenceTerm, string> = {
  tn: 'T(n)',
  a: 'a',
  nb: 'T(n/b)',
  fn: 'f(n)',
}

export function RecurrenceExplorer({
  activeTerm,
  onSelect,
  SourceNote,
}: {
  activeTerm: RecurrenceTerm
  onSelect: (term: RecurrenceTerm) => void
  SourceNote: (props: { name: keyof typeof sourceMap }) => React.ReactNode
}) {
  const inspectorRef = useRef<HTMLDivElement>(null)
  const prevTerm = useRef(activeTerm)

  // Animate the inspector panel when term changes
  useEffect(() => {
    if (prevTerm.current === activeTerm) return
    prevTerm.current = activeTerm
    if (!inspectorRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ['.recurrence-inspector h3', '.recurrence-inspector p:not(.source-note)', '.recurrence-inspector .term-link'],
        { y: 14, autoAlpha: 0, filter: 'blur(3px)' },
        { y: 0, autoAlpha: 1, filter: 'blur(0px)', stagger: 0.1, duration: 0.55, ease: 'power3.out' }
      )
    }, inspectorRef)

    return () => ctx.revert()
  }, [activeTerm])

  const content = termContent[activeTerm]

  return (
    <div className="recurrence-scene-content">
      {/* THE BIG EQUATION — central visual object */}
      <div
        className="recurrence-equation"
        role="group"
        aria-label="Select a recurrence term to inspect its meaning"
      >
        <button
          className={activeTerm === 'tn' ? 'term-active' : ''}
          onClick={() => onSelect('tn')}
          aria-pressed={activeTerm === 'tn'}
          aria-label="T of n — running time"
        >
          T(n)
        </button>

        <span className="equation-equals" aria-hidden="true">=</span>

        <button
          className={activeTerm === 'a' ? 'term-active' : ''}
          onClick={() => onSelect('a')}
          aria-pressed={activeTerm === 'a'}
          aria-label="a — recursive multiplier"
        >
          a
        </button>

        <button
          className={activeTerm === 'nb' ? 'term-active' : ''}
          onClick={() => onSelect('nb')}
          aria-pressed={activeTerm === 'nb'}
          aria-label="T of n over b — reduced input"
        >
          T(n/b)
        </button>

        <span className="equation-plus" aria-hidden="true">+</span>

        <button
          className={activeTerm === 'fn' ? 'term-active' : ''}
          onClick={() => onSelect('fn')}
          aria-pressed={activeTerm === 'fn'}
          aria-label="f of n — non-recursive work"
        >
          f(n)
        </button>
      </div>

      {/* INSPECTOR — responds to selected term */}
      <div
        className={`recurrence-inspector term-highlighted`}
        ref={inspectorRef}
        aria-live="polite"
        aria-label="Term inspection panel"
      >
        <span className="eyebrow">TERM INSPECTOR · {termSymbols[activeTerm]}</span>
        <h3>{content.heading}</h3>
        <p>{content.detail}</p>
        <p className="term-link">{content.treeConnection}</p>
        <SourceNote name="equation" />
      </div>
    </div>
  )
}
