import { supabase } from '@/lib/supabaseClient'

type Input = {
  studentId: string
  newValue: number
  date: string
}

const saveProgressHandler = async ({
  date,
  newValue,
  studentId
}: Input): Promise<void> => {
  const res = await supabase
    .from('students_progress')
    .upsert(
      { date, student_id: studentId, value: newValue },
      { onConflict: 'student_id,date' }
    )
    .select()
  if (res.error) console.error({ error: res.error })
}

export default saveProgressHandler
