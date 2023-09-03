import { useStudentStore } from '@/stores/student/studentStore'
import type { NavigationGuard } from 'vue-router'

export const setStudentIdHandler: NavigationGuard = (to, from, next) => {
  const studentId = to.params.studentId as string
  const studentStore = useStudentStore()

  if (studentStore.studentId !== studentId) {
    console.log('studentId settled', studentId)

    studentStore.studentId = studentId
  }
  next()
}
