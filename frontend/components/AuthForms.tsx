'use client';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { post } from '@/lib/api';
import { useAuth } from '@/lib/auth';

const field = 'mt-1 w-full rounded-xl border border-lake/20 bg-white px-4 py-3';
const Err = ({ m }: { m?: string }) => (m ? <p role="alert" className="mt-1 text-xs text-red-700">{m}</p> : null);
const msg = (e: unknown) => (e as Error).message;

/** Six boxes, paste-friendly, auto-advance. */
function OtpInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const set = (i: number, ch: string) => {
    const arr = value.padEnd(6, ' ').split(''); arr[i] = ch || ' ';
    onChange(arr.join('').trimEnd().replace(/ /g, ''));
  };
  return (
    <div className="flex gap-2" onPaste={(e) => { const t = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6); if (t) { e.preventDefault(); onChange(t); refs.current[Math.min(t.length, 5)]?.focus(); } }}>
      {Array.from({ length: 6 }, (_, i) => (
        <motion.input key={i} ref={(el) => { refs.current[i] = el; }} inputMode="numeric" maxLength={1} aria-label={`Digit ${i + 1}`}
          value={value[i] ?? ''} whileFocus={{ scale: 1.08 }}
          onChange={(e) => { const c = e.target.value.replace(/\D/g, ''); set(i, c); if (c && i < 5) refs.current[i + 1]?.focus(); }}
          onKeyDown={(e) => { if (e.key === 'Backspace' && !value[i] && i > 0) refs.current[i - 1]?.focus(); }}
          className="h-14 w-full rounded-xl border border-lake/25 bg-white text-center font-display text-2xl text-lake" />
      ))}
    </div>
  );
}

function useCooldown(sec = 30) {
  const [left, setLeft] = useState(sec);
  useEffect(() => { if (left <= 0) return; const t = setTimeout(() => setLeft(left - 1), 1000); return () => clearTimeout(t); }, [left]);
  return { left, reset: () => setLeft(sec) };
}

function OtpStep({ email, label, onVerify, resend }: { email: string; label: string; onVerify: (otp: string) => Promise<void>; resend: () => Promise<void> }) {
  const [otp, setOtp] = useState(''); const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  const cd = useCooldown();
  return (
    <form className="space-y-5" onSubmit={async (e) => {
      e.preventDefault(); setBusy(true); setError('');
      try { await onVerify(otp); } catch (er) { setError(msg(er)); } finally { setBusy(false); }
    }}>
      <p className="text-sm text-mist">Enter the 6-digit code sent to <b className="text-lake">{email}</b>. It expires in 10 minutes.</p>
      <OtpInput value={otp} onChange={setOtp} />
      <Err m={error} />
      <button disabled={otp.length < 6 || busy} className="btn btn-dark w-full disabled:opacity-50">{busy ? 'Checking…' : label}</button>
      <button type="button" disabled={cd.left > 0} onClick={async () => { await resend().catch(() => {}); cd.reset(); }} className="w-full text-sm text-crocus disabled:text-mist">
        {cd.left > 0 ? `Resend code in ${cd.left}s` : 'Resend code'}
      </button>
    </form>
  );
}

const loginSchema = z.object({ email: z.string().email('Enter a valid email'), password: z.string().min(1, 'Enter your password') });

export function LoginForm() {
  const router = useRouter(); const { signIn } = useAuth();
  const [mode, setMode] = useState<'password' | 'otp'>('password');
  const [otpEmail, setOtpEmail] = useState(''); const [needVerify, setNeedVerify] = useState('');
  const [error, setError] = useState('');
  const { register, handleSubmit, getValues, formState: { errors, isSubmitting } } = useForm<z.infer<typeof loginSchema>>({ resolver: zodResolver(loginSchema) });
  const done = async (t: string) => { await signIn(t); router.push('/account'); };

  if (needVerify)
    return <OtpStep email={needVerify} label="Verify email" resend={() => post('/auth/resend-otp', { email: needVerify, purpose: 'verify' })}
      onVerify={async (otp) => done((await post<{ accessToken: string }>('/auth/verify-email', { email: needVerify, otp })).accessToken)} />;

  if (mode === 'otp' && otpEmail)
    return <OtpStep email={otpEmail} label="Log in" resend={() => post('/auth/login-otp/request', { email: otpEmail })}
      onVerify={async (otp) => done((await post<{ accessToken: string }>('/auth/login-otp/verify', { email: otpEmail, otp })).accessToken)} />;

  const submit = handleSubmit(async (v) => {
    setError('');
    try {
      if (mode === 'otp') { await post('/auth/login-otp/request', { email: v.email }); setOtpEmail(v.email); }
      else await done((await post<{ accessToken: string }>('/auth/login', v)).accessToken);
    } catch (e) { setError(msg(e)); if (msg(e).includes('verify your email')) setNeedVerify(getValues('email')); }
  });

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <div className="grid grid-cols-2 rounded-full bg-glacier p-1 text-sm" role="tablist">
        {(['password', 'otp'] as const).map((m) => (
          <button key={m} type="button" role="tab" aria-selected={mode === m} onClick={() => setMode(m)}
            className={`rounded-full py-2 font-medium transition-colors ${mode === m ? 'bg-white text-lake shadow' : 'text-mist'}`}>{m === 'password' ? 'Password' : 'Email code'}</button>
        ))}
      </div>
      <label className="block text-sm">Email<input type="email" autoComplete="email" {...register('email')} className={field} /><Err m={errors.email?.message} /></label>
      {mode === 'password' && (
        <label className="block text-sm">Password<input type="password" autoComplete="current-password" {...register('password')} className={field} /><Err m={errors.password?.message} />
          <Link href="/forgot-password" className="mt-2 inline-block text-xs text-crocus">Forgot password?</Link></label>
      )}
      <Err m={error} />
      <button disabled={isSubmitting} className="btn btn-dark w-full">{isSubmitting ? 'Please wait…' : mode === 'otp' ? 'Send login code' : 'Log in'}</button>
    </form>
  );
}

