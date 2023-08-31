<script setup lang="ts">
import { computed } from 'vue'
import { UserAvatar } from '@/components/ui'
import type { Size, Variant } from '@/types/styles'
type Props = {
  title: string
  imageSrc: string
  size: Size
  variant: Variant
  href?: string
}

const props = defineProps<Props>()
const style = computed(() => {
  let avatarSize: number
  let textSize: string

  switch (props.size) {
    case 'lg':
      avatarSize = 100
      textSize = 'text-lg'
      break
    case 'md':
      avatarSize = 80
      textSize = 'text-base'
      break
    case 'sm':
      avatarSize = 60
      textSize = 'text-sm'
      break
    case 'xs':
      avatarSize = 40
      textSize = 'text-xs'
      break
    default:
      avatarSize = 80
      textSize = 'text-base'
  }
  return { avatarSize, textSize }
})
</script>

<template>
  <component
    :is="!href ? 'div' : href.startsWith('http') ? 'a' : 'router-link'"
    class="text-center"
  >
    <UserAvatar
      :image-src="imageSrc"
      :size="style.avatarSize"
      :variant="variant"
      :alt="title"
    />
    <div :class="`font-bold ${style.textSize}`">{{ title }}</div>
  </component>
</template>
