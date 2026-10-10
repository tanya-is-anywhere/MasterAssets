import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { getMe, login as apiLogin, register as apiRegister } from '../api';
import { clearTokens, getToken, setTokens } from '../../../shared/api';
import type { User } from '../../../entities';

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    getMe()
      .then(setUser)
      .catch(() => clearTokens())
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const { access_token, refresh_token } = await apiLogin({ email, password });
      setTokens(access_token, refresh_token);
      const me = await getMe();
      setUser(me);
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(
    async (email: string, name: string, password: string) => {
      setLoading(true);
      try {
        await apiRegister({ email, name, password });
        const { access_token, refresh_token } = await apiLogin({ email, password });
        setTokens(access_token, refresh_token);
        const me = await getMe();
        setUser(me);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const logout = useCallback(() => {
    clearTokens();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}