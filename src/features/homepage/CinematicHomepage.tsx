import { useEffect, useMemo, useRef, useState } from 'react'
import { hierarchy, tree } from 'd3-hierarchy'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDownRight, ArrowRight, Waypoints } from 'lucide-react'
import { research } from '../../content/research'
import { createRecursionTree } from '../../content/recursionTree'

gsap.registerPlugin(ScrollTrigger)

// The interactive live recursion tree on the hero
function HeroRecursionStructure() {
  const [a, setA] = useState(2)
  const svgRef = useRef<SVGSVGElement>(null)

  const model = useMemo(() => {
    const root = hierarchy(createRecursionTree(a, 3))
    tree().size([480, 390])(root)
    return { links: root.links(), nodes: root.descendants() }
  }, [a])

  // Animate nodes when 'a' changes
  useEffect(() => {
    if (!svgRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-structure-links path',
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.4, stagger: 0.04, ease: 'power2.out' }
      )
      gsap.fromTo('.hero-structure-nodes circle',
        { scale: 0.3, autoAlpha: 0, transformBox: 'fill-box', transformOrigin: 'center' },
        { scale: 1, autoAlpha: 1, duration: 0.38, stagger: 0.05, ease: 'back.out(1.4)' }
      )
    }, svgRef)

    return () => ctx.revert()
  }, [a])

  return (
    <div className="home-tree-instrument">
      <svg
        ref={svgRef}
        className="home-branch-diagram"
        viewBox="0 0 520 450"
        role="img"
        aria-label={`Conceptual recursion tree with branching factor ${a}. ILLUSTRATIVE MODEL.`}
      >
        <g className="hero-structure-links">
          {model.links.map((link) => (
            <path
              key={link.target.data.path}
              d={`M${link.source.x + 20} ${link.source.y + 23} C${link.source.x + 20} ${link.target.y} ${link.target.x + 20} ${link.target.y} ${link.target.x + 20} ${link.target.y + 23}`}
            />
          ))}
        </g>
        <g className="hero-structure-nodes">
          {model.nodes.map((node) => (
            <g
              key={node.data.path}
              transform={`translate(${node.x + 20},${node.y + 23})`}
            >
              <circle r={node.depth === 0 ? 9 : Math.max(4, 8 - node.depth)} />
              {node.depth === 0 && <text textAnchor="middle" dy="4">T(n)</text>}
            </g>
          ))}
        </g>
      </svg>

      <div className="home-tree-controls" role="group" aria-label="Change illustrative branching factor">
        <span>ILLUSTRATIVE BRANCHING</span>
        {([2, 3] as const).map((count) => (
          <button
            key={count}
            aria-pressed={a === count}
            className={a === count ? 'active' : ''}
            onClick={() => setA(count)}
          >
            a = {count}
          </button>
        ))}
      </div>
    </div>
  )
}

export function CinematicHomepage() {
  const sectionRef = useRef<HTMLElement>(null)

  // Scroll-driven: animate the hero content on load
  useEffect(() => {
    if (!sectionRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // Staggered reveal of hero content
      const homeContent = sectionRef.current!.querySelector('.home-content')
      if (homeContent) {
        const children = homeContent.querySelectorAll<HTMLElement>(
          '.eyebrow, h1, .home-subtitle, .home-actions, .home-identity'
        )
        gsap.fromTo(children,
          { y: 32, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.12,
            duration: 0.85,
            ease: 'power3.out',
            delay: 0.2,
          }
        )
      }

      // Math visual orbits animate in
      gsap.fromTo('.math-orbit',
        { scale: 0.7, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, stagger: 0.2, duration: 1.2, ease: 'power2.out', delay: 0.5 }
      )

      // The labels float in
      gsap.fromTo('.home-math-label',
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, stagger: 0.15, duration: 0.7, ease: 'power2.out', delay: 1 }
      )

      gsap.fromTo('.home-equation-mark',
        { autoAlpha: 0, x: 12 },
        { autoAlpha: 1, x: 0, duration: 0.8, ease: 'power2.out', delay: 1.2 }
      )

      // Footline
      gsap.fromTo('.home-footline',
        { autoAlpha: 0, y: 8 },
        { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 1.5 }
      )

      // ScrollTrigger: tree responds to scroll — subtle parallax
      gsap.to('.home-math-visual', {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      })

      // The grid lines rotate slightly on scroll
      gsap.to('.home-grid-lines', {
        rotation: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="home" className="home-scene" ref={sectionRef}>
      <div className="home-grid-lines" aria-hidden="true" />

      {/* Right side: mathematical tree visualization */}
      <div className="home-math-visual" aria-hidden="true">
        <div className="math-orbit orbit-a" />
        <div className="math-orbit orbit-b" />
        <HeroRecursionStructure />
        <div className="home-math-label label-left">T(n/b)</div>
        <div className="home-math-label label-right">a recursive instances</div>
        <div className="home-equation-mark">T(n) = aT(n/b) + f(n)</div>
      </div>

      {/* Left side: content */}
      <div className="home-content">
        <p className="eyebrow">
          <span className="signal-live" aria-hidden="true" />
          MATHEMATICAL RESEARCH EXPERIENCE
          <span className="eyebrow-divider" aria-hidden="true" />
        </p>
        <h1>
          Mathematical<br />
          Analysis of<br />
          <em>Recursive Algorithms</em>
        </h1>
        <p className="home-subtitle">{research.subtitle}</p>
        <div className="home-actions">
          <a className="hero-cta" href="#research">
            Explore the research <ArrowRight size={15} />
          </a>
          <a className="hero-secondary" href="#tree">
            <Waypoints size={15} /> Enter visualizer
          </a>
          <a className="hero-tertiary" href="#defense">
            Defense mode <ArrowDownRight size={13} />
          </a>
        </div>
        <div className="home-identity">
          <span>{research.researcher}</span>
          <i aria-hidden="true" />
          <span>{research.course}</span>
          <i aria-hidden="true" />
          <span>{research.academicYear}</span>
        </div>
      </div>

      <div className="home-footline" aria-hidden="true">
        <span>RECURSION → RECURRENCE → ANALYSIS</span>
        <a href="#research">BEGIN THE RESEARCH JOURNEY <ArrowDownRight size={13} /></a>
      </div>

      <div className="home-side-notation" aria-hidden="true">
        <span>R</span>
        <span>01 / 12</span>
      </div>
    </section>
  )
}
