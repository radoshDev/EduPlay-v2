import type { TaskStudentProgress } from '@/types/task'
import { defineStore, storeToRefs } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useCreatureStore } from '../creature/creatureStore'
import { useStudentStore } from '../student/studentStore'
import generateUniqueList from '@/helpers/generateUniqueList'
import useLibraryStore from '../library/libraryStore'
import type { Task } from '@/types/db'

export const useTaskStore = defineStore('taskStore', () => {
  const creatureStore = useCreatureStore()
  const { currentStudent, roundLength } = storeToRefs(useStudentStore())
  const { tasks, categories } = storeToRefs(useLibraryStore())

  const progress = reactive<TaskStudentProgress>({})

  const taskType = ref<string | null>(null)

  const isOptionModal = ref(false)

  const tasksList = computed(() => {
    if (!tasks.value.data) return []

    if (taskType.value === 'coins') return tasks.value.data

    let filterCb: (task: Task) => boolean
    const isCategoryType = categories.value.data?.some(
      (category) => category.slug === taskType.value
    )
    if (isCategoryType) {
      filterCb = (task) => task.type === taskType.value
    } else {
      filterCb = (task) => task.subcategorySlug === taskType.value
    }

    const filteredData = tasks.value.data.filter(filterCb)
    return filteredData.length > 0 ? filteredData : tasks.value.data
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

  function initiateTask() {
    const studentId = currentStudent.value?.id
    const randomCreature = creatureStore.getRandomCreature()

    if (!studentId || !randomCreature || !taskType.value || !tasks.value.data)
      return

    if (!progress[studentId]) {
      progress[studentId] = {}
    }
    const currentTask = progress[studentId]![taskType.value]

    if (currentTask) return

    progress[studentId]![taskType.value] = {
      earned: 0,
      index: 0,
      roundTasks: generateUniqueList(tasksList.value, roundLength.value),
      creature: randomCreature
    }
  }

  function resetTask() {
    const randomCreature = creatureStore.getRandomCreature()

    if (!currentTaskRound.value || !randomCreature) return

    currentTaskRound.value.earned = 0
    currentTaskRound.value.index = 0
    currentTaskRound.value.roundTasks = generateUniqueList(
      tasksList.value,
      roundLength.value
    )
    currentTaskRound.value.creature = randomCreature
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
    taskType,
    currentTaskRound,
    isOptionModal,
    isRoundEnd,
    isBeforeRoundEnd,
    currentTask,
    initiateTask,
    resetTask,
    nextRound
  }
})
