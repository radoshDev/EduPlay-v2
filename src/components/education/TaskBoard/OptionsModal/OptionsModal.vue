<script setup lang="ts">
import { watch } from 'vue'
import { BasicModal } from '@/components/ui/modals'
import { useTaskStoreValues } from '@/stores/task/taskStore'
import StudentSwitcher from './StudentSwitcher/StudentSwitcher.vue'

const { isOptionModal } = useTaskStoreValues()
const modalId = 'task_options'

watch(isOptionModal, () => {
  if (isOptionModal.value) {
    window[modalId].showModal()
  }
})

function handleClose() {
  window[modalId].close()
  isOptionModal.value = false
}

function handleResetTask(e: Event) {
  e.preventDefault()
  console.log('reset runs')
}
</script>

<template>
  <BasicModal :id="modalId" @close="handleClose">
    <StudentSwitcher @close-modal="handleClose" />
    <v-btn variant="success" @click="handleResetTask">
      <v-icon name="io-reload-sharp" scale="1.5" />
    </v-btn>
  </BasicModal>
</template>
