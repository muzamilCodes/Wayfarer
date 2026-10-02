import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import AuthShell from '@/components/AuthShell';
import { VerifyEmailForm } from '@/components/AuthForms';

export const metadata: Metadata = {
  title: 'Verify Email | Wayfarer',
  description: 'Enter your 6-digit code to verify your Wayfarer account.',
};

export default function VerifyEmailPage() {
  return (
    <AuthShell
      title="Verify your email"
      subtitle="Enter the 6-digit confirmation code sent to your inbox to activate your account."
    >
      <Suspense
        fallback={
          <div className="py-12 text-center text-sm text-mist">
            <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-lake border-t-transparent mb-2" />
            Loading verification…
          </div>
        }
      >
        <VerifyEmailForm />
      </Suspense>
      <p className="mt-6 text-center text-sm text-mist">
        Need to sign in instead?{' '}
        <Link href="/login" className="font-semibold text-lake hover:underline">
          Return to log in
        </Link>
      </p>
    </AuthShell>
  );
}
