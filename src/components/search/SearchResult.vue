<script setup lang="ts">
import { computed } from 'vue'
import { useLibraryStoreValues } from '@/stores/library/libraryStore'
import { TasksList } from '../library'

const { search, tasks } = useLibraryStoreValues()
const filteredTasks = computed(() => {
  if (!tasks.value.data) return []
  return tasks.value.data.filter((task) => task.value.includes(search.value))
})
</script>

<template>
  <div>
    Знайдено:
    <span class="text-yellow-700 font-bold">{{ filteredTasks.length }}</span>
    по запиту:
    <span class="text-green-700 font-bold">{{ search }}</span>
  </div>
  <TasksList :tasks="filteredTasks" class="justify-center max-w-2xl" />
</template>
