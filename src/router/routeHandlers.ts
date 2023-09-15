import { useCreatureStore } from '@/stores/creature/creatureStore'
import { useLibraryStore } from '@/stores/library/libraryStore'
import { useStudentStore } from '@/stores/student/studentStore'
import { useTaskStore } from '@/stores/task/taskStore'
import type { NavigationGuard } from 'vue-router'

function setStudentId(studentId: string) {
  const studentStore = useStudentStore()

  if (studentStore.studentId !== studentId) {
    studentStore.studentId = studentId
  }
}

function setTaskType(taskType: string) {
  const taskStore = useTaskStore()

  if (taskStore.taskType !== taskType) {
    taskStore.taskType = taskType
  }
}

export const setParamsHandler: NavigationGuard = (to, from, next) => {
  const studentId = to.params.studentId as string | undefined
  const taskType = to.params.taskType as string | undefined
  const category = to.params.category as string | undefined
  const subcategory = to.params.subcategory as string | undefined
  const taskId = to.params.taskId as string | undefined
  const categorySlug = to.params.categorySlug as string | undefined
  const creatureSlug = to.params.creatureSlug as string | undefined

  if (studentId) {
    setStudentId(studentId)
    localStorage.setItem('studentId', studentId)
  }
  if (taskType) setTaskType(taskType)
  if (category || subcategory || taskId) {
    const libraryStore = useLibraryStore()
    libraryStore.setPageParams({ category, subcategory, task: taskId })
  }
  if (categorySlug || creatureSlug) {
    const creatureStore = useCreatureStore()
    creatureStore.setPageParams({
      category: categorySlug,
      creature: creatureSlug
    })
  }
  next()
}
