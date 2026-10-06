import { useState, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { CinematicIntroScroll } from '../features/intro/CinematicIntroScroll'
import { ScrollPresentation } from '../features/presentation/ScrollPresentation'
import { VivaDefenseModal } from '../features/viva/VivaDefenseModal'

export default function Page() {
  const [isVivaOpen, setIsVivaOpen] = useState<boolean>(false)
  const presentationRef = useRef<HTMLDivElement>(null)

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  // Keyboard shortcut: V for Viva Defense
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'v' || e.key === 'V') {
        setIsVivaOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleScrollToPresentation = () => {
    presentationRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main style={{ backgroundColor: '#06080E', minHeight: '100vh', color: '#F5F0E8' }}>
      {/* 01: Centered, prestigious cinematic intro & highlighted credentials */}
      <CinematicIntroScroll onEnter={handleScrollToPresentation} />

      {/* 02: Full GSAP ScrollTrigger presentation film */}
      <div ref={presentationRef}>
        <ScrollPresentation
          onOpenViva={() => setIsVivaOpen(true)}
          onReplayIntro={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        />
      </div>

      {/* Full-screen Viva Defense Modal */}
      <VivaDefenseModal
        isOpen={isVivaOpen}
        onClose={() => setIsVivaOpen(false)}
      />
    </main>
  )
}
