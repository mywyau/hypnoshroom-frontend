export function useApplicationIdentity() {
  const user = useAccountUser()
  const guest = useState<{ email: string; token: string } | null>('verified-applicant', () => null)
  const email = computed(() => user.value?.email_confirmed_at ? user.value.email : guest.value?.email)
  async function headers(): Promise<Record<string,string>> {
    if (user.value?.email_confirmed_at) {
      const { data, error } = await useAccountClient().auth.getSession()
      if (error || !data.session || data.session.user.id !== user.value.id) throw new Error('Sign in again.')
      return { Authorization: 'Bearer ' + data.session.access_token }
    }
    if (guest.value) return { 'X-Application-Session': guest.value.token }
    throw new Error('Verify your email.')
  }
  function failure(error: unknown, fallback: string) {
    const response = error as { statusCode?: number; data?: { statusMessage?: string } }
    if (response?.statusCode === 401) guest.value = null
    return response?.data?.statusMessage || fallback
  }
  return { user, guest, email, headers, failure }
}

export interface ApplicationReceipt {
  id: string
  role_title: string
  recipient: string
  submitted_at: string
}
