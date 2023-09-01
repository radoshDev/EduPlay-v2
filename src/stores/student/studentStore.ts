import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type { Student } from '@/types/db'
import type { QueryData } from '@/types'
import api from '@/api/api'

export const useStudentStore = defineStore('studentStore', () => {
  const students = reactive<QueryData<Student[] | null>>({
    data: null,
    isLoading: false,
    error: ''
  })

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
    if (!students.data) {
      students.data = [newStudent]
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
    students.data.push(newStudent)
  }
  function $reset() {
    students.data = []
  }
  return { setStudents, updateStudents, students, $reset }
})
