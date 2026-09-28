import type { Metadata } from 'next';
import AuthShell from '@/components/AuthShell';
import { ForgotForm } from '@/components/AuthForms';
export const metadata: Metadata = { title: 'Reset password' };
export default function Forgot() {
  return <AuthShell title="Reset your password" subtitle="We will send a code to your email."><ForgotForm /></AuthShell>;
}
