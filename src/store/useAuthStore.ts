import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  subscriptionStatus?: string;
  subscriptionPlan?: string;
  subscriptionEndDate?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isInitialized: boolean;
  setAuth: (user: User, token: string | null) => void;
  logout: () => void;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isInitialized: false,
  setAuth: (user, token) => set({ user, token }),
  logout: async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {}
    set({ user: null, token: null });
  },
  initialize: async () => {
    if (get().isInitialized) return;
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        set({ user: data.user, token: data.token, isInitialized: true });
      } else {
        set({ isInitialized: true });
      }
    } catch (e) {
      set({ isInitialized: true });
    }
  },
}));
