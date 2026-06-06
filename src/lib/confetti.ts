import confetti from 'canvas-confetti'

const PALETTE = ['#D6A87A', '#EAD3B4', '#FFFDF9', '#C9A47E', '#F4EADB']

export function celebrate() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const base: confetti.Options = {
    particleCount: 26,
    spread: 58,
    startVelocity: 42,
    gravity: 0.85,
    scalar: 0.9,
    ticks: 220,
    colors: PALETTE,
    disableForReducedMotion: true,
  }

  const burst = () => {
    confetti({ ...base, angle: 60, origin: { x: 0, y: 0.7 } })
    confetti({ ...base, angle: 120, origin: { x: 1, y: 0.7 } })
  }

  burst()
  setTimeout(burst, 220)
  setTimeout(() => {
    confetti({ ...base, particleCount: 16, angle: 60, origin: { x: 0.05, y: 0.85 } })
    confetti({ ...base, particleCount: 16, angle: 120, origin: { x: 0.95, y: 0.85 } })
  }, 440)
}
