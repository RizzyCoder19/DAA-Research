import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { methodologyStages } from '../../content/experience'
import { research } from '../../content/research'

gsap.registerPlugin(ScrollTrigger)

const stages = [
  { title: 'Recursive structure', detail: 'A problem is reduced to smaller instances of the same problem.' },
  { title: 'Recurrence', detail: research.equation },
  { title: 'Dominant operations', detail: methodologyStages[3] },
  { title: 'Asymptotic analysis', detail: methodologyStages[4] },
]

export function ComplexityJourney() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const triggers: ScrollTrigger[] = []
    gsap.utils.toArray<HTMLElement>('.journey-stage').forEach((element, index) => {
      triggers.push(ScrollTrigger.create({
        trigger: element,
        start: 'top 68%',
        end: 'bottom 48%',
        onEnter: () => setActive(index),
        onEnterBack: () => setActive(index),
      }))
    })
    return () => triggers.forEach((trigger) => trigger.kill())
  }, [])
  return <div className="complexity-journey">
    <div className="journey-rail" aria-hidden="true"><span style={{ height: `${((active + 1) / stages.length) * 100}%` }} /></div>
    <div className="journey-copy" aria-live="polite"><p className="eyebrow">STAGE {String(active + 1).padStart(2, '0')} / 04</p><h3>{stages[active].title}</h3><p>{stages[active].detail}</p></div>
    <div className="journey-stages">{stages.map((stage, index) => <div className={`journey-stage ${active === index ? 'is-active' : ''}`} key={stage.title} data-stage={index}>
      <span>0{index + 1}</span><strong>{stage.title}</strong><i>{active === index ? 'ACTIVE' : 'SCROLL TO EXPLORE'}</i>
    </div>)}</div>
    <p className="complexity-caveat">There is no single time complexity for recursive algorithms as a whole. The recurrence and its analysis depend on the recursive structure being considered.</p>
  </div>
}

export function CallStackExperience() {
  const [depth, setDepth] = useState(3)
  const [unwinding, setUnwinding] = useState(false)
  const frames = Array.from({ length: depth }, (_, index) => index)
  return <div className={`callstack-experience ${unwinding ? 'unwinding' : ''}`}>
    <div className="stack-controls"><button onClick={() => { setDepth((value) => Math.min(value + 1, 5)); setUnwinding(false) }}>Make a recursive call <span>+</span></button><button onClick={() => { setDepth((value) => Math.max(value - 1, 1)); setUnwinding(true) }}>Return one call <span>−</span></button><button className="reset-stack" onClick={() => { setDepth(3); setUnwinding(false) }}>Reset</button></div>
    <div className="stack-stage" aria-live="polite" aria-label={`Illustrative recursive call stack, ${depth} active frames`}>
      {frames.map((level, index) => <div className={`stack-frame ${index === frames.length - 1 ? 'current-frame' : ''}`} key={level} style={{ '--frame-index': index } as React.CSSProperties}><span>CALL {String(index + 1).padStart(2, '0')}</span><strong>{level === 0 ? 'T(n)' : `T(n / b^${level})`}</strong><small>{index === frames.length - 1 ? 'CURRENT FRAME' : 'WAITING'}</small></div>)}
    </div>
    <div className="stack-readout"><span>Illustrative active frames <b>{depth}</b></span><span>Each frame waits while a smaller instance is considered.</span></div>
    <div className="space-notes"><div><span className="eyebrow">RECURSION-STACK SPACE</span><p>Space used by active recursive calls, represented here as a conceptual stack.</p></div><div><span className="eyebrow">AUXILIARY SPACE</span><p>The paper discusses space requirements; it does not assign one numerical bound to recursive algorithms as a whole.</p></div></div>
    <p className="source-note">Illustrative stack state only · frame count is an interaction setting, not a measured research result.</p>
  </div>
}
