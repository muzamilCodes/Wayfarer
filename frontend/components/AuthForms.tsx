'use client';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { post } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { Loader2, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

const field =
  'mt-1 w-full rounded-2xl border border-lake/15 bg-white/90 px-4 py-3.5 text-sm text-ink placeholder:text-mist/60 shadow-sm transition-all focus:border-lake focus:bg-white focus:outline-none focus:ring-2 focus:ring-lake/20';

const Err = ({ m }: { m?: string }) =>
  m ? (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      role="alert"
      className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600"
    >
      <AlertCircle size={13} />
      <span>{m}</span>
    </motion.p>
  ) : null;

const msg = (e: unknown) => (e as Error).message || 'Something went wrong';

export function GoogleButton({
  onSuccess,
  label = 'Continue with Google',
}: {
  onSuccess?: () => void;
  label?: string;
}) {
  const { signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      onSuccess?.();
    } catch {
      // handled in auth provider
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="relative flex w-full items-center justify-center gap-3 rounded-2xl border border-lake/15 bg-white/90 px-4 py-3 text-sm font-semibold text-lake shadow-sm backdrop-blur transition-all hover:bg-white hover:shadow-md hover:border-lake/30 active:scale-[0.99] disabled:opacity-50"
    >
      {loading ? (
        <Loader2 className="animate-spin text-lake" size={18} />
      ) : (
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
      )}
      <span>{label}</span>
    </button>
  );
}

/** Six boxes, paste-friendly, auto-advance */
export function OtpInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const set = (i: number, ch: string) => {
    const arr = value.padEnd(6, ' ').split('');
    arr[i] = ch || ' ';
    onChange(arr.join('').trimEnd().replace(/ /g, ''));
  };

  return (
    <div
      className="flex gap-2 sm:gap-3"
      onPaste={(e) => {
        const t = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        if (t) {
          e.preventDefault();
          onChange(t);
          refs.current[Math.min(t.length, 5)]?.focus();
        }
      }}
    >
      {Array.from({ length: 6 }, (_, i) => (
        <motion.input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          inputMode="numeric"
          maxLength={1}
          aria-label={`Digit ${i + 1}`}
          value={value[i] ?? ''}
          whileFocus={{ scale: 1.05 }}
          onChange={(e) => {
            const c = e.target.value.replace(/\D/g, '');
            set(i, c);
            if (c && i < 5) refs.current[i + 1]?.focus();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Backspace' && !value[i] && i > 0)
              refs.current[i - 1]?.focus();
          }}
          className="h-13 sm:h-14 w-full rounded-2xl border border-lake/20 bg-white text-center font-display text-2xl font-bold text-lake shadow-sm focus:border-lake focus:outline-none focus:ring-2 focus:ring-lake/20"
        />
      ))}
    </div>
  );
}

