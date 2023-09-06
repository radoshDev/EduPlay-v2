<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useLibraryStore from '@/stores/library/libraryStore'
import TaskItem from '../TaskItem/TaskItem.vue'
import { AlertNotification } from '@/components/ui'
import { useUserStore } from '@/stores/user/userStore'

const { currentSubcategory } = storeToRefs(useLibraryStore())
const { user } = storeToRefs(useUserStore())
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
