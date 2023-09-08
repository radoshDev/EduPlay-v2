import { supabase } from '@/lib/supabaseClient'
import type { CategoryWithCreatures } from '@/types/db'

const getCreaturesHandler = async (): Promise<CategoryWithCreatures[]> => {
  const res = await supabase
    .from('creature_categories')
    .select(
      '*, creatures(slug, title, categorySlug, description, source, mainImage, media)'
    )
    .order('slug')
  if (res.error)
    throw new Error(
      res.error.message || 'Something wrong with getting creatures'
    )
  return res.data
}

export default getCreaturesHandler
