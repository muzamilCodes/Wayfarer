'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';

export default function Account() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  useEffect(() => { if (!loading && !user) router.replace('/login'); }, [loading, user, router]);
  if (loading || !user) return <div className="container-x py-24 text-center text-mist" role="status">Loading your account…</div>;
  return (
    <div className="container-x py-12">
      <h1 className="text-4xl font-bold text-lake">Hello, {user.name.split(' ')[0]}</h1>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-lake/10 bg-white p-6 md:col-span-2">
          <h2 className="font-display text-xl font-semibold text-lake">Profile</h2>
          <dl className="mt-4 space-y-2 text-sm"><div className="flex justify-between"><dt className="text-mist">Name</dt><dd>{user.name}</dd></div>
            <div className="flex justify-between"><dt className="text-mist">Email</dt><dd>{user.email}{user.emailVerified && ' (verified)'}</dd></div>
            <div className="flex justify-between"><dt className="text-mist">Role</dt><dd className="capitalize">{user.role.replace('_', ' ')}</dd></div></dl>
        </div>
        <div className="rounded-2xl border border-dashed border-lake/20 p-6"><h2 className="font-display text-xl font-semibold text-lake">My trips</h2><p className="mt-2 text-sm text-mist">Your bookings will show here once checkout is live.</p></div>
      </div>
      <button className="btn btn-ghost mt-8 text-lake" onClick={async () => { await signOut(); router.push('/'); }}>Log out</button>
    </div>
  );
}
