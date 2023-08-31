<script setup lang="ts">
import type { Variant } from '@/types/styles'

type Props = {
  size: number
  variant: Variant
  imageSrc: string
  alt: string
}
defineProps<Props>()
</script>

<template>
  <div className="avatar">
    <div
      :class="[
        `w-[${size}px]`,
        `ring-${variant}`,
        'rounded-full ring',
        'ring-offset-2 ring-offset-base-100'
      ]"
    >
      <img class="object-contain" :src="imageSrc" :alt="alt" :width="size" :height="size" />
    </div>
  </div>
</template>
