import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="container-x py-24 text-center">
      <h1 className="text-4xl font-bold text-lake">Page not found</h1>
      <p className="mt-2 text-mist">That page doesn't exist or has moved.</p>
      <Link href="/destinations" className="btn btn-dark mt-6">Browse destinations</Link>
    </div>
  );
}
