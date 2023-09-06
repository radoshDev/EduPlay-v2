import getSortedStudents from '@/helpers/getSortedStudents'
import { supabase } from '@/lib/supabaseClient'
import type { StudentWithProgress } from '@/types/db'

const getStudentsHandler = async (
  userId: string
): Promise<StudentWithProgress[]> => {
  const res = await supabase
    .from('students')
    .select(`*, progress: students_progress(id, student_id, date, value)`)
    .eq('userId', userId)
    .order('name')

  if (!res.data) throw new Error(res.error.message || 'Students not found:(')

  return getSortedStudents(res.data)
}

export default getStudentsHandler
