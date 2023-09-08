import { computed, reactive } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import api from '@/api/api'
import type { QueryData } from '@/types'
import type { TaskWithDifficulty } from '@/types/db'
import type { TaskCategoryTree } from '@/types/task'

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

    const subcategoryTasks = tasks.data?.filter(
      (task) => task.subcategorySlug === subcategory.slug
    )
    return { ...subcategory, tasks: subcategoryTasks }
  })

  async function setTasks() {
    try {
      tasks.isLoading = true
      tasks.error = ''
      const data = await api.library.getTasks()
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
      const data = await api.library.getCategories()
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

  return {
    tasks,
    categories,
    currentCategory,
    currentSubcategory,
    setTasks,
    setCategories,
    setPageParams
  }
})

export const useLibraryStoreValues = () => storeToRefs(useLibraryStore())
