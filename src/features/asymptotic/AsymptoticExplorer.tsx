import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { research } from '../../content/research'

export type BoundId = 'O' | 'Omega' | 'Theta'

// Precise definitions from the research paper
const captions: Record<BoundId, { formal: string; visual: string }> = {
  O: {
    formal: 'f(n) = O(g(n)) means there exist positive constants c and n₀ such that 0 ≤ f(n) ≤ c·g(n) for all n ≥ n₀.',
    visual: 'The function T(n) stays at or below the comparison bound beyond some threshold. The bound provides an asymptotic ceiling.',
  },
  Omega: {
    formal: 'f(n) = Ω(g(n)) means there exist positive constants c and n₀ such that 0 ≤ c·g(n) ≤ f(n) for all n ≥ n₀.',
    visual: 'The function T(n) stays at or above the comparison bound beyond some threshold. The bound provides an asymptotic floor.',
  },
  Theta: {
    formal: 'f(n) = Θ(g(n)) means f(n) = O(g(n)) and f(n) = Ω(g(n)) simultaneously.',
    visual: 'The function T(n) is sandwiched between the upper and lower bounds — they match in asymptotic growth rate.',
  },
}

const notationSymbols: Record<BoundId, string> = {
  O: 'O(f)',
  Omega: 'Ω(f)',
  Theta: 'Θ(f)',
}

const notationNames: Record<BoundId, string> = {
  O: 'Upper bound',
  Omega: 'Lower bound',
  Theta: 'Tight bound',
}

// SVG curve path data for three scenario curves
const CURVES = {
  reference: 'M64 196 C130 185 175 162 240 142 S348 108 405 82 S510 48 598 30 S690 16 756 10',
  upper: 'M64 182 C128 168 178 142 243 118 S355 84 412 56 S516 24 598 14 S690 6 756 4',
  lower: 'M64 212 C128 203 176 183 241 165 S352 134 410 112 S508 82 598 62 S688 42 756 36',
}