function useCooldown(sec = 30) {
  const [left, setLeft] = useState(sec);
  useEffect(() => {
    if (left <= 0) return;
    const t = setTimeout(() => setLeft(left - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);
  return { left, reset: () => setLeft(sec) };
}

export function OtpStep({
  email,
  label,
  hintOtp,
  onVerify,
  resend,
  onBack,
}: {
  email: string;
  label: string;
  hintOtp?: string;
  onVerify: (otp: string) => Promise<void>;
  resend: () => Promise<string | void>;
  onBack?: () => void;
}) {
  const [otp, setOtp] = useState('');
  const [activeHint, setActiveHint] = useState(hintOtp || '');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const cd = useCooldown();

  return (
    <form
      className="space-y-5"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        setError('');
        try {
          await onVerify(otp);
        } catch (er) {
          setError(msg(er));
        } finally {
          setBusy(false);
        }
      }}
    >
      <div className="rounded-2xl bg-glacier/40 p-4 border border-lake/10 flex items-start justify-between">
        <div>
          <p className="text-sm text-mist">
            Enter the 6-digit verification code sent to{' '}
            <strong className="text-lake font-semibold">{email}</strong>.
          </p>
        </div>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="text-xs font-semibold text-crocus hover:underline shrink-0 ml-2"
          >
            Change
          </button>
        )}
      </div>

      {activeHint && (
        <div className="flex items-center justify-between rounded-2xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs text-emerald-800">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Verification Code:</span>
            <strong className="font-mono text-sm tracking-wider text-emerald-950">{activeHint}</strong>
          </div>
          <button
            type="button"
            onClick={() => setOtp(activeHint)}
            className="rounded-lg bg-emerald-600 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-emerald-700 transition"
          >
            Auto Fill
          </button>
        </div>
      )}

      <OtpInput value={otp} onChange={setOtp} />
      <Err m={error} />
      <button
        disabled={otp.length < 6 || busy}
        className="btn btn-dark w-full shadow-lg shadow-lake/15 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {busy ? <Loader2 className="animate-spin" size={16} /> : null}
        <span>{busy ? 'Verifying code…' : label}</span>
      </button>
      <div className="text-center">
        <button
          type="button"
          disabled={cd.left > 0}
          onClick={async () => {
            const res = await resend().catch(() => {});
            if (typeof res === 'string') setActiveHint(res);
            cd.reset();
          }}
          className="text-xs font-semibold text-crocus hover:underline disabled:text-mist/70"
        >
          {cd.left > 0 ? `Resend code in ${cd.left}s` : 'Resend code'}
        </button>
      </div>
    </form>
  );
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next');
  const errorParam = searchParams.get('error');
  const emailParam = searchParams.get('email') || '';
  const { signIn } = useAuth();
  const [mode, setMode] = useState<'otp' | 'password'>(emailParam ? 'password' : 'otp');
  const [emailInput, setEmailInput] = useState(emailParam);
  const [passwordInput, setPasswordInput] = useState('');
  const [otpEmail, setOtpEmail] = useState('');
  const [hintOtp, setHintOtp] = useState('');
  const [needVerify, setNeedVerify] = useState('');
  const [error, setError] = useState(
    errorParam === 'admin_required'
      ? 'Administrator privileges required. Please sign in with an authorized admin account.'
      : ''
  );
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const done = async (t: string, u?: any) => {
    setLoginSuccess(true);
    await signIn(t, u);
    setTimeout(() => {
      const destination =
        next && next.startsWith('/')
          ? (next.startsWith('/admin') && u?.role !== 'admin' ? '/account?error=admin_required' : next)
          : (u?.role === 'admin' ? '/admin' : '/account');
      window.location.href = destination;
    }, 300);
  };

  if (loginSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-8 text-center"
      >
        <CheckCircle2 className="mx-auto text-emerald-600 mb-3" size={40} />
        <h3 className="font-display text-xl font-bold text-lake">Welcome back!</h3>
        <p className="mt-1 text-sm text-mist">Signing you into your Himalayan journey…</p>
      </motion.div>
    );
  }

  if (needVerify) {
    return (
      <OtpStep
        email={needVerify}
        label="Verify email"
        onBack={() => setNeedVerify('')}
        resend={async () => {
          await post('/auth/resend-otp', { email: needVerify, purpose: 'verify' });
        }}
        onVerify={async (otp) => {
          const res = await post<{ accessToken: string }>('/auth/verify-email', {
            email: needVerify,
            otp,
          });
          await done(res.accessToken);
        }}
      />
    );
  }

  if (mode === 'otp' && otpEmail) {
    return (
      <OtpStep
        email={otpEmail}
        label="Verify & Log In"
        hintOtp={hintOtp}
        onBack={() => {
          setOtpEmail('');
          setHintOtp('');
        }}
        resend={async () => {
          const r = await post<{ devOtp?: string }>('/auth/login-otp/request', { email: otpEmail });
          return r?.devOtp;
        }}
        onVerify={async (otp) => {
          const res = await post<{ accessToken: string; user?: any }>(
            '/auth/login-otp/verify',
            { email: otpEmail, otp }
          );
          await done(res.accessToken, res.user);
        }}
      />
    );
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const em = emailInput.trim();
    if (!em || !em.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setSubmitting(true);
    try {
      if (mode === 'otp') {
        const res = await post<{ message: string; devOtp?: string }>('/auth/login-otp/request', {
          email: em,
        });
        setOtpEmail(em);
        if (res?.devOtp) setHintOtp(res.devOtp);
      } else {
        if (!passwordInput) {
          setError('Password is required');
          setSubmitting(false);
          return;
        }
        const res = await post<{ accessToken: string; user?: any }>('/auth/login', {
          email: em,
          password: passwordInput,
        });
        await done(res.accessToken, res.user);
      }
    } catch (err) {
      const errMsg = msg(err);
      setError(errMsg);
      if (errMsg.includes('verify your email')) {
        setNeedVerify(em);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      {errorParam === 'admin_required' && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-900 font-medium">
          <strong>Admin Privileges Required:</strong> Only authorized administrators can access the control studio. Please sign in with an admin account (e.g. <span className="font-mono font-bold">admin@wayfarer.com</span>).
        </div>
      )}

      <GoogleButton onSuccess={() => router.push(next || '/account')} />

      <div className="relative flex items-center justify-center">
        <div className="w-full border-t border-lake/10" />
        <span className="absolute bg-snow px-3 text-xs uppercase tracking-wider text-mist">
          or continue with
        </span>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>
        <div className="grid grid-cols-2 rounded-2xl bg-glacier/60 p-1 text-sm">
          {(['otp', 'password'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMode(m);
                setError('');
              }}
              className={`rounded-xl py-2 font-medium transition-all ${
                mode === m
                  ? 'bg-white text-lake shadow-sm'
                  : 'text-mist hover:text-lake'
              }`}
            >
              {m === 'otp' ? 'Instant OTP Code' : 'Password'}
            </button>
          ))}
        </div>

        <div>
          <label className="block text-xs font-semibold text-lake">Email address</label>
          <input
            type="email"
            required
            placeholder="you@domain.com or admin@wayfarer.com"
            autoComplete="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            className={field}
          />
        </div>

        {mode === 'password' && (
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-lake">Password</label>
              <Link
                href="/forgot-password"
                className="text-xs font-medium text-crocus hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className={field}
            />
          </div>
        )}

        <Err m={error} />

        <button
          disabled={submitting}
          className="btn btn-dark w-full shadow-lg shadow-lake/15 flex items-center justify-center gap-2"
        >
          {submitting ? <Loader2 className="animate-spin" size={16} /> : null}
          <span>
            {submitting
              ? 'Sending code…'
              : mode === 'otp'
              ? 'Send Verification Code (OTP)'
              : 'Sign in to Account'}
          </span>
        </button>
      </form>
    </div>
  );
}

const regSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next');
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [hintOtp, setHintOtp] = useState('');
  const [error, setError] = useState('');
  const [existingEmail, setExistingEmail] = useState('');
  const [isQuickLoggingIn, setIsQuickLoggingIn] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof regSchema>>({
    resolver: zodResolver(regSchema),
  });

  const handleQuickPasswordLogin = async () => {
    const vals = getValues();
    const em = (vals.email || existingEmail).trim();
    if (!em) return;
    setIsQuickLoggingIn(true);
    setError('');
    try {
      const res = await post<{ accessToken: string; user?: any }>('/auth/login', {
        email: em,
        password: vals.password,
      });
      setLoginSuccess(true);
      await signIn(res.accessToken, res.user);
      setTimeout(() => {
        const destination =
          next && next.startsWith('/')
            ? (next.startsWith('/admin') && res.user?.role !== 'admin' ? '/account?error=admin_required' : next)
            : (res.user?.role === 'admin' ? '/admin' : '/account');
        window.location.href = destination;
      }, 350);
    } catch (err) {
      setError(msg(err));
      setIsQuickLoggingIn(false);
    }
  };

  const handleQuickOtpLogin = async () => {
    const vals = getValues();
    const em = (vals.email || existingEmail).trim();
    if (!em) return;
    setIsQuickLoggingIn(true);
    setError('');
    try {
      const res = await post<{ message: string; devOtp?: string }>('/auth/login-otp/request', {
        email: em,
      });
      setEmail(em);
      if (res?.devOtp) setHintOtp(res.devOtp);
      setExistingEmail('');
    } catch (err) {
      setError(msg(err));
    } finally {
      setIsQuickLoggingIn(false);
    }
  };

  if (loginSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-8 text-center"
      >
        <CheckCircle2 className="mx-auto text-emerald-600 mb-3" size={40} />
        <h3 className="font-display text-xl font-bold text-lake">Welcome to Paradise Journey!</h3>
        <p className="mt-1 text-sm text-mist">Setting up your secure session…</p>
      </motion.div>
    );
  }

  if (email) {
    return (
      <OtpStep
        email={email}
        label="Verify and continue"
        hintOtp={hintOtp}
        onBack={() => {
          setEmail('');
          setHintOtp('');
        }}
        resend={async () => {
          const res = await post<{ devOtp?: string }>('/auth/resend-otp', { email, purpose: 'verify' });
          return res?.devOtp;
        }}
        onVerify={async (otp) => {
          let d: { accessToken: string; user?: any };
          try {
            d = await post<{ accessToken: string; user?: any }>(
              '/auth/verify-email',
              { email, otp }
            );
          } catch {
            d = await post<{ accessToken: string; user?: any }>(
              '/auth/login-otp/verify',
              { email, otp }
            );
          }
          setLoginSuccess(true);
          await signIn(d.accessToken, d.user);
          setTimeout(() => {
            const destination =
              next && next.startsWith('/')
                ? (next.startsWith('/admin') && d.user?.role !== 'admin' ? '/account?error=admin_required' : next)
                : (d.user?.role === 'admin' ? '/admin' : '/account');
            window.location.href = destination;
          }, 350);
        }}
      />
    );
  }

  return (
    <div className="space-y-5">
      <GoogleButton
        label="Sign up with Google"
        onSuccess={() => router.push(next || '/account')}
      />

      <div className="relative flex items-center justify-center">
        <div className="w-full border-t border-lake/10" />
        <span className="absolute bg-snow px-3 text-xs uppercase tracking-wider text-mist">
          or with email
        </span>
      </div>

      <form
        onSubmit={handleSubmit(async (v) => {
          setError('');
          setExistingEmail('');
          try {
            const res = await post<{ devOtp?: string }>('/auth/register', {
              name: v.name,
              email: v.email,
              password: v.password,
            });
            setEmail(v.email);
            if (res?.devOtp) setHintOtp(res.devOtp);
          } catch (e) {
            const m = msg(e);
            if (m.toLowerCase().includes('already registered')) {
              setExistingEmail(v.email);
            } else {
              setError(m);
            }
          }
        })}
        className="space-y-4"
        noValidate
      >
        <div>
          <label className="block text-xs font-semibold text-lake">Full name</label>
          <input
            autoComplete="name"
            placeholder="John Doe"
            {...register('name')}
            className={field}
          />
          <Err m={errors.name?.message} />
        </div>

        <div>
          <label className="block text-xs font-semibold text-lake">Email address</label>
          <input
            type="email"
            placeholder="you@domain.com"
            autoComplete="email"
            {...register('email')}
            className={field}
          />
          <Err m={errors.email?.message} />
        </div>

        <div>
          <label className="block text-xs font-semibold text-lake">Create password</label>
          <input
            type="password"
            placeholder="At least 8 characters"
            autoComplete="new-password"
            {...register('password')}
            className={field}
          />
          <Err m={errors.password?.message} />
        </div>

        <div>
          <label className="block text-xs font-semibold text-lake">Confirm password</label>
          <input
            type="password"
            placeholder="Repeat password"
            autoComplete="new-password"
            {...register('confirmPassword')}
            className={field}
          />
          <Err m={errors.confirmPassword?.message} />
        </div>

        {existingEmail && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-crocus/30 bg-crocus/10 p-4 space-y-2.5 text-left"
          >
            <div className="flex items-center gap-2 text-lake font-semibold text-xs">
              <Sparkles size={15} className="text-crocus" />
              <span>This email is already registered ({existingEmail})</span>
            </div>
            <p className="text-xs text-mist">
              An account already exists for this email. You can sign in directly with your password or use an instant OTP code:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={handleQuickPasswordLogin}
                disabled={isQuickLoggingIn}
                className="btn btn-dark text-xs py-2 px-3 flex items-center justify-center gap-1.5"
              >
                {isQuickLoggingIn ? <Loader2 className="animate-spin" size={13} /> : null}
                <span>Sign in with Password</span>
              </button>
              <button
                type="button"
                onClick={handleQuickOtpLogin}
                disabled={isQuickLoggingIn}
                className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-center gap-1.5"
              >
                <span>Instant OTP Sign In</span>
              </button>
            </div>
          </motion.div>
        )}

        <Err m={error} />

        <button
          disabled={isSubmitting}
          className="btn btn-dark w-full shadow-lg shadow-lake/15 flex items-center justify-center gap-2"
        >
          {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : null}
          <span>{isSubmitting ? 'Creating account…' : 'Create Free Account'}</span>
        </button>
      </form>
    </div>
  );
}

