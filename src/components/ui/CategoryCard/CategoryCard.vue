<script setup lang="ts">
import type { IconProps } from '@/types/styles'

type Props = {
  title: string
  iconName?: IconProps['name']
  fill?: string
  imageSrc?: string | null
  href?: string
}

defineProps<Props>()
</script>

<template>
  <component :is="!href ? 'div' : 'router-link'" :to="href">
    <div class="flex items-center gap-5 overflow-hidden rounded-lg shadow-md">
      <div
        v-if="iconName"
        className="flex w-32 justify-center p-4 text-success"
      >
        <v-icon :name="iconName" scale="3" :fill="fill" />
      </div>
      <v-image
        v-else-if="imageSrc"
        class="h-32 w-32 bg-white"
        fit="cover"
        :src="imageSrc"
        :alt="title"
        width="300"
        height="300"
      />
      <div class="text-xl font-bold">{{ title }}</div>
    </div>
  </component>
</template>
