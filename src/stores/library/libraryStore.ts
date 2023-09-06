import api from '@/api/api'
import type { QueryData } from '@/types'
import type { Task } from '@/types/db'
import type { TaskCategoryTree } from '@/types/task'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

type LibraryParams = {
  category?: string
  subcategory?: string
  taskId?: string
}

const useLibraryStore = defineStore('libraryStore', () => {
  const tasks = reactive<QueryData<Task[] | null>>({
    data: null,
    isLoading: false,
    error: ''
  })

  const categories = reactive<QueryData<TaskCategoryTree[] | null>>({
    data: null,
    isLoading: false,
    error: ''
  })

  const categorySlug = ref<string | null>(null)
  const subcategorySlug = ref<string | null>(null)
  const taskSlug = ref<string | null>(null)

  const currentCategory = computed(() => {
    return categories.data?.find(
      (category) => category.slug === categorySlug.value
    )
  })

  const currentSubcategory = computed(() => {
    if (!currentCategory.value) return undefined

    const subcategory = currentCategory.value.subcategories.find(
      (subcategory) => subcategory.slug === subcategorySlug.value
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

  function setPageParams({ category, subcategory, taskId }: LibraryParams) {
    if (category && category !== categorySlug.value)
      categorySlug.value = category

    if (subcategory && subcategory !== subcategorySlug.value)
      subcategorySlug.value = subcategory

    if (taskId && taskId !== taskSlug.value) taskSlug.value = taskId
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

export default useLibraryStore
