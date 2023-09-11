import { supabase } from '@/lib/supabaseClient'
import type { CreatureCategoryInput } from '@/schemas/CreatureSchema'
import type { CreatureCategory } from '@/types/db'

const updateCategoryHandler = async (
  input: CreatureCategoryInput
): Promise<CreatureCategory> => {
  const res = await supabase
    .from('creature_categories')
    .update(input)
    .eq('slug', input.slug)
    .select()
  if (res.error)
    throw new Error(res.error.message || 'Problem to update category')
  return res.data[0]
}

export default updateCategoryHandler
