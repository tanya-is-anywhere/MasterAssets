import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import type { User } from '../types';

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  async function login(email: string, _password: string): Promise<void> {
    setLoading(true);
    try {
      // TODO: заменить на реальный запрос к FastAPI
      await new Promise((resolve) => setTimeout(resolve, 500));

      const fakeUser: User = {
        id: 1,
        email,
        name: email.split('@')[0],
        createdAt: new Date().toISOString(),
      };

      setUser(fakeUser);
    } finally {
      setLoading(false);
    }
  }

  function logout(): void {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
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