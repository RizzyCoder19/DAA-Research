import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { research } from '../../content/research'
import type { sourceMap } from '../../content/sourceMap'
import type { ReactNode } from 'react'

type SourceNoteFn = (props: { name: keyof typeof sourceMap }) => ReactNode

export function ContextScenes({ SourceNote }: { SourceNote: SourceNoteFn }) {
  const [selectedDomain, setSelectedDomain] = useState(0)
  return <>
    <section id="applications" className="applications-scene editorial-scene">
      <div className="scene-index"><span>08</span><i /> RESEARCH CONTEXT</div>
      <div className="context-title-row"><div><p className="eyebrow">DOMAINS LISTED IN THE PAPER</p><h2>Where the concepts<br/>may be <em>relevant.</em></h2></div><p>The paper identifies these application areas for recursive-algorithm analysis. This study does not claim to have implemented them.</p></div>
      <div className="application-instrument"><div className="application-list" role="group" aria-label="Application areas">{research.applications.map((domain,index)=><button aria-pressed={selectedDomain===index} className={selectedDomain===index?'active':''} key={domain} onClick={()=>setSelectedDomain(index)}><span>{String(index+1).padStart(2,'0')}</span>{domain}<ArrowUpRight size={14}/></button>)}</div><div className="application-readout" aria-live="polite"><span className="eyebrow">SOURCE-LISTED DOMAIN · {String(selectedDomain+1).padStart(2,'0')}</span><strong>{research.applications[selectedDomain]}</strong><p>A domain named in the research paper’s applications section.</p><SourceNote name="applications"/></div></div>
    </section>
    <section id="limitations" className="limitations-scene editorial-scene">
      <div className="scene-index"><span>09</span><i /> REFLECTION & LIMITS</div>
      <div className="limits-head"><p className="eyebrow">THE PAPER’S QUALIFICATIONS</p><h2>What the analysis<br/><em>does not capture.</em></h2><p className="limits-intro">{research.contribution}</p></div>
      <div className="limits-list">{research.limitations.map((item,index)=><div key={item}><span>0{index+1}</span><p>{item}</p><ArrowUpRight size={15}/></div>)}</div>
      <div className="research-boundary"><div><span className="eyebrow">WHAT THE PAPER DOES</span><p>{research.contribution}</p></div><div><span className="eyebrow">WHAT IT DOES NOT REPORT</span><ul><li>A newly proposed algorithm</li><li>A hardware benchmark</li><li>A measured performance improvement</li></ul></div><SourceNote name="limitations"/></div>
    </section>
    <section id="future" className="future-scene editorial-scene">
      <div className="scene-index"><span>10</span><i /> OPEN DIRECTIONS</div>
      <div className="future-title"><p className="eyebrow">FUTURE SCOPE · PROPOSED, NOT COMPLETED</p><h2>Next steps named<br/>by <em>the paper.</em></h2></div>
      <div className="future-ledger">{research.futureScope.map((item,index)=><div key={item}><span>0{index+1}</span><p>{item}</p><i>PROPOSED</i></div>)}</div>
      <SourceNote name="futureScope"/>
    </section>
    <section id="about" className="about-scene editorial-scene">
      <div className="scene-index"><span>12</span><i /> SOURCE RECORD</div>
      <div className="about-layout"><div><p className="eyebrow">CONCLUSION</p><h2>Analysis as a<br/><em>common language.</em></h2><p className="about-conclusion">{research.conclusion}</p><SourceNote name="conclusion"/><div className="advantages-ledger"><span className="eyebrow">ADVANTAGES DESCRIBED IN THE PAPER</span>{research.advantages.map((item,index)=><p key={item}><b>0{index+1}</b>{item}</p>)}<SourceNote name="advantages"/></div></div>
        <div className="bibliography"><span className="eyebrow">BIBLIOGRAPHY · AS PROVIDED</span>{research.references.map((item,index)=><div key={item}><span>0{index+1}</span><p>{item}</p></div>)}<SourceNote name="references"/></div></div>
      <footer className="final-footer"><span>MATHEMATICAL ANALYSIS OF RECURSIVE ALGORITHMS</span><span>{research.researcher} · {research.academicYear}</span><a href="#home">RETURN TO BEGINNING ↑</a></footer>
    </section>
  </>
}
