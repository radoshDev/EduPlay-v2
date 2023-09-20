<script setup lang="ts">
import type { Variant, Size, IconProps } from '@/types/styles'
import type { AnchorTarget } from '@/types'
import { computed, onMounted, onUpdated, ref } from 'vue'

type Props = {
  href?: string
  icon?: IconProps
  round?: boolean
  variant?: Variant
  size?: Size
  loading?: boolean
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
      'btn',
      `btn-${size || 'sm'}`,
      {
        [`btn-${variant} normal-case rounded-full`]: !icon,
        [`border-none text-${variant} bg-transparent ${
          round ? 'btn-circle' : 'btn-square'
        }`]: !!icon
      }
    ]"
    :to="isAnchorTag ? undefined : href"
    :href="isAnchorTag ? href : undefined"
    ref="button"
    :target="target"
    @click="(e: Event) => $emit('click', e)"
  >
    <v-loader v-if="loading" size="sm" />
    <v-icon
      v-else-if="icon"
      :name="icon.name"
      :fill="icon.fill"
      :scale="icon.scale"
    />
    <slot v-else />
  </component>
</template>
