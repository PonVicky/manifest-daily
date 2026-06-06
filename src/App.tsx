import { useEffect, useRef, useState } from 'react'
import { submitWaitlist, validateEmail } from './lib/waitlist'
import { celebrate } from './lib/confetti'
import { supabase } from './lib/supabase'

// ─── Types ───────────────────────────────────────────────────────────────────

type State =
  | { phase: 'idle' }
  | { phase: 'loading' }
  | { phase: 'duplicate' }
  | { phase: 'error'; message: string }
  | { phase: 'success'; position: number }

// ─── Particles ───────────────────────────────────────────────────────────────

function Particles() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = containerRef.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const N = 14
    const particles: HTMLDivElement[] = []

    for (let i = 0; i < N; i++) {
      const p = document.createElement('div')
      const dur = 14 + Math.random() * 16
      const delay = -Math.random() * dur
      const size = 2 + Math.random() * 3

      Object.assign(p.style, {
        position: 'absolute',
        bottom: '-10px',
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: 'rgba(255, 253, 249, 0.9)',
        boxShadow: '0 0 6px rgba(214, 168, 122, 0.5)',
        opacity: '0',
        left: `${Math.random() * 100}vw`,
        willChange: 'transform, opacity',
        animation: `rise ${dur}s linear ${delay}s infinite`,
      })
      p.style.setProperty('--p-op', (0.35 + Math.random() * 0.4).toFixed(2))
      p.style.setProperty('--p-dx', `${(Math.random() * 60 - 30).toFixed(0)}px`)

      root.appendChild(p)
      particles.push(p)
    }

    return () => particles.forEach(p => p.remove())
  }, [])

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }} />
}

// ─── Spinner ─────────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <svg
      className="animate-spin"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" />
    </svg>
  )
}

// ─── Main App ────────────────────────────────────────────────────────────────

