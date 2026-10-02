import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import AuthShell from '@/components/AuthShell';
import { RegisterForm } from '@/components/AuthForms';

export const metadata: Metadata = {
  title: 'Sign Up | Wayfarer',
  description: 'Create your Wayfarer account to save itineraries and book Himalayan tours.',
};

export default function SignupPage() {
  return (
    <AuthShell
      title="Begin your journey"
      subtitle="Join Wayfarer to plan, personalize, and book your dream Himalayan escape."
    >
      <Suspense
        fallback={
          <div className="py-12 text-center text-sm text-mist">
            <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-lake border-t-transparent mb-2" />
            Loading registration form…
          </div>
        }
      >
        <RegisterForm />
      </Suspense>
      <p className="mt-6 text-center text-sm text-mist">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-lake hover:underline">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
