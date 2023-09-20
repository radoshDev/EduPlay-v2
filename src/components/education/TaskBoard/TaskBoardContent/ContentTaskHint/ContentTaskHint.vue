<script setup lang="ts">
import { useTaskStoreValues } from '@/stores/task/taskStore'

const { currentTask } = useTaskStoreValues()
</script>

<template>
  <div
    v-if="currentTask && !currentTask.result"
    className="flex justify-center gap-3 mt-4"
  >
    <v-btn
      :href="`https://uk.wiktionary.org/wiki/${currentTask.value}`"
      target="_blank"
      :icon="{ name: 'fa-wikipedia-w', scale: 1.5 }"
      variant="warning"
      round
    />
    <v-btn
      :href="`https://www.google.com/search?q=${currentTask.value}&tbm=isch`"
      target="_blank"
      :icon="{ name: 'bi-image-fill', scale: 1.5 }"
      variant="success"
      round
    />
  </div>
</template>
