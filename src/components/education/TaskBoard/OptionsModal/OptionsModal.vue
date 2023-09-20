<script setup lang="ts">
import { BasicModal } from '@/components/ui/modals'
import { useTaskStore } from '@/stores/task/taskStore'
import StudentSwitcher from './StudentSwitcher/StudentSwitcher.vue'
import type { ModalKeys } from '@/types'

const { resetTask } = useTaskStore()
const modalId: ModalKeys = 'task_options_modal'

function handleClose() {
  window[modalId].close()
}

function handleResetTask(e: Event) {
  e.preventDefault()
  resetTask()
  handleClose()
}
</script>

<template>
  <BasicModal :id="modalId" @close="handleClose">
    <div class="flex flex-col gap-4 items-center">
      <StudentSwitcher @close-modal="handleClose" />
      <v-btn
        :icon="{ name: 'io-reload-circle', scale: 2 }"
        variant="success"
        size="md"
        round
        @click="handleResetTask"
      />
    </div>
  </BasicModal>
</template>
