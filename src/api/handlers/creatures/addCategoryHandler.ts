import { supabase } from '@/lib/supabaseClient'
import type { CreatureCategoryInput } from '@/schemas/CreatureSchema'
import type { CreatureCategory } from '@/types/db'

const addCategoryHandler = async (
  input: CreatureCategoryInput
): Promise<CreatureCategory> => {
  const res = await supabase.from('creature_categories').insert(input).select()
  if (res.error) throw new Error(res.error.message || 'Problem to add category')
  return res.data[0]
}

export default addCategoryHandler