export function AsymptoticExplorer({
  selected,
  onSelect,
}: {
  selected: BoundId
  onSelect: (id: BoundId) => void
}) {
  const svgRef = useRef<SVGSVGElement>(null)
  const prevSelected = useRef(selected)
  const bound = research.bounds.find((b) => b.id === selected) ?? research.bounds[0]

  // Animate curves when bound changes
  useEffect(() => {
    if (!svgRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (prevSelected.current === selected) return
    prevSelected.current = selected

    const ctx = gsap.context(() => {
      // Reference curve always visible — pulse
      gsap.fromTo('.curve-reference',
        { strokeDashoffset: 300 },
        { strokeDashoffset: 0, duration: 0.9, ease: 'power2.out' }
      )

      // Upper bound
      if (selected !== 'Omega') {
        gsap.fromTo('.curve-upper',
          { autoAlpha: 0, strokeDashoffset: 400 },
          { autoAlpha: 1, strokeDashoffset: 0, duration: 1.1, ease: 'power2.out' }
        )
      } else {
        gsap.to('.curve-upper', { autoAlpha: 0, duration: 0.4, ease: 'power2.in' })
      }

      // Lower bound
      if (selected !== 'O') {
        gsap.fromTo('.curve-lower',
          { autoAlpha: 0, strokeDashoffset: 400 },
          { autoAlpha: 1, strokeDashoffset: 0, duration: 1.1, ease: 'power2.out', delay: 0.1 }
        )
      } else {
        gsap.to('.curve-lower', { autoAlpha: 0, duration: 0.4, ease: 'power2.in' })
      }

      // Notation animates in
      gsap.fromTo('.bound-notation > span',
        { scale: 0.75, autoAlpha: 0, transformOrigin: 'bottom left' },
        { scale: 1, autoAlpha: 1, duration: 0.7, ease: 'back.out(1.5)' }
      )

      gsap.fromTo(['.bound-notation h3', '.bound-notation p'],
        { y: 14, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.55, ease: 'power3.out' }
      )
    }, svgRef)

    return () => ctx.revert()
  }, [selected])

  // Set up dash arrays for animation on mount
  useEffect(() => {
    if (!svgRef.current) return
    const paths = svgRef.current.querySelectorAll('.animated-curve')
    paths.forEach((p) => {
      const len = (p as SVGPathElement).getTotalLength()
      ;(p as SVGPathElement).style.strokeDasharray = String(len)
      ;(p as SVGPathElement).style.strokeDashoffset = '0'
    })
  }, [])

  return (
    <div className={`asymptotic-field bound-${selected}`}>
      {/* Selector */}
      <div className="bound-selector" role="group" aria-label="Select asymptotic bound">
        {(research.bounds as readonly { id: string; symbol: string; name: string; description: string }[]).map((item) => (
          <button
            key={item.id}
            aria-pressed={selected === item.id}
            className={selected === item.id ? 'selected' : ''}
            onClick={() => onSelect(item.id as BoundId)}
          >
            {item.symbol}
          </button>
        ))}
      </div>

      <div className={`bound-stage`} aria-live="polite">
        {/* SVG Diagram */}
        <svg
          ref={svgRef}
          viewBox="0 0 820 246"
          role="img"
          aria-label={`Conceptual asymptotic diagram showing ${notationNames[selected]}. Not measured data.`}
        >
          {/* Axes */}
          <path className="bound-axis" d="M64 22 V228 H782" />

          {/* Axis labels */}
          <text x="790" y="232" style={{ fill: 'rgba(197,201,203,0.5)', font: '10px var(--mono)' }}>n →</text>
          <text x="44" y="16" style={{ fill: 'rgba(197,201,203,0.5)', font: '9px var(--mono)', textAnchor: 'middle' }}>T</text>

          {/* Threshold marker n₀ */}
          <line x1="220" y1="24" x2="220" y2="226" stroke="rgba(197,201,203,0.15)" strokeWidth="1" strokeDasharray="4 4" />
          <text x="222" y="218" style={{ fill: 'rgba(197,201,203,0.35)', font: '9px var(--mono)' }}>n₀</text>

          {/* Reference curve (T(n)) — always visible */}
          <path
            className="bound-curve curve-reference animated-curve"
            d={CURVES.reference}
          />
          <text x="682" y="22" style={{ fill: 'rgba(143,211,232,0.8)', font: '9px var(--mono)' }}>T(n)</text>

          {/* Upper bound (O) */}
          {selected !== 'Omega' && (
            <path
              className="bound-curve curve-upper animated-curve"
              d={CURVES.upper}
            />
          )}
          {selected !== 'Omega' && (
            <text x="668" y="8" style={{ fill: 'rgba(228,209,165,0.8)', font: '9px var(--mono)' }}>c·g(n)</text>
          )}

          {/* Lower bound (Ω) */}
          {selected !== 'O' && (
            <path
              className="bound-curve curve-lower animated-curve"
              d={CURVES.lower}
            />
          )}
          {selected !== 'O' && (
            <text x="668" y="48" style={{ fill: 'rgba(122,155,176,0.8)', font: '9px var(--mono)' }}>c·g(n)</text>
          )}

          {/* Theta shading between bounds */}
          {selected === 'Theta' && (
            <path
              d={`${CURVES.upper} L756 36 ${CURVES.lower.split(' ').reverse().join(' ')}`}
              fill="rgba(197,161,91,0.08)"
              stroke="none"
            />
          )}
        </svg>

        {/* Notation panel — the big symbol */}
        <div className="bound-notation">
          <span aria-label={`${notationNames[selected]} notation`}>
            {notationSymbols[selected]}
          </span>
          <div>
            <h3>{notationNames[selected]}</h3>
            <p>{captions[selected].formal}</p>
            <p style={{ marginTop: 8, fontSize: 11, color: 'rgba(143,155,165,0.85)' }}>
              {captions[selected].visual}
            </p>
          </div>
        </div>
      </div>

      <p className="source-note" style={{ marginTop: 12 }}>
        <span>PAPER-ALIGNED</span>
        <i />
        Conceptual diagram only · asymptotic bounds describe growth, not algorithm-specific measured values
      </p>
    </div>
  )
}
