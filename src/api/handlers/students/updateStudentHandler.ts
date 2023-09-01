import { supabase } from '@/lib/supabaseClient'
import type { Student } from '@/types/db'

const updateStudentHandler = async (input: Student) => {
  const res = await supabase
    .from('students')
    .update(input)
    .eq('id', input.id)
    .select()
  if (res.error) throw new Error(res.error.message || 'Failed to update user:(')
  return res.data[0]
}

export default updateStudentHandler
