<script setup lang="ts">
import type { Variant, Size } from '@/types/styles'
import type { AnchorTarget } from '@/types'

type Props = {
  color: Variant
  round?: boolean
  href?: string
  target?: AnchorTarget
  size?: Size
}
defineProps<Props>()
</script>

<template>
  <component
    :is="!href ? 'button' : href.startsWith('http') ? 'a' : 'router-link'"
    :class="[
      'btn',
      `text-${color}`,
      `btn-${size || 'sm'}`,
      'bg-transparent',
      round ? 'btn-circle' : 'btn-square',
      $attrs.class
    ]"
    :to="href"
    :href="href"
  >
    <slot />
  </component>
</template>

<style scoped lang="scss"></style>