const regSchema = z.object({ name: z.string().min(2, 'Enter your name'), email: z.string().email('Enter a valid email'), password: z.string().min(8, 'Use at least 8 characters') });

export function RegisterForm() {
  const router = useRouter(); const { signIn } = useAuth();
  const [email, setEmail] = useState(''); const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<z.infer<typeof regSchema>>({ resolver: zodResolver(regSchema) });

  if (email)
    return <OtpStep email={email} label="Verify and continue" resend={() => post('/auth/resend-otp', { email, purpose: 'verify' })}
      onVerify={async (otp) => { const d = await post<{ accessToken: string }>('/auth/verify-email', { email, otp }); await signIn(d.accessToken); router.push('/account'); }} />;

  return (
    <form onSubmit={handleSubmit(async (v) => { try { await post('/auth/register', v); setEmail(v.email); } catch (e) { setError(msg(e)); } })} className="space-y-4" noValidate>
      <label className="block text-sm">Full name<input autoComplete="name" {...register('name')} className={field} /><Err m={errors.name?.message} /></label>
      <label className="block text-sm">Email<input type="email" autoComplete="email" {...register('email')} className={field} /><Err m={errors.email?.message} /></label>
      <label className="block text-sm">Password<input type="password" autoComplete="new-password" {...register('password')} className={field} /><Err m={errors.password?.message} /></label>
      <Err m={error} />
      <button disabled={isSubmitting} className="btn btn-dark w-full">{isSubmitting ? 'Creating account…' : 'Create account'}</button>
    </form>
  );
}

export function ForgotForm() {
  const router = useRouter();
  const [email, setEmail] = useState(''); const [sent, setSent] = useState(false);
  const [otp, setOtp] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const [ok, setOk] = useState(false);
  const cd = useCooldown();

  if (ok) return <div role="status" className="space-y-4"><p className="rounded-xl bg-glacier p-4 text-sm text-lake">Password updated. You can log in now.</p><button className="btn btn-dark w-full" onClick={() => router.push('/login')}>Go to log in</button></div>;

  return sent ? (
    <form className="space-y-4" onSubmit={async (e) => {
      e.preventDefault(); setError('');
      if (password.length < 8) return setError('Use at least 8 characters for the new password');
      try { await post('/auth/reset-password', { email, otp, password }); setOk(true); } catch (er) { setError(msg(er)); }
    }}>
      <p className="text-sm text-mist">Enter the code we sent to <b className="text-lake">{email}</b> and choose a new password.</p>
      <OtpInput value={otp} onChange={setOtp} />
      <label className="block text-sm">New password<input type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} className={field} /></label>
      <Err m={error} />
      <button disabled={otp.length < 6} className="btn btn-dark w-full disabled:opacity-50">Update password</button>
      <button type="button" disabled={cd.left > 0} onClick={async () => { await post('/auth/forgot-password', { email }).catch(() => {}); cd.reset(); }} className="w-full text-sm text-crocus disabled:text-mist">
        {cd.left > 0 ? `Resend code in ${cd.left}s` : 'Resend code'}</button>
    </form>
  ) : (
    <form className="space-y-4" onSubmit={async (e) => { e.preventDefault(); try { await post('/auth/forgot-password', { email }); setSent(true); } catch (er) { setError(msg(er)); } }}>
      <label className="block text-sm">Email<input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={field} /></label>
      <Err m={error} />
      <button className="btn btn-dark w-full">Send reset code</button>
    </form>
  );
}
