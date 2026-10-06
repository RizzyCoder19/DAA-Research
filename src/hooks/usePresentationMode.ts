import { useEffect, useState } from 'react'
import { scenes } from '../content/experience'

const sections = scenes.map((scene) => scene.id)

export function usePresentationMode() {
  const [active, setActive] = useState(false)
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (!active) return
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(false)
      if (event.target instanceof HTMLElement && (event.target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName))) return
      if (event.key === 'ArrowRight' || event.key === 'PageDown') setIndex((value) => Math.min(value + 1, sections.length - 1))
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') setIndex((value) => Math.max(value - 1, 0))
    }
    window.addEventListener('keydown', keydown)
    return () => window.removeEventListener('keydown', keydown)
  }, [active])
  useEffect(() => {
    if (active) {
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      document.getElementById(sections[index])?.scrollIntoView({ behavior, block: 'start' })
    }
  }, [active, index])
  return { active, setActive, index, count: sections.length }
}
