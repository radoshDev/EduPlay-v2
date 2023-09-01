<script setup lang="ts">
import type { Variant, Size } from '@/types/styles'
import type { AnchorTarget } from '@/types'
import { onUpdated, ref } from 'vue'
import { PreloaderBlock } from '@/components/ui'

type Props = {
  href?: string
  variant?: Variant
  size?: Size
  isLoading?: boolean
  target?: AnchorTarget
}

const props = defineProps<Props>()
defineEmits<{ (e: 'click'): void }>()

const button = ref<HTMLButtonElement | null>(null)

onUpdated(() => {
  if (props.href || !button.value) return
  if (props.isLoading) {
    button.value.setAttribute('disabled', 'true')
  } else {
    button.value.removeAttribute('disabled')
  }
})
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
    ref="button"
    @click="$emit('click')"
  >
    <PreloaderBlock v-if="isLoading" size="sm" />
    <slot v-else />
  </component>
</template>

<style scoped lang="scss"></style>
