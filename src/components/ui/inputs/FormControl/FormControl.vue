<script setup lang="ts">
import { ButtonText } from '@/components/ui/buttons'
type Props = {
  buttonText: string
  isLoading?: boolean
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
    <ButtonText
      class="mt-6"
      :is-loading="isLoading"
      variant="success"
      size="sm"
      type="submit"
    >
      {{ buttonText }}
    </ButtonText>
  </form>
</template>
