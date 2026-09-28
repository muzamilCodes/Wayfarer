import { ReactNode } from 'react';

export default function PageHeader({ title, subtitle, children }: { title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden text-snow" style={{ background: 'linear-gradient(180deg,#0F3B4A,#3D6F82)' }}>
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-20 w-full" aria-hidden>
        <path d="M0 120V70l100-40 90 40 120-60 140 70 130-40 150 50 120-50 350 60v50z" fill="#F5F9FA" />
      </svg>
      <div className="container-x relative pb-24 pt-14">
        <h1 className="text-4xl font-bold md:text-6xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-xl text-glacier">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
