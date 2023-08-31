import { supabase } from '@/lib/supabaseClient'

const logoutHandler = async () => {
  const res = await supabase.auth.signOut()
  return res
}

export default logoutHandler
