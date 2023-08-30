<script setup lang="ts">
import type { Variant, Size } from '@/types/styles'
import type { AnchorTarget } from '@/types'

type Props = {
  href?: string
  variant?: Variant
  size?: Size
  isLoading?: boolean
  target?: AnchorTarget
}

defineProps<Props>()
</script>

<template>
  <component
    :is="!href ? 'button' : href.startsWith('http') ? 'a' : 'router-link'"
    :class="[
      $attrs.class,
      'btn normal-case rounded-full',
      { [`btn-${variant}`]: !!variant, [`btn-${size}`]: !!size }
    ]"
    :to="href"
    :href="href"
  >
    <span v-if="isLoading" className="loading loading-spinner loading-sm" />
    <slot v-else />
  </component>
</template>

<style scoped lang="scss"></style>
