<script setup lang="ts">
import { onMounted } from 'vue'
import { useTaskStore } from '@/stores/task/taskStore'
import TaskBoardContent from './TaskBoardContent/TaskBoardContent.vue'
import TaskBoardHeader from './TaskBoardHeader/TaskBoardHeader.vue'
import TaskBoardNavigation from './TaskBoardNavigation/TaskBoardNavigation.vue'
import ResetModal from './ResetModal/ResetModal.vue'
import OptionsModal from './OptionsModal/OptionsModal.vue'

const { initiateTask } = useTaskStore()

onMounted(() => {
  initiateTask()
})
</script>

<template>
  <div class="mx-auto flex h-screen max-h-screen max-w-3xl flex-col px-2 py-4">
    <TaskBoardHeader />
    <TaskBoardContent />
    <TaskBoardNavigation />
    <ResetModal />
    <OptionsModal />
  </div>
</template>
