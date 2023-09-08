<script setup lang="ts">
import { useLibraryStoreValues } from '@/stores/library/libraryStore'
import { useUserStoreValues } from '@/stores/user/userStore'
import TaskItem from '../TaskItem/TaskItem.vue'
import { AlertNotification } from '@/components/ui'

const { currentSubcategory } = useLibraryStoreValues()
const { user } = useUserStoreValues()
</script>

<template>
  <div
    class="mb-4 flex w-full flex-1 flex-wrap content-start gap-2 overflow-auto"
  >
    <AlertNotification
      v-if="!currentSubcategory?.tasks"
      variant="error"
      message="Tasks not found"
    />
    <AlertNotification
      v-else-if="currentSubcategory.tasks.length === 0"
      variant="info"
      message="Task list is empty..."
    />
    <template v-else>
      <TaskItem
        v-for="task in currentSubcategory.tasks"
        :key="task.id"
        :value="task.value"
        :href="
          user?.isAdmin ? `${currentSubcategory.slug}/${task.id}` : undefined
        "
      />
    </template>
  </div>
</template>
