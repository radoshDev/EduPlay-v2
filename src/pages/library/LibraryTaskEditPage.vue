<script setup lang="ts">
import { LibraryTaskForm } from '@/components/forms'
import PageLayout from '@/components/layouts/PageLayout.vue'
import { DeleteButton } from '@/components/library'
import { AlertNotification, PageTitle } from '@/components/ui'
import { useLibraryStore } from '@/stores/library/libraryStore'
import { computed, ref } from 'vue'

const store = useLibraryStore()
const task = ref(store.current.task)
const title = computed(() => {
  if (!task.value) return 'Редагування завдання'
  return `Редагування '${task.value.value}'`
})
const parentPath = computed(() => {
  if (!task.value) return '/library'
  return `/library/${task.value.type}/${task.value.subcategorySlug}/${task.value.id}`
})
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle :title="title" :back-href="parentPath">
        <template #right-action v-if="task">
          <DeleteButton type="task" />
        </template>
      </PageTitle>
      <LibraryTaskForm
        v-if="task"
        action="update"
        :default-values="{ ...task, result: task.result || undefined }"
      />
      <div v-else>
        <AlertNotification variant="error" message="Завдання не знайдено" />
      </div>
    </template>
  </PageLayout>
</template>
