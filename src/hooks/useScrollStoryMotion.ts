import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollStoryMotion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const scope = document.querySelector('.experience-main')
    if (!scope) return

    const ctx = gsap.context(() => {
      // ═══════════════════════════════════════════════════
      // SCENE INDEX NUMBERS — dramatic scale entrance
      // ═══════════════════════════════════════════════════
      gsap.utils.toArray<HTMLElement>('.scene-index').forEach((el) => {
        const num = el.querySelector<HTMLElement>('span')
        if (num) {
          gsap.fromTo(num,
            { x: -24, autoAlpha: 0 },
            {
              x: 0,
              autoAlpha: 1,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                end: 'top 54%',
                scrub: 0.6,
              },
            }
          )
        }
      })

      // ═══════════════════════════════════════════════════
      // EDITORIAL SCENE HEADINGS — large type sweeps in
      // ═══════════════════════════════════════════════════
      gsap.utils.toArray<HTMLElement>('.editorial-scene h2').forEach((el) => {
        gsap.fromTo(el,
          { y: 48, autoAlpha: 0.4, filter: 'blur(3px)' },
          {
            y: 0,
            autoAlpha: 1,
            filter: 'blur(0px)',
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 86%',
              end: 'top 46%',
              scrub: 0.8,
            },
          }
        )
      })

      // ═══════════════════════════════════════════════════
      // SECTION LEADS / BODY TEXT — staged fade
      // ═══════════════════════════════════════════════════
      gsap.utils.toArray<HTMLElement>('.section-lead, .abstract-copy, .research-deck').forEach((el) => {
        gsap.fromTo(el,
          { y: 28, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 84%',
              end: 'top 52%',
              scrub: 0.5,
            },
          }
        )
      })

      // ═══════════════════════════════════════════════════
      // RECURRENCE EQUATION — the BIG interactive equation
      // Makes the equation scale UP dramatically as it enters
      // ═══════════════════════════════════════════════════
      const recurrenceEq = document.querySelector('.recurrence-equation')
      if (recurrenceEq) {
        gsap.fromTo(recurrenceEq,
          { scale: 0.82, autoAlpha: 0, transformOrigin: 'left center' },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: recurrenceEq,
              start: 'top 80%',
              end: 'top 40%',
              scrub: 0.9,
            },
          }
        )
      }

      // ═══════════════════════════════════════════════════
      // TREE STAGE — slides in from below
      // ═══════════════════════════════════════════════════
      const treeStage = document.querySelector('.tree-stage')
      if (treeStage) {
        gsap.fromTo(treeStage,
          { y: 60, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: treeStage,
              start: 'top 84%',
              end: 'top 44%',
              scrub: 0.8,
            },
          }
        )
      }

      // ═══════════════════════════════════════════════════
      // METHOD EQUATION — the central equation in solving
      // Terms illuminate as they scroll into view
      // ═══════════════════════════════════════════════════
      const methodEq = document.querySelector('.method-equation')
      if (methodEq) {
        gsap.fromTo(methodEq,
          { x: -40, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: methodEq,
              start: 'top 80%',
              end: 'top 42%',
              scrub: 0.7,
            },
          }
        )
      }

      // ═══════════════════════════════════════════════════
      // ASYMPTOTIC NOTATION — the giant O Ω Θ symbols
      // ═══════════════════════════════════════════════════
      const boundNotation = document.querySelector('.bound-notation')
      if (boundNotation) {
        gsap.fromTo(boundNotation,
          { x: 30, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: boundNotation,
              start: 'top 82%',
              end: 'top 44%',
              scrub: 0.6,
            },
          }
        )
      }

      // ═══════════════════════════════════════════════════
      // CALL STACK FRAMES — stagger in from below
      // ═══════════════════════════════════════════════════
      const stackStage = document.querySelector('.stack-stage')
      if (stackStage) {
        gsap.fromTo(stackStage,
          { y: 44, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stackStage,
              start: 'top 82%',
              end: 'top 44%',
              scrub: 0.7,
            },
          }
        )
      }

      // ═══════════════════════════════════════════════════
      // PRACTICE FACTORS — stagger the grid cells
      // ═══════════════════════════════════════════════════
      gsap.utils.toArray<HTMLElement>('.practice-factors span').forEach((el, i) => {
        gsap.fromTo(el,
          { y: 22, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              end: 'top 60%',
              scrub: 0.4,
            },
            delay: i * 0.05,
          }
        )
      })

      // ═══════════════════════════════════════════════════
      // FUTURE LEDGER ROWS — timeline reveal
      // ═══════════════════════════════════════════════════
      gsap.utils.toArray<HTMLElement>('.future-ledger > div').forEach((el, i) => {
        gsap.fromTo(el,
          { x: -20, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 86%',
              end: 'top 58%',
              scrub: 0.4,
            },
            delay: i * 0.04,
          }
        )
      })

      // ═══════════════════════════════════════════════════
      // LIMITS LIST ROWS
      // ═══════════════════════════════════════════════════
      gsap.utils.toArray<HTMLElement>('.limits-list > div').forEach((el) => {
        gsap.fromTo(el,
          { x: -24, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.75,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              end: 'top 60%',
              scrub: 0.5,
            },
          }
        )
      })

      // ═══════════════════════════════════════════════════
      // RESEARCH RECORD — slides from right
      // ═══════════════════════════════════════════════════
      const resRecord = document.querySelector('.research-record')
      if (resRecord) {
        gsap.fromTo(resRecord,
          { x: 30, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: resRecord,
              start: 'top 82%',
              end: 'top 44%',
              scrub: 0.7,
            },
          }
        )
      }

      // ═══════════════════════════════════════════════════
      // METHODOLOGY TRACK — each row reveals
      // ═══════════════════════════════════════════════════
      gsap.utils.toArray<HTMLElement>('.methodology-track button').forEach((el, i) => {
        gsap.fromTo(el,
          { x: 18, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              end: 'top 62%',
              scrub: 0.4,
            },
            delay: i * 0.05,
          }
        )
      })

      // ═══════════════════════════════════════════════════
      // APPLICATION LIST — cascade reveal
      // ═══════════════════════════════════════════════════
      gsap.utils.toArray<HTMLElement>('.application-list button').forEach((el, i) => {
        gsap.fromTo(el,
          { y: 16, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              end: 'top 64%',
              scrub: 0.35,
            },
            delay: i * 0.03,
          }
        )
      })

      // ═══════════════════════════════════════════════════
      // OBJECTIVE STATEMENT — dramatic entrance
      // ═══════════════════════════════════════════════════
      const objStatement = document.querySelector('.objective-statement')
      if (objStatement) {
        gsap.fromTo(objStatement,
          { y: 36, autoAlpha: 0, filter: 'blur(4px)' },
          {
            y: 0,
            autoAlpha: 1,
            filter: 'blur(0px)',
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: objStatement,
              start: 'top 82%',
              end: 'top 42%',
              scrub: 0.8,
            },
          }
        )
      }

      // ═══════════════════════════════════════════════════
      // CONCEPT OBJECT — the highlighted math concept box
      // ═══════════════════════════════════════════════════
      const conceptObj = document.querySelector('.concept-object')
      if (conceptObj) {
        gsap.fromTo(conceptObj,
          { scaleX: 0.94, autoAlpha: 0, transformOrigin: 'left' },
          {
            scaleX: 1,
            autoAlpha: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: conceptObj,
              start: 'top 82%',
              end: 'top 50%',
              scrub: 0.5,
            },
          }
        )
      }

    }, scope)

    ScrollTrigger.refresh()

    return () => ctx.revert()
  }, [])
}
