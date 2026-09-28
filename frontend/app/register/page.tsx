import type { Metadata } from 'next';
import Link from 'next/link';
import AuthShell from '@/components/AuthShell';
import { RegisterForm } from '@/components/AuthForms';
export const metadata: Metadata = { title: 'Create account' };
export default function Register() {
  return (
    <AuthShell title="Create your account" subtitle="We will email you a code to confirm your address.">
      <RegisterForm />
      <p className="mt-6 text-sm text-mist">Already registered? <Link href="/login" className="font-medium text-crocus">Log in</Link></p>
    </AuthShell>
  );
}
