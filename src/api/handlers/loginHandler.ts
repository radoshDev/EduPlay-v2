import { supabase } from '@/lib/supabaseClient'
import type { LoginInput } from '@/schemas/AuthSchema'

const loginHandler = async (data: LoginInput): Promise<void> => {
  const res = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password
  })
  if (res.error) throw new Error(res.error.message || 'Failed to login:(')
}

export default loginHandler
