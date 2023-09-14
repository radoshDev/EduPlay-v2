import { computed, reactive } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import api from '@/api/api'
import type { QueryData } from '@/types'
import type {
  Task,
  TaskCategory,
  TaskCategoryTree,
  TaskSubcategory,
  TaskWithDifficulty
} from '@/types/db'
import type { LibraryType } from '@/types/task'

type LibraryParams = {
  category?: string
  subcategory?: string
  task?: string
}

export const useLibraryStore = defineStore('libraryStore', () => {
  const tasks = reactive<QueryData<TaskWithDifficulty[] | null>>({
    data: null,
    isLoading: false,
    error: ''
  })

  const categories = reactive<QueryData<TaskCategoryTree[] | null>>({
    data: null,
    isLoading: false,
    error: ''
  })

  const slug = reactive({
    category: null as string | null,
    subcategory: null as string | null,
    task: null as string | null
  })

  const currentCategory = computed(() => {
    return categories.data?.find((category) => category.slug === slug.category)
  })

  const currentSubcategory = computed(() => {
    if (!currentCategory.value) return undefined

    const subcategory = currentCategory.value.subcategories.find(
      (subcategory) => subcategory.slug === slug.subcategory
    )

    if (!subcategory) return undefined

    const subcategoryTasks =
      tasks.data?.filter((task) => task.subcategorySlug === subcategory.slug) ||
      []
    return { ...subcategory, tasks: subcategoryTasks }
  })

  const currentTask = computed(() => {
    if (!slug.task || !currentSubcategory.value) return
    return currentSubcategory.value.tasks.find((item) => item.id === slug.task)
  })

  const current = computed(() => {
    return {
      category: currentCategory.value,
      subcategory: currentSubcategory.value,
      task: currentTask.value
    }
  })
  async function setTasks() {
    try {
      tasks.isLoading = true
      tasks.error = ''
      const data = await api.library.task('getAll', undefined)
      tasks.data = data
    } catch (_error) {
      const error = _error as Error
      tasks.error = error.message || 'Unhandled tasks error'
    } finally {
      tasks.isLoading = false
    }
  }

  async function setCategories() {
    try {
      categories.isLoading = true
      categories.error = ''
      const data = await api.library.category('getAll', undefined)
      categories.data = data
    } catch (_error) {
      const error = _error as Error
      categories.error = error.message || 'Unhandled categories error'
    } finally {
      categories.isLoading = false
    }
  }

  function setPageParams(params: LibraryParams) {
    for (const property in params) {
      const key = property as keyof LibraryParams
      const value = params[key]
      if (value && value !== slug[key]) {
        slug[key] = value
      }
    }
  }

  function updateCategory(category: TaskCategory, action?: 'delete') {
    if (!categories.data) return
    const idx = categories.data.findIndex((item) => item.slug === category.slug)

    if (action === 'delete' && idx >= 0) {
      categories.data.splice(idx, 1)
      return
    }

    if (idx === -1) {
      categories.data.push({ ...category, subcategories: [] })
      return
    }
    const existCategory = categories.data[idx]
    existCategory.title = category.title
    existCategory.imageUrl = category.imageUrl
    existCategory.position = category.position
  }

  function updateSubcategory(subcategory: TaskSubcategory, action?: 'delete') {
    if (!currentCategory.value) return
    const idx = currentCategory.value.subcategories.findIndex(
      (item) => item.slug === subcategory.slug
    )
    if (action === 'delete' && idx >= 0) {
      currentCategory.value.subcategories.splice(idx, 1)
      return
    }

    if (idx === -1) {
      currentCategory.value.subcategories.push(subcategory)
      return
    }
    const existSubcategory = currentCategory.value.subcategories[idx]
    existSubcategory.difficulty = subcategory.difficulty
    existSubcategory.imageUrl = subcategory.imageUrl
    existSubcategory.position = subcategory.position
    existSubcategory.title = subcategory.title
  }

  function updateTask(task: Task, action?: 'delete') {
    if (!currentSubcategory.value) return
    const idx = currentSubcategory.value.tasks.findIndex(
      (item) => item.id === task.id
    )

    if (action === 'delete' && idx >= 0) {
      currentSubcategory.value.tasks.splice(idx, 1)
      return
    }
    if (idx === -1) {
      currentSubcategory.value.tasks.push({
        ...task,
        subcategory: { difficulty: currentSubcategory.value.difficulty }
      })
      return
    }

    const existTask = currentSubcategory.value.tasks[idx]
    existTask.value = task.value
    existTask.result = task.result
  }

  type Value = {
    category: TaskCategory
    subcategory: TaskSubcategory
    task: Task
  }

  function update<T extends LibraryType, D extends Value[T]>(
    type: T,
    data: D,
    action?: 'delete'
  ): void {
    switch (type) {
      case 'category': {
        updateCategory(data as TaskCategory, action)
        return
      }
      case 'subcategory': {
        updateSubcategory(data as TaskSubcategory, action)
        return
      }
      case 'task': {
        updateTask(data as Task, action)
        return
      }
    }
  }

  return {
    tasks,
    categories,
    current,
    setTasks,
    setCategories,
    setPageParams,
    update
  }
})

export const useLibraryStoreValues = () => storeToRefs(useLibraryStore())
