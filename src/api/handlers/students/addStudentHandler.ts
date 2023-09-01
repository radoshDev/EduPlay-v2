import { supabase } from '@/lib/supabaseClient'
import type { Student } from '@/types/db'

const addStudentHandler = async (
  input: Omit<Student, 'id'>
): Promise<Student> => {
  const res = await supabase.from('students').insert(input).select()
  if (res.error) throw new Error(res.error.message)
  return res.data[0]
}

export default addStudentHandler
