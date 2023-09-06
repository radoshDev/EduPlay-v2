import { supabase } from '@/lib/supabaseClient'
import type { TaskCategoryTree } from '@/types/task'

const getCategoriesHandler = async (): Promise<TaskCategoryTree[]> => {
  const res = await supabase.from('task_categories').select(
    `*, 
			subcategories: task_subcategories!task_subcategories_parentSlug_fkey(slug, title, parentSlug, imageUrl, difficulty, position)`
  )
  if (res.error)
    throw new Error(res.error.message || 'Something wrong with getting tasks')
  return res.data
}

export default getCategoriesHandler