export default function App() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<State>({ phase: 'idle' })
  const [focused, setFocused] = useState(false)
  const [shaking, setShaking] = useState(false)
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Fetch real waitlist count on load
  useEffect(() => {
    supabase
      .from('waitlist_emails')
      .select('*', { count: 'exact', head: true })
      .then(({ count }) => {
        if (count && count > 0) setWaitlistCount(100 + count)
      })
  }, [])

  // Arm entrance animation once the clock is proven live
  useEffect(() => {
    const t0 = document.timeline.currentTime ?? 0
    requestAnimationFrame(() => {
      const t1 = document.timeline.currentTime ?? 0
      if (t1 > t0) document.documentElement.classList.add('ready')
    })
    return () => document.documentElement.classList.remove('ready')
  }, [])

  const shake = () => {
    setShaking(true)
    setTimeout(() => setShaking(false), 400)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!validateEmail(trimmed)) {
      shake()
      inputRef.current?.focus()
      return
    }
    setState({ phase: 'loading' })
    const result = await submitWaitlist(trimmed)
    if (result.success) {
      celebrate()
      setState({ phase: 'success', position: result.position })
    } else if (result.duplicate) {
      setState({ phase: 'duplicate' })
    } else {
      setState({ phase: 'error', message: result.error })
    }
  }

  const isLoading = state.phase === 'loading'
  const isSuccess = state.phase === 'success'

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{
        background: '#FBF3E7',
      }}
    >
      {/* Background image — desktop */}
      <div
        className="absolute inset-0 hidden sm:block"
        style={{
          backgroundImage: 'url(/bg-desktop.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          zIndex: 0,
        }}
      />
      {/* Background image — mobile */}
      <div
        className="absolute inset-0 block sm:hidden"
        style={{
          backgroundImage: 'url(/bg-mobile.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          zIndex: 0,
        }}
      />
      {/* Overlay to keep text readable */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(253,248,239,0.25) 0%, rgba(251,243,231,0.35) 60%, rgba(244,234,219,0.45) 100%)',
          zIndex: 1,
        }}
      />
      {/* Cloud blobs */}
      <div className="absolute pointer-events-none" style={{ inset: '-10%', zIndex: 0 }}>
        <div
          className="cloud-a absolute rounded-full"
          style={{
            width: '46vw', height: '46vw', left: '4%', top: '14%',
            filter: 'blur(60px)', opacity: 0.55,
            background:
              'radial-gradient(circle at 40% 40%, rgba(255,253,249,0.9), rgba(255,253,249,0) 70%)',
          }}
        />
        <div
          className="cloud-b absolute rounded-full"
          style={{
            width: '52vw', height: '52vw', right: '0%', top: '6%',
            filter: 'blur(60px)', opacity: 0.55,
            background:
              'radial-gradient(circle at 50% 50%, rgba(234,211,180,0.5), rgba(234,211,180,0) 70%)',
          }}
        />
        <div
          className="cloud-c absolute rounded-full"
          style={{
            width: '40vw', height: '40vw', left: '18%', bottom: '-6%',
            filter: 'blur(60px)', opacity: 0.55,
            background:
              'radial-gradient(circle at 50% 50%, rgba(247,224,198,0.6), rgba(247,224,198,0) 70%)',
          }}
        />
        <div
          className="cloud-d absolute rounded-full"
          style={{
            width: '34vw', height: '34vw', right: '14%', bottom: '2%',
            filter: 'blur(60px)', opacity: 0.55,
            background:
              'radial-gradient(circle at 50% 50%, rgba(255,253,249,0.7), rgba(255,253,249,0) 70%)',
          }}
        />
      </div>

      {/* Light source */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: '50%', top: '-14%',
          width: '90vw', height: '90vw',
          maxWidth: '1100px', maxHeight: '1100px',
          transform: 'translateX(-50%)',
          background:
            'radial-gradient(circle at center, rgba(255,252,244,0.95) 0%, rgba(248,235,214,0.55) 32%, rgba(234,211,180,0) 66%)',
          zIndex: 1,
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            'radial-gradient(120% 100% at 50% 42%, rgba(58,48,40,0) 52%, rgba(58,48,40,0.04) 78%, rgba(58,48,40,0.10) 100%)',
        }}
      />

      {/* Rising particles */}
      <Particles />

      {/* Hero */}
      <main
        className="relative flex flex-col items-center justify-center text-center h-full"
        style={{ zIndex: 5, padding: 'clamp(24px,5vh,64px) 24px', gap: 'clamp(18px,2.4vh,30px)' }}
      >
        {/* Wordmark */}
        <div
          className="rise-in"
          style={
            {
              '--delay': '0s',
              fontFamily: '"DM Serif Display", serif',
              fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
              fontWeight: 400,
              color: '#7A6B5D',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            } as React.CSSProperties
          }
        >
          Manifest Daily
        </div>

        {/* Mascot */}
        <div
          className="rise-in relative grid place-items-center"
          style={{ '--delay': '0s', marginBottom: '2px' } as React.CSSProperties}
        >
          <div
            className="absolute rounded-full"
            style={{
              width: '240px', height: '240px',
              background:
                'radial-gradient(circle at 50% 45%, rgba(214,168,122,0.16) 0%, rgba(214,168,122,0.08) 40%, rgba(214,168,122,0) 70%)',
              zIndex: 0,
            }}
          />
          <img
            src="/mascot-meditate.png"
            alt="Nimbus, a calm meditating cloud"
            className="mascot-bob relative"
            style={{
              width: 'clamp(110px,16vh,156px)',
              height: 'auto',
              filter: 'drop-shadow(0 14px 26px rgba(58,48,40,0.12))',
              zIndex: 1,
            }}
          />
        </div>

        {/* Headline */}
        <h1
          className="rise-in font-serif font-normal"
          style={
            {
              '--delay': '0.12s',
              color: '#3A3028',
              fontSize: 'clamp(2.5rem, 6.2vw, 4.4rem)',
              lineHeight: 1.04,
              letterSpacing: '-0.01em',
              textWrap: 'balance',
              textShadow: '0 1px 0 rgba(255,253,249,0.6), 0 14px 40px rgba(58,48,40,0.06)',
            } as React.CSSProperties
          }
        >
          One calm app.<br />
          A lifetime of <em style={{ fontStyle: 'italic', color: '#4a3b2c' }}>growth</em>.
        </h1>

        {/* Sub-heading */}
        <p
          className="rise-in font-sans font-light"
          style={
            {
              '--delay': '0.24s',
              maxWidth: '33ch',
              fontSize: 'clamp(1rem, 1.35vw, 1.2rem)',
              lineHeight: 1.6,
              color: '#7A6B5D',
            } as React.CSSProperties
          }
        >
          Daily affirmations, calm focus, and sealed letters to who you're becoming.
          Be the first to begin.
        </p>

        {/* Form zone or success */}
        {!isSuccess ? (
          <div
            className="rise-in w-full flex flex-col items-center"
            style={{ '--delay': '0.36s', gap: '14px' } as React.CSSProperties}
          >
            {/* Status feedback */}
            {state.phase === 'duplicate' && (
              <p className="text-sm font-light" style={{ color: '#D6A87A' }}>
                You're already on the waitlist ✨
              </p>
            )}
            {state.phase === 'error' && (
              <p className="text-sm font-light" style={{ color: '#b94a38' }}>
                {state.message}
              </p>
            )}

            {/* Email pill form */}
            <form
              onSubmit={handleSubmit}
              noValidate
              className={shaking ? 'shake' : ''}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: 'min(480px, 92vw)',
                padding: '7px',
                borderRadius: '32px',
                background: 'rgba(255,253,249,0.6)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                border: focused
                  ? '1px solid rgba(214,168,122,0.55)'
                  : '1px solid rgba(255,255,255,0.55)',
                boxShadow: focused
                  ? '0 8px 24px rgba(58,48,40,0.07), 0 0 0 4px rgba(214,168,122,0.16)'
                  : '0 8px 24px rgba(58,48,40,0.07)',
                transition: 'box-shadow 0.35s ease, border-color 0.35s ease',
              }}
            >
              <input
                ref={inputRef}
                type="email"
                inputMode="email"
                placeholder="Enter your email"
                aria-label="Email address"
                autoComplete="email"
                required
                disabled={isLoading}
                value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={{
                  flex: 1,
                  minWidth: 0,
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontFamily: 'inherit',
                  fontSize: '1.02rem',
                  fontWeight: 400,
                  color: '#3A3028',
                  padding: '14px 8px 14px 20px',
                  opacity: isLoading ? 0.6 : 1,
                  cursor: isLoading ? 'not-allowed' : 'text',
                }}
              />

              <button
                type="submit"
                disabled={isLoading}
                style={{
                  flexShrink: 0,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: '1px solid rgba(255,255,255,0.7)',
                  background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFDF9 100%)',
                  color: '#3A3028',
                  fontFamily: 'inherit',
                  fontSize: '1.02rem',
                  fontWeight: 500,
                  padding: '14px 24px',
                  borderRadius: '28px',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow:
                    '0 8px 22px rgba(214,168,122,0.16), 0 8px 24px rgba(58,48,40,0.07)',
                  transition:
                    'transform 0.25s cubic-bezier(.2,.8,.2,1), box-shadow 0.3s ease, opacity 0.2s ease',
                  opacity: isLoading ? 0.8 : 1,
                }}
                onMouseEnter={e => {
                  if (!isLoading) {
                    const btn = e.currentTarget as HTMLButtonElement
                    btn.style.transform = 'translateY(-2px)'
                    btn.style.boxShadow =
                      '0 12px 30px rgba(214,168,122,0.28), 0 20px 50px rgba(58,48,40,0.12)'
                  }
                }}
                onMouseLeave={e => {
                  const btn = e.currentTarget as HTMLButtonElement
                  btn.style.transform = ''
                  btn.style.boxShadow =
                    '0 8px 22px rgba(214,168,122,0.16), 0 8px 24px rgba(58,48,40,0.07)'
                }}
                onMouseDown={e => {
                  if (!isLoading)
                    (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.97)'
                }}
                onMouseUp={e => {
                  ;(e.currentTarget as HTMLButtonElement).style.transform = ''
                }}
              >
                {isLoading ? (
                  <>
                    <Spinner />
                    Joining…
                  </>
                ) : (
                  <>
                    Join the waitlist{' '}
                    <span style={{ color: '#D6A87A', transition: 'transform 0.3s ease' }}>→</span>
                  </>
                )}
              </button>
            </form>

            <div
              style={{
                fontSize: '0.86rem',
                fontWeight: 300,
                color: '#7A6B5D',
                letterSpacing: '0.01em',
              }}
            >
              Early access · No spam, ever.
            </div>

            <div
              style={{
                fontSize: '0.9rem',
                fontWeight: 400,
                color: '#7A6B5D',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span
                className="pulse-dot"
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: '#D6A87A',
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              />
              <span>
                <strong style={{ color: '#3A3028', fontWeight: 500 }}>
                  {waitlistCount ? `${waitlistCount.toLocaleString()}+` : '…'}
                </strong>
                &nbsp;already waiting.
              </span>
            </div>
          </div>
        ) : (
          /* ── Success state ── */
          <div className="success-show flex flex-col items-center" style={{ gap: '16px' }}>
            <div
              style={{
                fontFamily: '"DM Serif Display", serif',
                fontSize: 'clamp(1.9rem, 4vw, 2.9rem)',
                color: '#3A3028',
                lineHeight: 1.1,
              }}
            >
              ✓ You're on the list.
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 24px',
                borderRadius: '100px',
                background: 'rgba(255,253,249,0.62)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                border: '1px solid rgba(255,255,255,0.55)',
                boxShadow: '0 8px 24px rgba(58,48,40,0.07)',
                fontSize: '1.05rem',
                color: '#7A6B5D',
              }}
            >
              You're&nbsp;
              <strong
                style={{
                  color: '#3A3028',
                  fontWeight: 500,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                #{state.position.toLocaleString()}
              </strong>
            </div>

            <p
              style={{
                maxWidth: '30ch',
                fontWeight: 300,
                fontSize: '0.95rem',
                lineHeight: 1.6,
                color: '#7A6B5D',
                textAlign: 'center',
              }}
            >
              We'll let you know when Manifest Daily launches.
            </p>
          </div>
        )}
      </main>

      {/* Featured pill */}
      <div
        className="rise-in absolute left-1/2 -translate-x-1/2 sm:inline-flex hidden items-center"
        style={
          {
            '--delay': '0.5s',
            bottom: 'clamp(22px, 4vh, 40px)',
            zIndex: 5,
            gap: '10px',
            padding: '10px 18px',
            borderRadius: '100px',
            background: 'rgba(255,253,249,0.55)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1px solid rgba(255,255,255,0.5)',
            boxShadow: '0 8px 24px rgba(58,48,40,0.07)',
            fontSize: '0.78rem',
            color: '#7A6B5D',
          } as React.CSSProperties
        }
      >
        <span
          style={{
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            fontWeight: 500,
            color: '#D6A87A',
            fontSize: '0.7rem',
          }}
        >
          Featured
        </span>
        <span
          style={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: '#ECDFCE',
            display: 'inline-block',
          }}
        />
        <span style={{ fontWeight: 400 }}>A message to your future self</span>
      </div>

      {/* Mobile form reflow */}
      <style>{`
        @media (max-width: 540px) {
          form {
            flex-direction: column !important;
            padding: 10px !important;
            gap: 10px !important;
            border-radius: 26px !important;
          }
          form input {
            width: 100% !important;
            text-align: center !important;
            padding: 12px !important;
          }
          form button {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </div>
  )
}
