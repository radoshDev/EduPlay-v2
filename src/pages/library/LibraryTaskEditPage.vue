<script setup lang="ts">
import { LibraryTaskForm } from '@/components/forms'
import PageLayout from '@/components/layouts/PageLayout.vue'
import { DeleteButton } from '@/components/library'
import { PageTitle } from '@/components/ui'
import { useLibraryStoreValues } from '@/stores/library/libraryStore'
import { computed } from 'vue'

const { current, categories, tasks } = useLibraryStoreValues()
const title = computed(() => {
  if (!current.value.task) return 'Редагування завдання'
  return `Редагування '${current.value.task.value}'`
})
const parentPath = computed(() => {
  if (!current.value.task) return '/library'
  return `/library/${current.value.task.type}/${current.value.task.subcategorySlug}/${current.value.task.id}`
})
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle :title="title" :back-href="parentPath">
        <template #right-action v-if="current.task">
          <DeleteButton type="task" />
        </template>
      </PageTitle>
    </template>
    <v-loader v-if="categories.isLoading || tasks.isLoading" size="lg" />
    <v-alert
      v-else-if="categories.error || tasks.error || !current.task"
      variant="error"
      :message="categories.error || tasks.error || 'Завдання не знайдено'"
    />
    <LibraryTaskForm
      v-else
      action="update"
      :default-values="{
        ...current.task,
        result: current.task.result || undefined
      }"
    />
  </PageLayout>
</template>
