'use client';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { API } from './api';

export interface User { _id: string; name: string; email: string; role: string; emailVerified: boolean }
interface Ctx { user: User | null; token: string | null; loading: boolean; signIn: (accessToken: string) => Promise<void>; signOut: () => Promise<void> }
const AuthCtx = createContext<Ctx>({ user: null, token: null, loading: true, signIn: async () => {}, signOut: async () => {} });
export const useAuth = () => useContext(AuthCtx);

/** Access token lives in memory only. The httpOnly refresh cookie restores the session on reload. */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const started = useRef(false);

  const loadUser = useCallback(async (t: string) => {
    const r = await fetch(`${API}/auth/me`, { headers: { Authorization: `Bearer ${t}` } });
    if (r.ok) setUser((await r.json()).data);
  }, []);

  const signIn = useCallback(async (t: string) => { setToken(t); await loadUser(t); }, [loadUser]);

  useEffect(() => {
    if (started.current) return; // avoid double refresh in React strict mode (tokens rotate)
    started.current = true;
    (async () => {
      try {
        const r = await fetch(`${API}/auth/refresh`, { method: 'POST', credentials: 'include' });
        if (r.ok) await signIn((await r.json()).data.accessToken);
      } catch { /* offline or API down: stay logged out */ }
      setLoading(false);
    })();
  }, [signIn]);

  const signOut = useCallback(async () => {
    if (token) await fetch(`${API}/auth/logout`, { method: 'POST', credentials: 'include', headers: { Authorization: `Bearer ${token}` } }).catch(() => {});
    setToken(null); setUser(null);
  }, [token]);

  return <AuthCtx.Provider value={{ user, token, loading, signIn, signOut }}>{children}</AuthCtx.Provider>;
}
