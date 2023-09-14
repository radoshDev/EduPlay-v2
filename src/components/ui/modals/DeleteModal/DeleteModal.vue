<script setup lang="ts">
import { ButtonText } from '@/components/ui/buttons'
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
      <ButtonText variant="error" size="sm" @click="handleClose">
        Відміна
      </ButtonText>
      <ButtonText variant="success" size="sm" @click="$emit('delete')">
        Так
      </ButtonText>
    </div>
  </BasicModal>
</template>
