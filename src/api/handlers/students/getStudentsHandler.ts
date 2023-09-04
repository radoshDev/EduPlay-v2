import { supabase } from '@/lib/supabaseClient'
import type { StudentWithProgress } from '@/types/db'

const getStudentsHandler = async (
  userId: string
): Promise<StudentWithProgress[]> => {
  const res = await supabase
    .from('students')
    .select(`*, progress: students_progress(id, student_id, date, value)`)
    .eq('userId', userId)

  if (!res.data) throw new Error(res.error.message || 'Students not found:(')

  return res.data
}

export default getStudentsHandler
