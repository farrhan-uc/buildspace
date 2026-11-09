import { createClient } from '@/lib/supabase/client';

export const isSupabaseConfigured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
export type AuthRole = 'Homeowner' | 'Contractor' | 'Builder' | 'Engineer' | 'Supplier';
export type AppUser = { id: string; email: string; role?: AuthRole; name?: string };

export const supabase = createClient();

export const authErrorMessage = (message: string, mode: 'login' | 'signup' = 'login') => {
  if (/invalid login credentials|user not found|already registered|email.*exist/i.test(message)) {
    return mode === 'signup' ? 'This email may already be registered. Try signing in.' : 'Invalid email or password.';
  }
  if (/confirm|verify/i.test(message)) return 'Please confirm your email before signing in.';
  if (/password.*(8|weak)/i.test(message)) return 'Password must be at least 8 characters.';
  if (/rate limit|too many/i.test(message)) return 'Too many attempts. Please try again later.';
  return 'Something went wrong. Please try again.';
};

export async function getCurrentUser(): Promise<AppUser | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  return { id: user.id, email: user.email ?? '', name: user.user_metadata?.name, role: user.user_metadata?.role };
}
