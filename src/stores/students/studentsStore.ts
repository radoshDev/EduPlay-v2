import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type { Student } from '@/types/db'
import type { QueryData } from '@/types'
import api from '@/api/api'

export const useStudentsStore = defineStore('studentsStore', () => {
  const students = reactive<QueryData<Student[]>>({
    data: [],
    isLoading: false,
    error: ''
  })

  async function setStudents(userId: string) {
    try {
      students.isLoading = true
      students.error = ''
      const data = await api.students.getStudents(userId)
      students.data = data
    } catch (error) {
      if (error instanceof Error) {
        students.error = error.message
      }
      students.error = 'Unhandled students error'
    } finally {
      students.isLoading = false
    }
  }

  function $reset() {
    students.data = []
  }
  return { setStudents, students, $reset }
})
