import { supabase } from '@/lib/supabaseClient'

type Input = {
  studentId: string
  roundLength: number
  action: 'add' | 'subtract'
  date: string
}

const saveProgressHandler = async ({
  date,
  roundLength,
  studentId,
  action
}: Input) => {
  const existProgressRes = await supabase
    .from('students_progress')
    .select()
    .match({ student_id: studentId, date })
  const existProgress = existProgressRes.data?.[0]

  if (!existProgress) {
    await supabase
      .from('students_progress')
      .insert({ date, student_id: studentId, value: roundLength })
  } else {
    const newValue =
      action === 'add'
        ? existProgress.value + roundLength
        : existProgress.value - roundLength
    await supabase
      .from('students_progress')
      .update({ value: newValue })
      .match({ student_id: studentId, date })
  }
}

export default saveProgressHandler
