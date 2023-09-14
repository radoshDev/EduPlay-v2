<script setup lang="ts">
import type { Size } from '@/types/styles'
type Props = {
  size: Size
}
defineProps<Props>()
</script>

<template>
  <span :class="`loading loading-spinner loading-${size}`" />
</template>
