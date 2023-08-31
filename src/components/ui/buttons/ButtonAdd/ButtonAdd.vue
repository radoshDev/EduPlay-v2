<script setup lang="ts">
import { ButtonIcon } from '@/components/ui/buttons'

defineProps<{ href?: string }>()
defineEmits<{ (e: 'click'): void }>()
</script>

<template>
  <ButtonIcon @click="$emit('click')" color="success" round :href="href">
    <v-icon name="bi-plus-circle-fill" scale="1.5" />
  </ButtonIcon>
</template>

<style scoped lang="scss"></style>
