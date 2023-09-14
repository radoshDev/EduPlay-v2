<script setup lang="ts">
import { ref } from 'vue'

type Props = {
  src: string
  alt?: string
  width?: string | number
  height?: string | number
  fit?: 'cover' | 'fill' | 'contain' | 'none' | 'scale-down'
}
defineProps<Props>()
const isImageBroken = ref(false)
const loading = ref(true)

function handleError() {
  isImageBroken.value = true
  loading.value = false
}

function handleLoad() {
  loading.value = false
}
</script>

<template>
  <div class="flex justify-center">
    <img
      v-if="!isImageBroken"
      :class="[{ hidden: loading, [`object-${fit}`]: !!fit }]"
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      @error="handleError"
      @load="handleLoad"
    />
    <v-loader v-if="loading" class="self-center" size="lg" />
    <v-icon
      v-if="isImageBroken"
      class="w-full h-full"
      name="bi-image-fill"
      fill="indianred"
      :title="alt"
    />
  </div>
</template>
