import { supabase } from '@/lib/supabaseClient'
import type { Task } from '@/types/db'

const getTasksHandler = async (): Promise<Task[]> => {
  const res = await supabase.from('tasks').select()
  if (res.error)
    throw new Error(res.error.message || 'Something wrong with getting tasks')
  return res.data
}

export default getTasksHandler
