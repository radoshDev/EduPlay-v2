import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import format from 'date-fns/format'
import type { StudentWithProgress, Student } from '@/types/db'
import type { QueryData } from '@/types'
import api from '@/api/api'

export const useStudentStore = defineStore('studentStore', () => {
  const students = reactive<QueryData<StudentWithProgress[] | null>>({
    data: null,
    isLoading: false,
    error: ''
  })
  const studentId = ref<string | null>(null)

  const currentStudent = computed(
    () => students.data?.find((student) => student.id === studentId.value)
  )

  const roundLength = computed(() => currentStudent.value?.roundLength || 5)

  async function setStudents(userId: string) {
    try {
      students.isLoading = true
      students.error = ''
      const data = await api.students.getStudents(userId)
      students.data = data
    } catch (_error) {
      const error = _error as Error
      students.error = error.message || 'Unhandled students error'
    } finally {
      students.isLoading = false
    }
  }
  function updateStudents(newStudent: Student) {
    const newStudentWithProgress = { ...newStudent, progress: [] }
    if (!students.data) {
      students.data = [newStudentWithProgress]
      return
    }
    const existStudent = students.data.find(
      (student) => student.id === newStudent.id
    )
    if (existStudent) {
      existStudent.avatar = newStudent.avatar
      existStudent.difficulty = newStudent.difficulty
      existStudent.name = newStudent.name
      existStudent.roundLength = newStudent.roundLength
      return
    }
    students.data.push(newStudentWithProgress)
  }
  function saveStudentProgress(action: 'add' | 'subtract') {
    if (!currentStudent.value) return
    const today = format(new Date(), 'dd-MM-yyyy')
    const existProgress = currentStudent.value.progress.find(
      (item) => item.date === today
    )

    if (!existProgress && action === 'subtract') return

    if (!existProgress) {
      currentStudent.value.progress.push({
        date: today,
        student_id: currentStudent.value.id,
        id: 0,
        value: currentStudent.value.roundLength
      })
      api.students.saveProgress({
        newValue: currentStudent.value.roundLength,
        studentId: currentStudent.value.id,
        date: today
      })
      return
    }
    if (action === 'add') {
      existProgress.value += currentStudent.value.roundLength
    } else {
      existProgress.value -= currentStudent.value.roundLength
    }
    api.students.saveProgress({
      newValue: existProgress.value,
      studentId: currentStudent.value.id,
      date: today
    })
  }
  function $reset() {
    students.data = []
  }
  return {
    students,
    studentId,
    currentStudent,
    roundLength,
    setStudents,
    updateStudents,
    saveStudentProgress,
    $reset
  }
})