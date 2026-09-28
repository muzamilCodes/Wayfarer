import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/PageHeader';

const pages: Record<string, { title: string; body: string[] }> = {
  about: { title: 'About Wayfarer', body: ['We arrange tours, stays and cabs across Kashmir, Ladakh and the Himalaya.', 'Our team is based in the region, so plans reflect current road and weather conditions.'] },
  offers: { title: 'Offers', body: ['Seasonal offers and coupon codes will appear here. Codes are applied at checkout.'] },
  terms: { title: 'Terms & conditions', body: ['Placeholder text: replace with terms reviewed by your legal advisor before launch.'] },
  privacy: { title: 'Privacy policy', body: ['Placeholder text: replace with a privacy policy reviewed by your legal advisor before launch.'] },
  'cancellation-policy': { title: 'Cancellation policy', body: ['Placeholder text: state your cancellation windows and charges here.'] },
  'refund-policy': { title: 'Refund policy', body: ['Placeholder text: state refund timelines and methods here.'] },
};
export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(pages).map((page) => ({ page }));
export function generateMetadata({ params }: { params: { page: string } }): Metadata { return { title: pages[params.page]?.title }; }

export default function Info({ params }: { params: { page: string } }) {
  const p = pages[params.page];
  if (!p) notFound();
  return (<><PageHeader title={p.title} /><article className="container-x max-w-2xl space-y-4 pb-8 text-lg leading-relaxed">{p.body.map((t, i) => <p key={i}>{t}</p>)}</article></>);
}
