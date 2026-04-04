// ─── Resin material property lookup ──────────────────────────────
export interface ResinProps {
  transmission: number;
  roughness: number;
  opacity: number;
  clearcoat: number;
  ior: number;
}

export const RESIN_PROPS: Record<string, ResinProps> = {
  'ocean-blue':   { transmission: 0.72, roughness: 0.02, opacity: 0.84, clearcoat: 1.0,  ior: 1.52 },
  'forest-green': { transmission: 0.50, roughness: 0.05, opacity: 0.88, clearcoat: 0.9,  ior: 1.50 },
  'amber-gold':   { transmission: 0.28, roughness: 0.08, opacity: 0.93, clearcoat: 0.8,  ior: 1.48 },
  'midnight':     { transmission: 0.04, roughness: 0.16, opacity: 0.97, clearcoat: 0.55, ior: 1.45 },
  'arctic':       { transmission: 0.82, roughness: 0.01, opacity: 0.80, clearcoat: 1.0,  ior: 1.56 },
  'sunset':       { transmission: 0.20, roughness: 0.10, opacity: 0.94, clearcoat: 0.7,  ior: 1.47 },
};

export const DEFAULT_RESIN: ResinProps = {
  transmission: 0.62, roughness: 0.035, opacity: 0.88, clearcoat: 1.0, ior: 1.52,
};

// ─── Size scale lookup ────────────────────────────────────────────
export const SIZE_SCALE: Record<string, number> = {
  's': 0.72, 'm': 1.0, 'l': 1.28, 'xl': 1.56,
};
