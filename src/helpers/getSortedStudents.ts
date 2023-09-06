import compareAsc from 'date-fns/compareAsc'
import parseDate from 'date-fns/parse'
import type { StudentWithProgress } from '@/types/db'

const getSortedStudents = (
  students: StudentWithProgress[]
): StudentWithProgress[] => {
  return students.map((student) => ({
    ...student,
    progress: [...student.progress].sort((a, b) =>
      compareAsc(
        parseDate(a.date, 'dd-MM-yyyy', new Date()),
        parseDate(b.date, 'dd-MM-yyyy', new Date())
      )
    )
  }))
}

export default getSortedStudents
