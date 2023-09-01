import { supabase } from '@/lib/supabaseClient'

const getCreaturesHandler = async () => {
  const res = await supabase.from('creatures').select().order('categorySlug')
  if (res.error)
    throw new Error(
      res.error.message || 'Something wrong with getting creatures'
    )
  return res.data
}

export default getCreaturesHandler