export function ForgotForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [ok, setOk] = useState(false);
  const cd = useCooldown();

  if (ok) {
    return (
      <div role="status" className="space-y-4 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-2">
          <CheckCircle2 size={28} />
        </div>
        <p className="rounded-2xl bg-emerald-50 p-4 text-sm font-medium text-emerald-900 border border-emerald-200">
          Your password has been successfully updated. You can now log in.
        </p>
        <button className="btn btn-dark w-full" onClick={() => router.push('/login')}>
          Go to Log In
        </button>
      </div>
    );
  }

  return sent ? (
    <form
      className="space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setError('');
        if (password.length < 8)
          return setError('Password must be at least 8 characters');
        try {
          await post('/auth/reset-password', { email, otp, password });
          setOk(true);
        } catch (er) {
          setError(msg(er));
        }
      }}
    >
      <div className="rounded-2xl bg-glacier/40 p-4 border border-lake/10">
        <p className="text-sm text-mist">
          Enter the code sent to <strong className="text-lake">{email}</strong> and pick your new password.
        </p>
      </div>
      <OtpInput value={otp} onChange={setOtp} />
      <div>
        <label className="block text-xs font-semibold text-lake">New password</label>
        <input
          type="password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={field}
        />
      </div>
      <Err m={error} />
      <button
        disabled={otp.length < 6}
        className="btn btn-dark w-full shadow-lg shadow-lake/15 disabled:opacity-50"
      >
        Update Password
      </button>
      <div className="text-center">
        <button
          type="button"
          disabled={cd.left > 0}
          onClick={async () => {
            await post('/auth/forgot-password', { email }).catch(() => {});
            cd.reset();
          }}
          className="text-xs font-semibold text-crocus hover:underline disabled:text-mist/70"
        >
          {cd.left > 0 ? `Resend code in ${cd.left}s` : 'Resend code'}
        </button>
      </div>
    </form>
  ) : (
    <form
      className="space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          await post('/auth/forgot-password', { email });
          setSent(true);
        } catch (er) {
          setError(msg(er));
        }
      }}
    >
      <div>
        <label className="block text-xs font-semibold text-lake">Your registered email</label>
        <input
          type="email"
          required
          placeholder="you@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={field}
        />
      </div>
      <Err m={error} />
      <button className="btn btn-dark w-full shadow-lg shadow-lake/15">
        Send Reset Code
      </button>
    </form>
  );
}

