export type StatusType = 'available' | 'busy' | 'building'

export interface StatusConfig {
  type: StatusType
  label: string
  sublabel?: string
}

// ── CHANGE THIS to update your status site-wide ──
export const CURRENT_STATUS: StatusConfig = {
  type: 'available',
  label: 'open to work',
  sublabel: 'disponibile per progetti freelance',
}

const STATUS_COLORS: Record<StatusType, { dot: string; bg: string; border: string; text: string }> = {
  available: {
    dot: '#22c55e',
    bg: '#f0fdf4',
    border: '#bbf7d0',
    text: '#15803d',
  },
  busy: {
    dot: '#f59e0b',
    bg: '#fffbeb',
    border: '#fde68a',
    text: '#92400e',
  },
  building: {
    dot: '#3b82f6',
    bg: '#eff6ff',
    border: '#bfdbfe',
    text: '#1d4ed8',
  },
}

interface StatusBadgeProps {
  /** 'pill' = compact badge (for Hero), 'tooltip' = has a hoverable tooltip */
  variant?: 'pill' | 'tooltip'
}

export default function StatusBadge({ variant = 'pill' }: StatusBadgeProps) {
  const { type, label, sublabel } = CURRENT_STATUS
  const colors = STATUS_COLORS[type]

  return (
    <>
      <style>{`
        @keyframes statusPulse {
          0%, 100% { transform: scale(1);   opacity: 1; }
          50%       { transform: scale(2.2); opacity: 0; }
        }
        .status-badge-wrap {
          position: relative;
          display: inline-flex;
        }
        .status-tooltip {
          position: absolute;
          bottom: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%) translateY(4px);
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 10px;
          padding: 10px 14px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.22,1,0.36,1);
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
          z-index: 50;
        }
        .status-badge-wrap:hover .status-tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
      `}</style>

      <div className="status-badge-wrap">
        {/* the pill */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '7px',
          padding: '5px 12px 5px 9px',
          background: colors.bg,
          border: `1px solid ${colors.border}`,
          borderRadius: '999px',
          cursor: variant === 'tooltip' ? 'default' : 'default',
        }}>
          {/* pulsing dot */}
          <span style={{ position: 'relative', width: '7px', height: '7px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{
              position: 'absolute', inset: 0,
              borderRadius: '50%',
              background: colors.dot,
              opacity: 0.35,
              animation: 'statusPulse 2s ease infinite',
            }} />
            <span style={{
              width: '7px', height: '7px', borderRadius: '50%',
              background: colors.dot, display: 'block', flexShrink: 0,
            }} />
          </span>

          <span style={{
            fontSize: '11px', fontWeight: 500,
            color: colors.text, letterSpacing: '-0.005em',
            lineHeight: 1,
          }}>
            {label}
          </span>
        </div>

        {/* tooltip (only in tooltip variant and if sublabel exists) */}
        {variant === 'tooltip' && sublabel && (
          <div className="status-tooltip">
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#000', marginBottom: '2px', letterSpacing: '-0.01em' }}>
              {label}
            </p>
            <p style={{ fontSize: '11px', color: '#888', letterSpacing: '-0.005em' }}>
              {sublabel}
            </p>
          </div>
        )}
      </div>
    </>
  )
}
