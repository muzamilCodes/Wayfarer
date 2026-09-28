export type Tier = 'full' | 'lite' | 'none';

/** Decides how much 3D to run. 'none' = static fallback only. */
export function detectTier(): Tier {
  if (typeof window === 'undefined') return 'none';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'none';
  try {
    const c = document.createElement('canvas');
    if (!(c.getContext('webgl2') || c.getContext('webgl'))) return 'none';
  } catch { return 'none'; }
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return 'none';
  const weak = (nav.deviceMemory ?? 8) < 4 || (nav.hardwareConcurrency ?? 8) <= 4 || window.innerWidth < 768;
  return weak ? 'lite' : 'full';
}