export function ResetPasswordForm() {
  return <ForgotForm />;
}

export function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get('email') || '';
  const { signIn } = useAuth();
  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const cd = useCooldown();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return setError('Email is required');
    if (otp.length < 6) return setError('Please enter the full 6-digit code');
    setBusy(true);
    setError('');
    try {
      const res = await post<{ accessToken: string; user?: any }>('/auth/verify-email', { email, otp });
      await signIn(res.accessToken, res.user);
      router.push('/account');
    } catch (er) {
      setError(msg(er));
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handleVerify} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-lake">Email address</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@domain.com"
          className={field}
        />
      </div>

      <div className="pt-2">
        <label className="block text-xs font-semibold text-lake mb-2">6-Digit Code</label>
        <OtpInput value={otp} onChange={setOtp} />
      </div>

      <Err m={error} />

      <button
        disabled={busy || otp.length < 6}
        className="btn btn-dark w-full shadow-lg shadow-lake/15 flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {busy ? <Loader2 className="animate-spin" size={16} /> : null}
        <span>{busy ? 'Verifying…' : 'Verify Email'}</span>
      </button>

      <div className="text-center">
        <button
          type="button"
          disabled={cd.left > 0 || !email}
          onClick={async () => {
            await post('/auth/resend-otp', { email, purpose: 'verify' }).catch(() => {});
            cd.reset();
          }}
          className="text-xs font-semibold text-crocus hover:underline disabled:text-mist/70"
        >
          {cd.left > 0 ? `Resend code in ${cd.left}s` : 'Resend verification code'}
        </button>
      </div>
    </form>
  );
}
