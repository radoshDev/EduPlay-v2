<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  title: string
  imageSrc: string
  href?: string
}
const props = defineProps<Props>()
const capitalizeTitle = computed(
  () => props.title[0].toUpperCase() + props.title.slice(1)
)
</script>

<template>
  <component
    :is="href ? 'router-link' : 'div'"
    class="grid h-52 justify-center justify-items-center gap-4 rounded-lg p-3 shadow-lg"
    :to="href || ''"
  >
    <img
      class="h-full min-h-full self-center object-contain"
      :src="imageSrc"
      :alt="title"
      :width="170"
      :height="200"
    />
    <div class="max-w-[200px] text-center text-2xl font-bold">
      {{ capitalizeTitle }}
    </div>
  </component>
</template>
