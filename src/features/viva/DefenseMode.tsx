import { useState } from 'react'
import { ArrowLeft, ArrowRight, Eye, EyeOff, PenLine } from 'lucide-react'
import { alignedAnswers, vivaQuestions } from '../../content/viva'
import type { sourceMap } from '../../content/sourceMap'
import type { ReactNode } from 'react'

const answerSources: (keyof typeof sourceMap)[] = ['objectives', 'equation', 'bounds', 'methodology', 'conclusion', 'applications', 'futureScope', 'limitations', 'futureScope', 'conclusion']

export function DefenseMode({ SourceNote }: { SourceNote: (props: { name: keyof typeof sourceMap }) => ReactNode }) {
  const [started, setStarted] = useState(false)
  const [thinking, setThinking] = useState(false)
  const [draft, setDraft] = useState('')
  const [revealed, setRevealed] = useState(false)
  const [index, setIndex] = useState(0)
  const question = vivaQuestions[index]
  const move = (step: number) => {
    setIndex((current) => (current + step + vivaQuestions.length) % vivaQuestions.length)
    setThinking(false); setDraft(''); setRevealed(false)
  }

  if (!started) return <div className="defense-start">
    <span className="eyebrow">TEN PROMPTS · PAPER-ALIGNED ANSWERS</span>
    <h3>Question the work.<br/><em>Know what it claims.</em></h3>
    <p>Prompts come from the viva handout. The research paper determines the answer; the handout’s conflicting wording stays optional and clearly labeled.</p>
    <button className="text-action" onClick={() => setStarted(true)}>Begin defense practice <ArrowRight size={15}/></button>
  </div>

  return <div className="defense-experience">
    <div className="defense-progress-head"><span className="eyebrow">QUESTION {String(index+1).padStart(2,'0')} <i/> {String(vivaQuestions.length).padStart(2,'0')}</span><div className="defense-progress"><i style={{ width: `${((index+1)/vivaQuestions.length)*100}%` }}/></div></div>
    <div className="defense-question-stage"><p className="eyebrow">QUESTION FROM THE VIVA HANDOUT</p><h3>{question.question}</h3>
      {!thinking && !revealed && <button className="text-action" onClick={() => setThinking(true)}><PenLine size={15}/> Think through your response</button>}
    </div>
    {thinking && !revealed && <div className="think-stage"><label htmlFor="defense-draft">YOUR NOTES <span>OPTIONAL · STAYS IN THIS VIEW</span></label><textarea id="defense-draft" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Formulate your answer before revealing the source-aligned response…"/><button className="text-action" onClick={() => setRevealed(true)}><Eye size={15}/> Reveal the research-aligned answer</button></div>}
    {revealed && <div className="defense-answer" aria-live="polite"><div className="answer-header"><span className="eyebrow">ANSWER ALIGNED TO THE RESEARCH PAPER</span><span>PAPER FIRST</span></div><p>{alignedAnswers[index]}</p><SourceNote name={answerSources[index]}/><details className="handout-disclosure"><summary><EyeOff size={14}/> Original viva handout wording <span>OPTIONAL CONTEXT</span></summary><p>{question.answer}</p><small>{question.note}</small></details></div>}
    <div className="defense-navigation">{index > 0 ? <button onClick={() => move(-1)}><ArrowLeft size={14}/> Previous question</button> : <span/>}{(thinking || revealed) && <button className="next-question" onClick={() => move(1)}>{index === vivaQuestions.length - 1 ? 'Review from beginning' : 'Next question'} <ArrowRight size={14}/></button>}</div>
    <p className="defense-integrity">The answer is grounded in the paper. Handout wording is contextual material, not a research finding.</p>
  </div>
}
