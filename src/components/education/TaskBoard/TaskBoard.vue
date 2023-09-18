<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useTaskStore } from '@/stores/task/taskStore'
import TaskBoardContent from './TaskBoardContent/TaskBoardContent.vue'
import TaskBoardHeader from './TaskBoardHeader/TaskBoardHeader.vue'
import TaskBoardNavigation from './TaskBoardNavigation/TaskBoardNavigation.vue'
import ResetModal from './ResetModal/ResetModal.vue'
import OptionsModal from './OptionsModal/OptionsModal.vue'
import { useStudentStoreValues } from '@/stores/student/studentStore'

const store = useTaskStore()
const { studentId } = useStudentStoreValues()

onMounted(() => {
  store.initiateTask()
})

watch(studentId, () => {
  if (!store.currentTask) {
    store.initiateTask()
  }
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
