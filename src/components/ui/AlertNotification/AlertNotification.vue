<script setup lang="ts">
import type { Variant } from '@/types/styles'

type Props = {
  variant: Variant
  message: string
}

defineProps<Props>()
</script>

<template>
  <div :class="`alert alert-${variant}`">
    <span>{{ message }}</span>
  </div>
</template>
