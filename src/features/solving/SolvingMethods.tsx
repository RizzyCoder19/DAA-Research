import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { research } from '../../content/research'

// Which equation terms to emphasize per method
const emphasis: Record<string, string[]> = {
  tree:         ['a', 'T(n/b)'],
  substitution: ['T(n)', 'T(n/b)', 'f(n)'],
  standard:     ['T(n)', 'a', 'f(n)'],
}

// Method-specific visual descriptions (source-faithful)
const methodVisual: Record<string, { focus: string; hint: string }> = {
  tree: {
    focus: 'a · T(n/b)',
    hint: 'Draw the recursion tree. Sum work at each level. Identify dominant levels.',
  },
  substitution: {
    focus: 'T(n), T(n/b), f(n)',
    hint: 'Guess a bound. Substitute it into the recurrence. Verify it holds algebraically.',
  },
  standard: {
    focus: 'T(n), a, f(n)',
    hint: 'Match the recurrence to a known form. Apply the corresponding standard result.',
  },
}

export function SolvingMethods({
  activeMethod,
  onSelect,
}: {
  activeMethod: string
  onSelect: (id: string) => void
}) {
  const stageRef = useRef<HTMLDivElement>(null)
  const prevMethod = useRef(activeMethod)

  const method = research.methods.find((m) => m.id === activeMethod) ?? research.methods[0]
  const active = emphasis[method.id] ?? []
  const visual = methodVisual[method.id]

  // Animate explanation when method changes
  useEffect(() => {
    if (prevMethod.current === activeMethod) return
    prevMethod.current = activeMethod
    if (!stageRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // Equation terms re-animate
      gsap.fromTo('.method-equation span',
        { y: 8, autoAlpha: 0.4 },
        { y: 0, autoAlpha: 1, stagger: 0.06, duration: 0.45, ease: 'power2.out' }
      )
      // Explanation sweeps in from side
      gsap.fromTo('.method-explanation',
        { x: 20, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out' }
      )
    }, stageRef)

    return () => ctx.revert()
  }, [activeMethod])

  return (
    <div className={`methods-experience method-${method.id}`} ref={stageRef}>
      {/* METHOD SELECTOR TABS */}
      <div className="method-tabs" role="group" aria-label="Analysis method">
        {research.methods.map((item) => (
          <button
            key={item.id}
            aria-pressed={activeMethod === item.id}
            className={activeMethod === item.id ? 'selected' : ''}
            onClick={() => onSelect(item.id)}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* METHOD STAGE: EQUATION + EXPLANATION */}
      <div className="method-stage" aria-live="polite">
        {/* The equation — terms illuminate based on selected method */}
        <div
          className="method-equation"
          aria-label="T of n equals a times T of n over b plus f of n"
        >
          <span className={active.includes('T(n)') ? 'emphasized' : ''}>T(n)</span>
          <i>=</i>
          <span className={active.includes('a') ? 'emphasized' : ''}>a</span>
          <span className={active.includes('T(n/b)') ? 'emphasized' : ''}>T(n/b)</span>
          <i>+</i>
          <span className={active.includes('f(n)') ? 'emphasized' : ''}>f(n)</span>
        </div>

        {/* Explanation */}
        <div className="method-explanation">
          <p className="eyebrow">ANALYTICAL PERSPECTIVE</p>
          <h3>{method.name}</h3>
          <p>{method.description}</p>
          {visual && (
            <p style={{ marginTop: 12, color: 'rgba(143,165,179,0.8)', fontSize: 11, lineHeight: 1.7 }}>
              {visual.hint}
            </p>
          )}
          <span>Same recurrence · a different analytical lens</span>
        </div>
      </div>

      <p className="source-note">
        <span>PAPER-ALIGNED</span>
        <i />
        The paper identifies these three methods. No worked example or complexity result is added here.
      </p>
    </div>
  )
}
