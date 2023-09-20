<script setup lang="ts">
type Props = {
  id: string
  title?: string
}
defineProps<Props>()
defineEmits<{ (e: 'close'): void }>()
</script>

<template>
  <dialog :id="id" class="modal">
    <form method="dialog" class="modal-box">
      <h3 v-if="title" class="text-center text-lg font-bold">{{ title }}</h3>
      <div class="flex items-center justify-center gap-4 py-4">
        <slot />
      </div>
    </form>
    <form method="dialog" class="modal-backdrop">
      <button @click="$emit('close')">close</button>
    </form>
  </dialog>
</template>
