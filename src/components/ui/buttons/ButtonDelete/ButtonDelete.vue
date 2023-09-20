<script setup lang="ts">
type Props = {
  loading?: boolean
}
defineProps<Props>()
defineEmits<{ (e: 'click', event: Event): void }>()
</script>

<template>
  <v-btn
    variant="error"
    :disabled="loading"
    @click="(e) => $emit('click', e)"
    :icon="{ name: 'md-deleteforever-round', scale: 1.5 }"
  />
</template>
