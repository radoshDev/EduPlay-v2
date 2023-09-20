<script setup lang="ts">
import { BasicModal } from '..'

type Props = {
  title: string
}
defineProps<Props>()
defineEmits<{ (e: 'delete'): void }>()

const modalId = 'delete_modal'

function handleClose() {
  window[modalId].close()
}
</script>

<template>
  <BasicModal :id="modalId" @close="handleClose" :title="title">
    <div class="flex gap-4">
      <v-btn variant="error" @click="handleClose"> Відміна </v-btn>
      <v-btn variant="success" @click="$emit('delete')"> Так </v-btn>
    </div>
  </BasicModal>
</template>
