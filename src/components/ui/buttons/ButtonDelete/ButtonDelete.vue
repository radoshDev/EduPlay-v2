<script setup lang="ts">
import { ButtonIcon } from '..'
type Props = {
  loading?: boolean
}
defineProps<Props>()
defineEmits<{ (e: 'click', event: Event): void }>()
</script>

<template>
  <ButtonIcon
    :disabled="loading"
    @click="(e) => $emit('click', e)"
    :icon="{ name: 'md-deleteforever-round', scale: 1.5 }"
    color="error"
  />
</template>
