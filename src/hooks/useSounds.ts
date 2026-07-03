/**
 * useSounds — Web Audio API sound effects. Zero dependencies.
 * All sounds are generated synthetically (no audio files needed).
 * Respects prefers-reduced-motion and is silenced until first user interaction.
 */

type SoundType = 'hover' | 'click' | 'success' | 'error' | 'open' | 'close'

let ctx: AudioContext | null = null

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    try { ctx = new AudioContext() } catch { return null }
  }
  return ctx
}

function master(ac: AudioContext) {
  const gain = ac.createGain()
  gain.gain.value = 0.08 // very quiet — barely perceptible
  gain.connect(ac.destination)
  return gain
}

function playHover() {
  const ac = getCtx(); if (!ac) return
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  const out = master(ac)
  osc.type = 'sine'
  osc.frequency.setValueAtTime(880, ac.currentTime)
  osc.frequency.exponentialRampToValueAtTime(1040, ac.currentTime + 0.06)
  gain.gain.setValueAtTime(0.8, ac.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.08)
  osc.connect(gain); gain.connect(out)
  osc.start(); osc.stop(ac.currentTime + 0.08)
}

function playClick() {
  const ac = getCtx(); if (!ac) return
  // short transient click
  const buf = ac.createBuffer(1, ac.sampleRate * 0.04, ac.sampleRate)
  const data = buf.getChannelData(0)
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 8)
  }
  const src = ac.createBufferSource()
  const gain = ac.createGain()
  const out = master(ac)
  gain.gain.value = 1.4
  src.buffer = buf
  src.connect(gain); gain.connect(out)
  src.start()
}

function playSuccess() {
  const ac = getCtx(); if (!ac) return
  const out = master(ac)
  ;[0, 0.12, 0.24].forEach((delay, i) => {
    const osc = ac.createOscillator()
    const gain = ac.createGain()
    const notes = [523.25, 659.25, 783.99] // C5, E5, G5
    osc.type = 'sine'
    osc.frequency.value = notes[i]
    gain.gain.setValueAtTime(0, ac.currentTime + delay)
    gain.gain.linearRampToValueAtTime(0.9, ac.currentTime + delay + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + delay + 0.3)
    osc.connect(gain); gain.connect(out)
    osc.start(ac.currentTime + delay)
    osc.stop(ac.currentTime + delay + 0.3)
  })
}

function playError() {
  const ac = getCtx(); if (!ac) return
  const out = master(ac)
  ;[0, 0.15].forEach((delay, i) => {
    const osc = ac.createOscillator()
    const gain = ac.createGain()
    osc.type = 'sawtooth'
    osc.frequency.value = i === 0 ? 220 : 185
    gain.gain.setValueAtTime(0, ac.currentTime + delay)
    gain.gain.linearRampToValueAtTime(0.5, ac.currentTime + delay + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + delay + 0.22)
    osc.connect(gain); gain.connect(out)
    osc.start(ac.currentTime + delay)
    osc.stop(ac.currentTime + delay + 0.22)
  })
}

function playOpen() {
  const ac = getCtx(); if (!ac) return
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  const out = master(ac)
  osc.type = 'sine'
  osc.frequency.setValueAtTime(480, ac.currentTime)
  osc.frequency.exponentialRampToValueAtTime(680, ac.currentTime + 0.12)
  gain.gain.setValueAtTime(0.9, ac.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.14)
  osc.connect(gain); gain.connect(out)
  osc.start(); osc.stop(ac.currentTime + 0.14)
}

function playClose() {
  const ac = getCtx(); if (!ac) return
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  const out = master(ac)
  osc.type = 'sine'
  osc.frequency.setValueAtTime(680, ac.currentTime)
  osc.frequency.exponentialRampToValueAtTime(380, ac.currentTime + 0.1)
  gain.gain.setValueAtTime(0.7, ac.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.12)
  osc.connect(gain); gain.connect(out)
  osc.start(); osc.stop(ac.currentTime + 0.12)
}

const soundMap: Record<SoundType, () => void> = {
  hover:   playHover,
  click:   playClick,
  success: playSuccess,
  error:   playError,
  open:    playOpen,
  close:   playClose,
}

export function playSound(type: SoundType) {
  // respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  try { soundMap[type]() } catch { /* silently fail */ }
}

/** Returns event handlers to attach to any interactive element */
export function useSoundHandlers() {
  return {
    onHover: () => playSound('hover'),
    onClick: () => playSound('click'),
  }
}
