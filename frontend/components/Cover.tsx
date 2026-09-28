import Image from 'next/image';
import { Img } from '@/types';

const palettes = [['#0F3B4A', '#7FA9B7'], ['#123E4F', '#D9A441'], ['#2A2F5E', '#9CC3CF'], ['#0A2733', '#6B4FA0']];

/** Image with a generated gradient fallback so cards never look broken when no photo is uploaded yet. */
export default function Cover({ img, name, className = '' }: { img?: Img; name: string; className?: string }) {
  if (img?.url) return <Image src={img.url} alt={name} fill sizes="(max-width:768px) 100vw, 33vw" className={`object-cover ${className}`} />;
  const [a, b] = palettes[name.length % palettes.length];
  return (
    <div className={`absolute inset-0 ${className}`} style={{ background: `linear-gradient(160deg, ${a}, ${b})` }} role="img" aria-label={name}>
      <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="absolute bottom-0 h-1/2 w-full opacity-40" aria-hidden>
        <path d="M0 100V60l30-25 25 20 35-40 40 45 30-25 40 30v35z" fill="#F5F9FA" />
      </svg>
    </div>
  );
}
