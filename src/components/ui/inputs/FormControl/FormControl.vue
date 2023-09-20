<script setup lang="ts">
type Props = {
  buttonText: string
  loading?: boolean
}

defineProps<Props>()
defineEmits<{ (e: 'submit', event: Event): void }>()
</script>

<template>
  <form
    @submit="(e) => $emit('submit', e)"
    class="flex flex-col items-center w-full"
  >
    <div class="overflow-auto w-full max-w-lg">
      <slot />
    </div>
    <v-btn class="mt-6" :loading="loading" variant="success" type="submit">
      {{ buttonText }}
    </v-btn>
  </form>
</template>
