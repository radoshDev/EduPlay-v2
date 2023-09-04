<script setup lang="ts">
import { useTaskStore } from '@/stores/task/taskStore'
import TaskBoardContent from './TaskBoardContent/TaskBoardContent.vue'
import TaskBoardHeader from './TaskBoardHeader/TaskBoardHeader.vue'
import TaskBoardNavigation from './TaskBoardNavigation/TaskBoardNavigation.vue'
import { onMounted, onUpdated } from 'vue'

const taskStore = useTaskStore()

onMounted(() => {
  taskStore.initiateTask()
})
onUpdated(() => {
  console.log('---UPDATED!---')
})
</script>

<template>
  <div class="mx-auto flex h-screen max-h-screen max-w-3xl flex-col px-2 py-4">
    <TaskBoardHeader />
    <TaskBoardContent />
    <TaskBoardNavigation />
    <!-- <ResetModal /> -->
  </div>
</template>
