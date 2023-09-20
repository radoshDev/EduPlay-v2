<script setup lang="ts">
defineProps<{ href?: string }>()

defineEmits<{ (e: 'click', event: Event): void }>()
</script>

<template>
  <v-btn
    variant="secondary"
    :href="href"
    :icon="{ name: 'fa-regular-edit', scale: 1.5 }"
    @click="(e) => $emit('click', e)"
  />
</template>
