import { useStudentStore } from '@/stores/student/studentStore'
import { useTaskStore } from '@/stores/task/taskStore'
import type { NavigationGuard } from 'vue-router'

function setStudentId(studentId: string) {
  const studentStore = useStudentStore()

  if (studentStore.studentId !== studentId) {
    console.log('studentId settled', studentId)
    studentStore.studentId = studentId
  }
}

function setTaskType(taskType: string) {
  const taskStore = useTaskStore()

  if (taskStore.taskType !== taskType) {
    console.log('taskType settled', taskType)
    taskStore.taskType = taskType
  }
}

export const setParamsHandler: NavigationGuard = (to, from, next) => {
  const studentId = to.params.studentId as string | undefined
  const taskType = to.params.taskType as string | undefined
  if (studentId) setStudentId(studentId)
  if (taskType) setTaskType(taskType)
  next()
}
