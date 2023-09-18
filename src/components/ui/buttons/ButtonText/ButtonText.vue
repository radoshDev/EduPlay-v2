<script setup lang="ts">
import type { Variant, Size } from '@/types/styles'
import type { AnchorTarget } from '@/types'
import { computed, onMounted, onUpdated, ref } from 'vue'

type Props = {
  href?: string
  variant?: Variant
  size?: Size
  isLoading?: boolean
  disabled?: boolean
  target?: AnchorTarget
}

const props = defineProps<Props>()
defineEmits<{ (e: 'click', event: Event): void }>()

const button = ref<HTMLButtonElement | null>(null)
const isAnchorTag = computed(() => props.href?.startsWith('http'))

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
      $attrs.class,
      'btn normal-case rounded-full',
      { [`btn-${variant}`]: !!variant, [`btn-${size}`]: !!size }
    ]"
    :to="isAnchorTag ? undefined : href"
    :href="isAnchorTag ? href : undefined"
    ref="button"
    :target="target"
    @click="(e: Event) => $emit('click', e)"
  >
    <v-loader v-if="isLoading" size="sm" />
    <slot v-else />
  </component>
</template>
