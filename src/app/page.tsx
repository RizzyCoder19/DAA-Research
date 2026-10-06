import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { SystemBoot } from '../features/boot/SystemBoot'
import { AnalysisEnvironment } from '../features/environment/AnalysisEnvironment'

function hasSeenBoot() {
  try { return sessionStorage.getItem('rsa-boot-seen') === '1' } catch { return false }
}

export default function Page() {
  const [booting, setBooting] = useState(() => !hasSeenBoot())
  const envRef = useRef<HTMLDivElement>(null)

  const enterEnvironment = useCallback(() => {
    try { sessionStorage.setItem('rsa-boot-seen', '1') } catch { /* restricted context */ }

    // Animate environment in
    gsap.fromTo(
      envRef.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 1.1, ease: 'power2.inOut', delay: 0.1 }
    )
    setBooting(false)
  }, [])

  // ESC anywhere dismisses boot
  useEffect(() => {
    if (!booting) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') enterEnvironment()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [booting, enterEnvironment])

  return (
    <>
      {booting && <SystemBoot onComplete={enterEnvironment} />}
      <div ref={envRef} style={{ opacity: booting ? 0 : 1 }}>
        <AnalysisEnvironment />
      </div>
    </>
  )
}
