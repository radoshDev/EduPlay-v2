import { defineStore, storeToRefs } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useCreatureStore } from '../creature/creatureStore'
import { useStudentStoreValues } from '../student/studentStore'
import { useLibraryStoreValues } from '../library/libraryStore'
import generateUniqueList from '@/helpers/generateUniqueList'
import type { TaskWithDifficulty } from '@/types/db'
import type { TaskStudentProgress } from '@/types/task'

export const useTaskStore = defineStore('taskStore', () => {
  const { getRandomCreature } = useCreatureStore()
  const { studentId, roundLength, currentStudent } = useStudentStoreValues()
  const { tasks, categories } = useLibraryStoreValues()

  const progress = reactive<TaskStudentProgress>({})

  const taskType = ref<string | null>(null)

  const tasksList = computed(() => {
    if (!tasks.value.data) return []
    if (!currentStudent.value) return tasks.value.data

    const studentDifficulty = currentStudent.value.difficulty

    const dataFilteredByDifficulty = tasks.value.data.filter((task) => {
      if (!task.subcategory?.difficulty) return true

      if (studentDifficulty > 3 && task.type === 'math') {
        const isNotSimpleNumber = !/(^[0-2]\s(\+|-))|((\+|-)\s[0-2])$/.test(
          task.value
        )
        const isNotSimpleResult = Number(task.result) > 1
        return isNotSimpleNumber && isNotSimpleResult
      }

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
    const randomCreature = getRandomCreature()

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
    const randomCreature = getRandomCreature()

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
    const randomCreature = getRandomCreature()
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
    isRoundEnd,
    isBeforeRoundEnd,
    currentTask,
    initiateTask,
    resetTask,
    nextRound
  }
})

export const useTaskStoreValues = () => storeToRefs(useTaskStore())
