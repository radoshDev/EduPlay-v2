<script setup lang="ts">
import type { Variant, Size } from '@/types/styles'
import type { AnchorTarget } from '@/types'
import { onMounted, onUpdated, ref } from 'vue'

type Props = {
  color: Variant
  round?: boolean
  href?: string
  target?: AnchorTarget
  disabled?: boolean
  size?: Size
}
const props = defineProps<Props>()
defineEmits<{ (e: 'click', event: Event): void }>()
const button = ref<HTMLButtonElement | null>(null)

onMounted(setDisabled)
onUpdated(setDisabled)

function setDisabled() {
  if (props.href || !button.value) return

  if (props.disabled) {
    button.value.setAttribute('disabled', 'true')
  } else {
    button.value.removeAttribute('disabled')
  }
}
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
    ref="button"
    @click="$emit('click', $event)"
  >
    <slot />
  </component>
</template>

<style scoped lang="scss"></style>
