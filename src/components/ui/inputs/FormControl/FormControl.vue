<script setup lang="ts">
type Props = {
  buttonText: string
  loading?: boolean
  row?: boolean
  justify?: 'center' | 'start' | 'end'
}

defineProps<Props>()
defineEmits<{ (e: 'submit', event: Event): void }>()
</script>

<template>
  <form
    @submit="(e) => $emit('submit', e)"
    class="flex items-center w-full gap-4"
    :class="[`flex-${row ? 'row' : 'col'}`, `justify-${justify || 'center'}`]"
  >
    <div class="overflow-auto w-full max-w-lg p-1">
      <slot />
    </div>
    <v-btn :loading="loading" variant="success" type="submit">
      {{ buttonText }}
    </v-btn>
  </form>
</template>
