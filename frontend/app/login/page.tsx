import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import AuthShell from '@/components/AuthShell';
import { LoginForm } from '@/components/AuthForms';

export const metadata: Metadata = { title: 'Log in | Wayfarer' };

export default function Login() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in with your password, email code, or Google account."
    >
      <Suspense
        fallback={
          <div className="py-12 text-center text-sm text-mist">
            <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-lake border-t-transparent mb-2" />
            Loading login options…
          </div>
        }
      >
        <LoginForm />
      </Suspense>
      <p className="mt-6 text-center text-sm text-mist">
        New to Wayfarer?{' '}
        <Link href="/signup" className="font-semibold text-lake hover:underline">
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
}
