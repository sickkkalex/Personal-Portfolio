import { useEffect, useState } from 'react'

interface IntroScreenProps {
  onDone: () => void
}

export default function IntroScreen({ onDone }: IntroScreenProps) {
  const [phase, setPhase] = useState<'visible' | 'fadeout'>('visible')

  useEffect(() => {
    // After 1.8s start fading out
    const t1 = setTimeout(() => setPhase('fadeout'), 1800)
    // After fade completes, notify parent
    const t2 = setTimeout(() => onDone(), 2400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#ffffff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: phase === 'fadeout' ? 0 : 1,
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: phase === 'fadeout' ? 'none' : 'all',
      }}
    >
      <div style={{ position: 'relative', width: 96, height: 96 }}>
        {/* shimmer ring */}
        <div style={{
          position: 'absolute', inset: -24,
          borderRadius: '50%',
          background: 'conic-gradient(from 0deg, transparent 60%, rgba(0,0,0,0.06) 70%, rgba(0,0,0,0.14) 80%, rgba(0,0,0,0.06) 90%, transparent 100%)',
          animation: 'introSpin 1.8s linear infinite',
        }} />

        {/* outer soft glow */}
        <div style={{
          position: 'absolute', inset: -16,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,0,0,0.04) 0%, transparent 70%)',
          animation: 'introPulse 1.4s ease-in-out infinite',
        }} />

        {/* logo */}
        <img
          src="/logo.svg"
          alt="logo"
          style={{
            width: 96, height: 96,
            objectFit: 'contain',
            animation: 'introLogoIn 0.8s cubic-bezier(0.16,1,0.3,1) both, introShimmer 2s ease-in-out infinite',
            position: 'relative', zIndex: 1,
          }}
        />
      </div>

      <style>{`
        @keyframes introLogoIn {
          from { opacity: 0; transform: scale(0.82); filter: blur(8px); }
          to   { opacity: 1; transform: scale(1);    filter: blur(0); }
        }
        @keyframes introPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.12); }
        }
        @keyframes introSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes introShimmer {
          0%, 100% { filter: brightness(1)   drop-shadow(0 0  0px rgba(0,0,0,0)); }
          40%      { filter: brightness(1.08) drop-shadow(0 0 18px rgba(0,0,0,0.12)); }
          60%      { filter: brightness(1.12) drop-shadow(0 0 28px rgba(0,0,0,0.18)); }
        }
      `}</style>
    </div>
  )
}
