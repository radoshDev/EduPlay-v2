<script setup lang="ts">
import { BasicModal } from '@/components/ui/modals'
import { useStudentStoreValues } from '@/stores/student/studentStore'
import { useTaskStore } from '@/stores/task/taskStore'
import type { ModalKeys } from '@/types'
import { onMounted, watch } from 'vue'

const taskStore = useTaskStore()
const { studentId } = useStudentStoreValues()
const modalId: ModalKeys = 'task_reset_modal'

onMounted(handleShowModal)

watch(studentId, handleShowModal)

function handleShowModal() {
  const round = taskStore.currentTaskRound
  if (!round) return

  if (round.index > 0 || round.earned > 0) {
    window[modalId].showModal()
  }
}

function handleClose() {
  window[modalId].close()
}

function handleResetTask() {
  taskStore.resetTask()
  handleClose()
}
</script>

<template>
  <BasicModal title="Продовжити?" :id="modalId" @close="handleClose">
    <v-btn variant="success" @click="handleResetTask">
      <v-icon name="io-reload-sharp" scale="1.5" />
    </v-btn>
    <v-btn variant="warning" @click="handleClose">
      <v-icon name="hi-solid-arrow-narrow-right" scale="1.5" />
    </v-btn>
  </BasicModal>
</template>
