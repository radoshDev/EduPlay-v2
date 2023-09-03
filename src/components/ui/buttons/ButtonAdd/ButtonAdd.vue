<script setup lang="ts">
import { ButtonIcon } from '@/components/ui/buttons'

defineProps<{ href?: string }>()
defineEmits<{ (e: 'click'): void }>()
</script>

<template>
  <ButtonIcon
    @click="$emit('click')"
    :icon="{ name: 'bi-plus-circle-fill', scale: 1.5 }"
    color="success"
    round
    :href="href"
  />
</template>

<style scoped lang="scss"></style>
