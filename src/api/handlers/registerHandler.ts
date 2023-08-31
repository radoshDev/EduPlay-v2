import { supabase } from '@/lib/supabaseClient'
import type { RegisterInput } from '@/schemas/AuthSchema'

const registerHandler = async ({ email, name, password }: RegisterInput): Promise<void> => {
  const res = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name
      }
    }
  })

  console.log({ authUser: res.data.user })
}

export default registerHandler
