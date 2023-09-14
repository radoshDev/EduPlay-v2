<script setup lang="ts">
import { BasicModal } from '@/components/ui/modals'
import { useTaskStoreValues } from '@/stores/task/taskStore'

import { watch } from 'vue'

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
</script>

<template>
  <BasicModal :id="modalId" @close="handleClose">
    <div>Options</div>
  </BasicModal>
</template>
