import api from '@/api/api'
import type { QueryData } from '@/types'
import type { Task } from '@/types/db'
import type { TaskStudentProgress } from '@/types/task'
import { defineStore, storeToRefs } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useCreatureStore } from '../creature/creatureStore'
import { useStudentStore } from '../student/studentStore'
import generateUniqueList from '@/helpers/generateUniqueList'

export const useTaskStore = defineStore('taskStore', () => {
  const creatureStore = useCreatureStore()
  const { currentStudent, roundLength } = storeToRefs(useStudentStore())

  const tasks = reactive<QueryData<Task[] | null>>({
    data: null,
    isLoading: false,
    error: ''
  })

  const progress = reactive<TaskStudentProgress>({})

  const taskType = ref<string | null>(null)
  const tasksList = computed(() => {
    if (!tasks.data) return []
    const filteredData = tasks.data.filter(
      (task) => task.type === taskType.value
    )
    return filteredData.length > 0 ? filteredData : tasks.data
  })
  const currentTaskRound = computed(() => {
    const studentId = currentStudent.value?.id
    if (!studentId || !taskType.value) return undefined
    return progress[studentId]?.[taskType.value]
  })

  const isRoundEnd = computed(() => {
    if (!currentStudent.value || !currentTaskRound.value) return false
    return currentTaskRound.value.index === roundLength.value
  })
  const isBeforeRoundEnd = computed(() => {
    if (!currentStudent.value || !currentTaskRound.value) return false
    return currentTaskRound.value.index === roundLength.value - 1
  })

  const currentTask = computed(() => {
    if (!currentTaskRound.value) return undefined
    return currentTaskRound.value.roundTasks[currentTaskRound.value.index]
  })

  async function setTasks() {
    try {
      tasks.isLoading = true
      tasks.error = ''
      const data = await api.tasks.getTasks()
      tasks.data = data
    } catch (_error) {
      const error = _error as Error
      tasks.error = error.message || 'Unhandled tasks error'
    } finally {
      tasks.isLoading = false
    }
  }

  function initiateTask() {
    const studentId = currentStudent.value?.id
    const randomCreature = creatureStore.getRandomCreature()

    if (!studentId || !randomCreature || !taskType.value || !tasks.data) return

    if (!progress[studentId]) {
      progress[studentId] = {}
    }
    const currentTask = progress[studentId]![taskType.value]

    if (currentTask && (currentTask.earned > 0 || currentTask.index > 0)) {
      currentTask.showResetModal = true
      return
    }

    if (currentTask) return

    progress[studentId]![taskType.value] = {
      showResetModal: false,
      earned: 0,
      index: 0,
      roundTasks: generateUniqueList(tasksList.value, roundLength.value),
      creature: randomCreature
    }
  }

  function nextRound() {
    const randomCreature = creatureStore.getRandomCreature()
    if (!currentTaskRound.value || !randomCreature) return

    currentTaskRound.value.index = 0
    currentTaskRound.value.creature = randomCreature
    currentTaskRound.value.roundTasks = generateUniqueList(
      tasksList.value,
      roundLength.value
    )
  }
  return {
    tasks,
    taskType,
    currentTaskRound,
    isRoundEnd,
    isBeforeRoundEnd,
    currentTask,
    setTasks,
    initiateTask,
    nextRound
  }
})
