<script setup lang="ts">
import { useUserStoreValues } from '@/stores/user/userStore'
import TaskItem from '../TaskItem/TaskItem.vue'
import type { Task } from '@/types/db'

type Props = { tasks: Task[] }

defineProps<Props>()

const { user } = useUserStoreValues()

function getHref(task: Task) {
  if (!user.value?.isAdmin) return
  return `/library/${task.type}/${task.subcategorySlug}/${task.id}`
}
</script>

<template>
  <div
    class="mb-4 flex w-full flex-1 flex-wrap content-start gap-2 overflow-auto"
  >
    <v-alert
      v-if="tasks.length === 0"
      variant="info"
      message="Список завдань порожній..."
    />
    <template v-else>
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :value="task.value"
        :href="getHref(task)"
      />
    </template>
  </div>
</template>
