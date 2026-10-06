import { useState, useEffect } from 'react'
import { PAPER_DATA } from '../../content/paperData'
import { X, ShieldCheck, HelpCircle, BookOpen } from 'lucide-react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export function VivaDefenseModal({ isOpen, onClose }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const categories = ['All', ...Array.from(new Set(PAPER_DATA.vivaPrep.map(q => q.category)))]
  const filtered = activeCategory === 'All'
    ? PAPER_DATA.vivaPrep
    : PAPER_DATA.vivaPrep.filter(q => q.category === activeCategory)

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        backgroundColor: 'rgba(18, 13, 23, 0.95)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 'clamp(20px, 4vw, 40px)',
        overflowY: 'auto',
      }}
    >
      <div style={{ maxWidth: '1000px', width: '100%', margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            borderBottom: '1px solid rgba(155, 142, 170, 0.2)',
            paddingBottom: '20px',
            marginBottom: '28px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <ShieldCheck className="text-teal" size={24} />
              <span className="font-mono text-teal" style={{ fontSize: '15px', letterSpacing: '0.15em' }}>
                VIVA DEFENSE PROTOCOL · SOURCE-LOCKED AUDIT
              </span>
            </div>
            <h2 className="font-serif text-ivory" style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 500 }}>
              Academic Defense & Question Repository
            </h2>
            <p className="text-lavender" style={{ fontSize: '17px', marginTop: '4px' }}>
              Strictly aligned with the 13-page research paper. Defend against common examiner traps.
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              padding: '10px 18px',
              borderRadius: '24px',
              background: 'rgba(33, 22, 34, 0.8)',
              border: '1px solid rgba(155, 142, 170, 0.3)',
              color: '#F5F0E8',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '15px',
            }}
          >
            <span>Close</span>
            <X size={18} />
            <span style={{ opacity: 0.5, fontSize: '12px' }}>[Esc]</span>
          </button>
        </div>

        {/* Category Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '32px',
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '8px 18px',
                borderRadius: '20px',
                fontSize: '14px',
                fontFamily: 'var(--font-mono)',
                backgroundColor: activeCategory === cat ? 'rgba(53, 214, 197, 0.2)' : 'rgba(33, 22, 34, 0.6)',
                border: activeCategory === cat ? '1px solid #35D6C5' : '1px solid rgba(155, 142, 170, 0.2)',
                color: activeCategory === cat ? '#35D6C5' : '#9B8EAA',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Questions list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filtered.map((item, idx) => {
            const isExpanded = expandedIndex === idx
            return (
              <div
                key={idx}
                className="editorial-panel"
                style={{
                  borderLeft: isExpanded ? '4px solid #35D6C5' : '1px solid rgba(155, 142, 170, 0.16)',
                  cursor: 'pointer',
                }}
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <HelpCircle className={isExpanded ? 'text-teal' : 'text-lavender'} size={22} />
                    <h3
                      style={{
                        fontSize: 'clamp(20px, 2.2vw, 24px)',
                        fontWeight: 600,
                        color: isExpanded ? '#F5F0E8' : '#F5F0E8',
                        lineHeight: 1.4,
                      }}
                    >
                      {item.question}
                    </h3>
                  </div>
                  <span className="font-mono text-lavender" style={{ fontSize: '13px', marginLeft: 16 }}>
                    [{item.category}]
                  </span>
                </div>

                {isExpanded && (
                  <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(155, 142, 170, 0.15)' }}>
                    <div style={{ marginBottom: '18px' }}>
                      <div className="font-mono text-teal" style={{ fontSize: '13px', letterSpacing: '0.1em', marginBottom: '8px' }}>
                        AUTHORITATIVE RESPONSE
                      </div>
                      <p style={{ fontSize: 'clamp(17px, 1.8vw, 20px)', color: '#F5F0E8', lineHeight: 1.6 }}>
                        "{item.answer}"
                      </p>
                    </div>

                    <div
                      style={{
                        backgroundColor: 'rgba(232, 121, 99, 0.08)',
                        borderLeft: '3px solid #E87963',
                        padding: '12px 18px',
                        borderRadius: '0 8px 8px 0',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <BookOpen size={16} className="text-coral" />
                        <span className="font-mono text-coral" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em' }}>
                          EXAMINER PITFALL & ACADEMIC DEFENSE NOTE
                        </span>
                      </div>
                      <p style={{ fontSize: '15px', color: '#9B8EAA', lineHeight: 1.5 }}>
                        {item.academicDefense}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
