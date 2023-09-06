import { supabase } from '@/lib/supabaseClient'
import type { TaskWithDifficulty } from '@/types/db'

const getTasksHandler = async (): Promise<TaskWithDifficulty[]> => {
  const res = await supabase
    .from('tasks')
    .select('*, subcategory: task_subcategories(difficulty)')
  if (res.error)
    throw new Error(res.error.message || 'Something wrong with getting tasks')
  return res.data
}

export default getTasksHandler
