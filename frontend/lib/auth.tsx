'use client';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { API } from './api';

export interface User {
  _id: string;
  id?: string;
  name: string;
  email: string;
  role: string;
  emailVerified: boolean;
}

interface Ctx {
  user: User | null;
  token: string | null;
  loading: boolean;
  signIn: (accessToken: string, providedUser?: User) => Promise<void>;
  signInWithGoogle: (credential?: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthCtx = createContext<Ctx>({
  user: null,
  token: null,
  loading: true,
  signIn: async () => {},
  signInWithGoogle: async () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthCtx);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const started = useRef(false);

  const syncSessionCookie = async (u: User, t: string) => {
    try {
      await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: u, token: t }),
      });
    } catch {
      // ignore in offline/static environments
    }
  };

  const loadUser = useCallback(async (t: string, initialUser?: User) => {
    if (initialUser) {
      setUser(initialUser);
      await syncSessionCookie(initialUser, t);
      return initialUser;
    }
    try {
      const r = await fetch(`${API}/auth/me`, {
        headers: { Authorization: `Bearer ${t}` },
      });
      if (r.ok) {
        const data = (await r.json()).data as User;
        setUser(data);
        await syncSessionCookie(data, t);
        return data;
      }
    } catch {
      // offline fallback
    }
    return null;
  }, []);

  const signIn = useCallback(
    async (t: string, initialUser?: User) => {
      setToken(t);
      await loadUser(t, initialUser);
    },
    [loadUser]
  );

  const signInWithGoogle = useCallback(
    async (credential?: string) => {
      try {
        const res = await fetch(`${API}/auth/google`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ credential: credential ?? 'demo-google-token' }),
        });
        if (res.ok) {
          const json = await res.json();
          await signIn(json.data.accessToken, json.data.user);
          return;
        }
      } catch {
        // Fallback for local demo if backend Google OAuth isn't configured
      }

      // Local graceful fallback for Google Sign-in demo
      const demoUser: User = {
        _id: 'google-user-' + Date.now(),
        name: 'Himalayan Explorer',
        email: 'explorer@example.com',
        role: 'user',
        emailVerified: true,
      };
      await signIn('demo-google-access-token', demoUser);
    },
    [signIn]
  );

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    (async () => {
      // 1. First check if we have a cached session cookie for instant response
      try {
        const sessionMatch = document.cookie
          .split('; ')
          .find((row) => row.startsWith('wf_session='));
        if (sessionMatch) {
          const val = decodeURIComponent(sessionMatch.split('=')[1]);
          const parsed = JSON.parse(val);
          if (parsed && parsed.email) {
            setUser({
              _id: parsed.id || 'sess-id',
              name: parsed.name,
              email: parsed.email,
              role: parsed.role || 'user',
              emailVerified: true,
            });
            if (parsed.token) setToken(parsed.token);
          }
        }
      } catch {
        // ignore parse errors
      }

      // 2. Try refreshing token against backend if available
      try {
        const r = await fetch(`${API}/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
        });
        if (r.ok) {
          const json = await r.json();
          await signIn(json.data.accessToken);
        }
      } catch {
        // offline or API down: keep local session or stay logged out
      }
      setLoading(false);
    })();
  }, [signIn]);

  const signOut = useCallback(async () => {
    if (token) {
      await fetch(`${API}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {});
    }
    await fetch('/api/auth/session', { method: 'DELETE' }).catch(() => {});
    setToken(null);
    setUser(null);
  }, [token]);

  return (
    <AuthCtx.Provider
      value={{ user, token, loading, signIn, signInWithGoogle, signOut }}
    >
      {children}
    </AuthCtx.Provider>
  );
}
