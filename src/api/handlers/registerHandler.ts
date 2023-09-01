import { supabase } from '@/lib/supabaseClient'
import type { RegisterInput } from '@/schemas/AuthSchema'

const registerHandler = async (userCred: RegisterInput): Promise<void> => {
  const res = await supabase.auth.signUp({
    email: userCred.email,
    password: userCred.password,
    options: {
      data: {
        name: userCred.name
      }
    }
  })
  if (res.error) throw new Error(res.error.message || 'Failed to register:(')
}

export default registerHandler
