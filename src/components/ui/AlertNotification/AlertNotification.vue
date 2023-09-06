<script setup lang="ts">
import type { Variant, Size } from '@/types/styles'

type Props = {
  variant: Variant
  message: string
  textSize?: Size
}

defineProps<Props>()
</script>

<template>
  <div :class="`alert alert-${variant}`">
    <span :class="`text-${textSize || 'md'}`">{{ message }}</span>
  </div>
</template>
