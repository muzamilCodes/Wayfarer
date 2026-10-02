import type { Metadata } from 'next';
import Link from 'next/link';
import AuthShell from '@/components/AuthShell';
import { ResetPasswordForm } from '@/components/AuthForms';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Choose a new password for your Wayfarer account.',
};

export default function ResetPasswordPage() {
  return (
    <AuthShell
      title="Reset your password"
      subtitle="Enter the code sent to your email to configure a new password."
    >
      <ResetPasswordForm />
      <p className="mt-6 text-center text-sm text-mist">
        Remembered your credentials?{' '}
        <Link href="/login" className="font-semibold text-lake hover:underline">
          Return to log in
        </Link>
      </p>
    </AuthShell>
  );
}
