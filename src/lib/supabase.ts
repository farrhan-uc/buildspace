import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'demo-anon-key';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'demo-service-role-key';

export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

const options = {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, options);

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});

export type AuthRole = 'Homeowner' | 'Contractor' | 'Builder' | 'Engineer' | 'Supplier';

export type AppUser = {
  id: string;
  email: string;
  role?: AuthRole;
  name?: string;
};

type MockSession = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  user: {
    id: string;
    email: string;
    app_metadata: { provider: string };
    user_metadata: { full_name: string; role?: string };
  };
};

const mockSession: MockSession = {
  access_token: 'mock-access-token',
  refresh_token: 'mock-refresh-token',
  expires_in: 3600,
  token_type: 'bearer',
  user: {
    id: 'demo-user-id',
    email: 'demo@buildspace.app',
    app_metadata: { provider: 'email' },
    user_metadata: { full_name: 'BuildSpace Demo User', role: 'Homeowner' },
  },
};

const getStoredSession = () => {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem('buildspace-session');
  return raw ? JSON.parse(raw) : null;
};

const persistSession = (session: MockSession | null) => {
  if (typeof window === 'undefined') return;
  if (session) {
    window.localStorage.setItem('buildspace-session', JSON.stringify(session));
  } else {
    window.localStorage.removeItem('buildspace-session');
  }
};

export const mockAuth = {
  async signInWithPassword(input: { email: string; password: string }) {
    if (!isSupabaseConfigured) {
      const session = {
        ...mockSession,
        user: {
          ...mockSession.user,
          email: input.email,
          user_metadata: {
            full_name: input.email.split('@')[0],
            role: 'Homeowner',
          },
        },
      };
      persistSession(session);
      return { data: { user: session.user, session }, error: null };
    }

    return supabase.auth.signInWithPassword(input);
  },

  async signUpWithPassword(input: { email: string; password: string; options?: { data?: Record<string, unknown> } }) {
    if (!isSupabaseConfigured) {
      const session = {
        ...mockSession,
        user: {
          ...mockSession.user,
          email: input.email,
          user_metadata: {
            full_name: input.email.split('@')[0],
            ...input.options?.data,
          },
        },
      };
      persistSession(session);
      return { data: { user: session.user, session }, error: null };
    }

    return supabase.auth.signUp(input);
  },

  async signInWithOAuth(provider: 'google') {
    if (!isSupabaseConfigured) {
      const session = {
        ...mockSession,
        user: {
          ...mockSession.user,
          email: 'google-user@buildspace.app',
          user_metadata: { full_name: 'Google Demo User', role: 'Builder' },
        },
      };
      persistSession(session);
      return { data: { user: session.user, session }, error: null };
    }

    return supabase.auth.signInWithOAuth({ provider });
  },

  async signOut() {
    persistSession(null);
    if (!isSupabaseConfigured) {
      return { error: null };
    }
    return supabase.auth.signOut();
  },

  async getSession() {
    if (!isSupabaseConfigured) {
      const session = getStoredSession();
      return { data: { session }, error: null };
    }
    return supabase.auth.getSession();
  },
};

export const currentUser = (): AppUser | null => {
  if (typeof window === 'undefined') return null;
  const session = getStoredSession();
  if (!session) return null;

  return {
    id: session.user.id,
    email: session.user.email,
    role: (session.user.user_metadata?.role as AuthRole) || 'Homeowner',
    name: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
  };
};
