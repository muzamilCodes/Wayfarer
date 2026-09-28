import type { Metadata } from 'next';
import Link from 'next/link';
import AuthShell from '@/components/AuthShell';
import { LoginForm } from '@/components/AuthForms';
export const metadata: Metadata = { title: 'Log in' };
export default function Login() {
  return (
    <AuthShell title="Welcome back" subtitle="Log in with your password or a one-time code sent to your email.">
      <LoginForm />
      <p className="mt-6 text-sm text-mist">New here? <Link href="/register" className="font-medium text-crocus">Create an account</Link></p>
    </AuthShell>
  );
}
