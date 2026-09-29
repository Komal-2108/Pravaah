/**
 * PRAVAAH "The Living Ledger" Design Tokens
 * Single source of truth for palette, typography, hairline borders and state definitions.
 */

export const tokens = {
  palette: {
    ivory: '#F6F1E7',        // Paper ivory (primary canvas)
    parchment: '#EDE5D4',    // Deeper parchment (secondary surfaces)
    paper: '#FBF8F1',        // Crisp card paper
    ink: '#14181F',          // Primary text & dark ink
    inkSoft: '#4A4F5A',      // Secondary editorial text
    inkMuted: '#727885',     // Timestamps, hashes & tertiary details
    border: '#DDD4C4',       // 1px hairline border
    borderLight: '#E9E2D5',  // Subtle dividers
    borderDark: '#C9BFAD',   // Emphasized rules
    accent: '#D9482B',       // Vermilion / Saffron (CTAs & highlights)
    accentHover: '#C03D22',
    accentLight: '#FBECE8',
    verified: '#2F6B4F',     // Verified green (seals & confirmed states)
    verifiedLight: '#EBF4EF',
    amber: '#B87314',        // Muted amber (offline & queued states)
    amberLight: '#FDF4E7'
  },
  typography: {
    serif: "'Fraunces', 'Instrument Serif', Georgia, serif",
    sans: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace"
  },
  borders: {
    hairline: '1px solid #DDD4C4',
    subtle: '1px solid #E9E2D5',
    ledgerRule: '1px solid #14181F'
  },
  radius: {
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px'
  }
};
