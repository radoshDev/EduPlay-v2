<script setup lang="ts">
import { ModalWindow } from '@/components/ui'
import { useTaskStore } from '@/stores/task/taskStore'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'

const { isOptionModal } = storeToRefs(useTaskStore())
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
</script>

<template>
  <ModalWindow :id="modalId" @close="handleClose">
    <div>Options</div>
  </ModalWindow>
</template>
