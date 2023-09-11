import { supabase } from '@/lib/supabaseClient'
import type { CategoryWithCreatures } from '@/types/db'
type Slug = CategoryWithCreatures['slug']
const deleteCategoryHandler = async (categorySlug: Slug): Promise<void> => {
  const res = await supabase
    .from('creature_categories')
    .delete()
    .eq('slug', categorySlug)
  if (res.error) throw new Error(res.error.message || 'Problem to delete:(')
}

export default deleteCategoryHandler
