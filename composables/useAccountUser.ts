import type { User } from '@supabase/supabase-js'

export const useAccountUser = () => useState<User | null>('account-user', () => null)
