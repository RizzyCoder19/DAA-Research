import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { research } from '../../content/research'
import { methodologyStages } from '../../content/experience'
import type { sourceMap } from '../../content/sourceMap'
import type { ReactNode } from 'react'

function ResearchSource({ name, SourceNote }: { name: keyof typeof sourceMap; SourceNote: (props: { name: keyof typeof sourceMap }) => ReactNode }) {
  return <SourceNote name={name} />
}

export function ResearchJourney({ SourceNote }: { SourceNote: (props: { name: keyof typeof sourceMap }) => ReactNode }) {
  const [methodIndex, setMethodIndex] = useState(0)
  return <>
    <section id="research" className="research-scene editorial-scene">
      <div className="scene-index"><span>01</span><i /> RESEARCH RECORD</div>
      <div className="research-layout">
        <div className="research-primary"><p className="eyebrow">THE PAPER · ITS ACTUAL SCOPE</p><h2>{research.title}</h2><p className="research-deck">{research.subtitle}</p><p className="abstract-copy">{research.abstract}</p><ResearchSource name="abstract" SourceNote={SourceNote}/></div>
        <div className="research-record"><div className="record-top"><span>RESEARCH IDENTITY</span><b>PAPER-ALIGNED</b></div>
          <div className="record-name"><small>RESEARCHER</small><strong>{research.researcher}</strong><span>Roll No. {research.rollNumber}</span></div>
          <dl><div><dt>PROGRAM / SEMESTER</dt><dd>{research.course}</dd></div><div><dt>INSTITUTION</dt><dd>{research.institution}</dd></div><div><dt>AFFILIATION</dt><dd>{research.affiliation}</dd></div><div><dt>GUIDE</dt><dd>{research.guide}</dd></div><div><dt>DEPARTMENT HEAD</dt><dd>{research.departmentHead}</dd></div><div><dt>ACADEMIC YEAR</dt><dd>{research.academicYear}</dd></div></dl>
          <ResearchSource name="identity" SourceNote={SourceNote}/>
        </div>
      </div>
      <div className="objective-scene"><div><span className="eyebrow">THE RESEARCH OBJECTIVE</span><p className="objective-statement">{research.objective}</p><ResearchSource name="objectives" SourceNote={SourceNote}/></div><div className="objective-index">01<span>/</span>05</div></div>
      <div className="methodology-scene">
        <div className="methodology-heading"><p className="eyebrow">DESCRIPTIVE · ANALYTICAL · LITERATURE-BASED</p><h3>Method, as presented<br/>in the paper.</h3><p>{research.methodology}</p><ResearchSource name="methodology" SourceNote={SourceNote}/></div>
        <div className="methodology-track" role="group" aria-label="Research methodology stages">{methodologyStages.map((stage,index)=><button aria-pressed={methodIndex===index} className={methodIndex===index?'active':''} key={stage} onClick={()=>setMethodIndex(index)}><span>0{index+1}</span><p>{stage}</p><ArrowRight size={14}/></button>)}</div>
      </div>
    </section>
    <section id="concepts" className="concept-scene editorial-scene">
      <div className="scene-index"><span>02</span><i /> RECURSIVE STRUCTURE</div>
      <div className="concept-layout"><div><p className="eyebrow">A CONCEPTUAL MODEL · NO NAMED ALGORITHM</p><h2>One problem.<br/>Smaller versions<br/><em>of the same problem.</em></h2><p className="concept-intro">{research.abstract.split(' Their running time')[0]}.</p></div>
        <ConceptStepper/>
      </div>
    </section>
  </>
}

function ConceptStepper() {
  const stages = [
    { label: 'PROBLEM', symbol: 'P(n)', detail: 'Begin with a problem represented by an input of size n.' },
    { label: 'REDUCTION', symbol: 'n → n/b', detail: 'The recurrence notation represents each recursive instance with a reduced input size.' },
    { label: 'RECURSIVE INSTANCE', symbol: 'T(n/b)', detail: 'The reduced instance is another instance of the same problem, as described in the paper.' },
  ]
  const [active, setActive] = useState(0)
  return <div className="concept-instrument"><div className="concept-steps">{stages.map((stage,index)=><button key={stage.label} onClick={()=>setActive(index)} className={active===index?'active':''} aria-pressed={active===index}><span>0{index+1}</span><strong>{stage.label}</strong></button>)}</div>
    <div className="concept-object" aria-live="polite"><div className="concept-branch-stem"/><span>{stages[active].symbol}</span><p>{stages[active].detail}</p></div>
    <p className="source-note">Conceptual representation based on the paper’s description of reduction to smaller instances. No algorithm-specific example is introduced.</p>
  </div>
}
