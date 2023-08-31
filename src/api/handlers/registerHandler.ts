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

  console.log({ authUser: res.data.user })
}

export default registerHandler
