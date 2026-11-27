import type { User } from '@supabase/supabase-js'

export const useAccountUser = () => useState<User | null | undefined>('account-user')

export function preferredName(user: User | null) {
  const name = user?.user_metadata?.preferred_name
  return typeof name === 'string' ? name.trim() : ''
}
