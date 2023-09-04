<script setup lang="ts">
import { ModalWindow } from '@/components/ui'
import { ButtonText } from '@/components/ui/buttons'
import { useTaskStore } from '@/stores/task/taskStore'
import { onMounted } from 'vue'

const taskStore = useTaskStore()

onMounted(() => {
  const round = taskStore.currentTaskRound
  if (!round) return

  if (round.index > 0 || round.earned > 0) {
    window.reset_task_modal.showModal()
  }
})

function handleClose() {
  window.reset_task_modal.close()
}

function handleResetTask() {
  taskStore.resetTask()
  handleClose()
}
</script>

<template>
  <ModalWindow title="Продовжити?" id="reset_task_modal" @close="handleClose">
    <ButtonText variant="success" @click="handleResetTask">
      <v-icon name="io-reload-sharp" scale="1.5" />
    </ButtonText>
    <ButtonText variant="warning" @click="handleClose">
      <v-icon name="hi-solid-arrow-narrow-right" scale="1.5" />
    </ButtonText>
  </ModalWindow>
</template>
