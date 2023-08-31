import { supabase } from '@/lib/supabaseClient'
import type { Student } from '@/types/db'

const getStudentsHandler = async (userId: string): Promise<Student[]> => {
  const res = await supabase.from('students').select().eq('userId', userId)

  if (!res.data) throw new Error(res.error.message || 'Students not found:(')

  return res.data
}

export default getStudentsHandler
