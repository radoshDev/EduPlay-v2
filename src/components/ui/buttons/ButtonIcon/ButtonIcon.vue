<script setup lang="ts">
import type { Variant, Size } from '@/types/styles'
import type { AnchorTarget } from '@/types'
import { onMounted, onUpdated, ref } from 'vue'

type Props = {
  color: Variant
  icon: { name: string; scale?: number; fill?: string }
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
    :target="target"
    ref="button"
    @click="$emit('click', $event)"
  >
    <v-icon :name="icon.name" :fill="icon.fill" :scale="icon.scale" />
  </component>
</template>

<style scoped lang="scss"></style>
