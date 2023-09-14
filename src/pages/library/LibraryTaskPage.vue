<script setup lang="ts">
import PageLayout from '@/components/layouts/PageLayout.vue'
import { TaskInfo } from '@/components/library'
import { AlertNotification, PageTitle } from '@/components/ui'
import { ButtonEdit } from '@/components/ui/buttons'
import { useLibraryStore } from '@/stores/library/libraryStore'
import { useUserStoreValues } from '@/stores/user/userStore'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const store = useLibraryStore()
const task = ref(store.current.task)
const { user } = useUserStoreValues()
const router = useRouter()

onMounted(() => {
  if (!user.value?.isAdmin) {
    router.push('/404')
  }
})

const title = computed(() => {
  if (!task.value) return 'Сторінка завдання'
  return `Завдання '${task.value.value}'`
})
const parentPath = computed(() => {
  if (!task.value) return '/library'
  return `/library/${task.value.type}/${task.value.subcategorySlug}`
})
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle :title="title" :back-href="parentPath">
        <template #right-action v-if="task">
          <ButtonEdit :href="`${parentPath}/${task.id}/edit`" />
        </template>
      </PageTitle>
      <TaskInfo v-if="task" :task="task" />
      <div v-else>
        <AlertNotification variant="error" message="Завдання не знайдено" />
      </div>
    </template>
  </PageLayout>
</template>
