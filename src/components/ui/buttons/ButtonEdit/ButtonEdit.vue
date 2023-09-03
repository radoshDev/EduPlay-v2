<script setup lang="ts">
import { ButtonIcon } from '..'
defineProps<{ href?: string }>()

defineEmits<{ (e: 'click', event: Event): void }>()
</script>

<template>
  <ButtonIcon
    @click="(e) => $emit('click', e)"
    color="secondary"
    :icon="{ name: 'fa-regular-edit', scale: 1.5 }"
  />
</template>
