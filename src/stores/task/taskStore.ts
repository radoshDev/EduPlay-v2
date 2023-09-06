import type { TaskStudentProgress } from '@/types/task'
import { defineStore, storeToRefs } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useCreatureStore } from '../creature/creatureStore'
import { useStudentStore } from '../student/studentStore'
import generateUniqueList from '@/helpers/generateUniqueList'
import useLibraryStore from '../library/libraryStore'
import type { TaskWithDifficulty } from '@/types/db'

export const useTaskStore = defineStore('taskStore', () => {
  const creatureStore = useCreatureStore()
  const { studentId, roundLength, currentStudent } = storeToRefs(
    useStudentStore()
  )
  const { tasks, categories } = storeToRefs(useLibraryStore())

  const progress = reactive<TaskStudentProgress>({})

  const taskType = ref<string | null>(null)

  const isOptionModal = ref(false)

  const tasksList = computed(() => {
    if (!tasks.value.data) return []
    if (!currentStudent.value) return tasks.value.data

    const studentDifficulty = currentStudent.value.difficulty

    const dataFilteredByDifficulty = tasks.value.data.filter((task) => {
      if (!task.subcategory?.difficulty) return true
      return task.subcategory.difficulty <= studentDifficulty
    })

    if (taskType.value === 'coins') return dataFilteredByDifficulty

    let resultData: TaskWithDifficulty[]
    const isCategoryType = categories.value.data?.some(
      (category) => category.slug === taskType.value
    )
    if (isCategoryType) {
      resultData = dataFilteredByDifficulty.filter(
        (task) => task.type === taskType.value
      )
    } else {
      resultData = tasks.value.data.filter(
        (task) => task.subcategorySlug === taskType.value
      )
    }

    return resultData
  })

  const currentTaskRound = computed(() => {
    if (!studentId.value || !taskType.value) return undefined
    return progress[studentId.value]?.[taskType.value]
  })

  const isRoundEnd = computed(() => {
    if (!currentTaskRound.value) return false
    return currentTaskRound.value.index === roundLength.value
  })
  const isBeforeRoundEnd = computed(() => {
    if (!currentTaskRound.value) return false
    return currentTaskRound.value.index === roundLength.value - 1
  })

  const currentTask = computed(() => {
    if (!currentTaskRound.value) return undefined
    return currentTaskRound.value.roundTasks[currentTaskRound.value.index]
  })

  function initiateTask() {
    const randomCreature = creatureStore.getRandomCreature()

    if (
      !studentId.value ||
      !randomCreature ||
      !taskType.value ||
      !tasks.value.data
    )
      return

    if (!progress[studentId.value]) {
      progress[studentId.value] = {}
    }
    const currentTask = progress[studentId.value]![taskType.value]

    if (currentTask) return

    progress[studentId.value]![taskType.value] = {
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
