<script setup lang="ts">
import PageLayout from '@/components/layouts/PageLayout.vue'
import { TaskInfo } from '@/components/library'
import { PageTitle } from '@/components/ui'
import { ButtonEdit } from '@/components/ui/buttons'
import { useLibraryStoreValues } from '@/stores/library/libraryStore'
import { useUserStoreValues } from '@/stores/user/userStore'
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const { current, categories, tasks } = useLibraryStoreValues()

const { user } = useUserStoreValues()
const router = useRouter()

onMounted(() => {
  if (!user.value?.isAdmin) {
    router.push('/404')
  }
})

const title = computed(() => {
  if (!current.value.task) return 'Сторінка завдання'
  return `Завдання '${current.value.task.value}'`
})
const parentPath = computed(() => {
  if (!current.value.task) return '/library'
  return `/library/${current.value.task.type}/${current.value.task.subcategorySlug}`
})
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle :title="title" :back-href="parentPath">
        <template #right-action v-if="current.task">
          <ButtonEdit :href="`${parentPath}/${current.task.id}/edit`" />
        </template>
      </PageTitle>
    </template>
    <v-loader v-if="categories.isLoading || tasks.isLoading" size="lg" />
    <v-alert
      v-else-if="categories.error || tasks.error || !current.task"
      variant="error"
      :message="categories.error || tasks.error || 'Завдання не знайдено'"
    />
    <TaskInfo v-else :task="current.task" />
  </PageLayout>
</template>
