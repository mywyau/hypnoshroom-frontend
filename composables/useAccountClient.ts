import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | undefined

export function useAccountClient() {
  const config = useRuntimeConfig().public
  if (!import.meta.client) throw new Error('Account sessions require a browser')
  client ??= createClient(config.employerSupabaseUrl, config.employerSupabaseKey, {
    auth: { flowType: 'pkce', detectSessionInUrl: false, storageKey: 'hypnoshroom-employers' },
  })
  return client
}
