export const inr = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
export const discounted = (base: number, pct: number) => Math.round(base * (1 - pct / 100));
