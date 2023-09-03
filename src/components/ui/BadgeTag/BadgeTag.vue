<script setup lang="ts">
import type { Variant, Size } from '@/types/styles'

type Props = {
  text: string
  color?: Variant
  size?: Size
  outline?: boolean
}

defineProps<Props>()
</script>

<template>
  <div
    class="badge"
    :class="[
      `badge-${color}`,
      `badge-${size}`,
      {
        'badge-outline': outline
      }
    ]"
  >
    {{ text }}
  </div>
</template>
