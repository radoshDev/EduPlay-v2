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
  <div class="avatar">
    <div
      :class="[
        `w-[${size}px]`,
        `ring-${variant}`,
        'rounded-full ring',
        'ring-offset-2 ring-offset-base-100'
      ]"
    >
      <v-image
        class="h-full image"
        :src="imageSrc"
        :alt="alt"
        :width="size"
        :height="size"
      />
    </div>
  </div>
</template>

<style>
.avatar .image img {
  object-fit: contain !important;
}
</style>
