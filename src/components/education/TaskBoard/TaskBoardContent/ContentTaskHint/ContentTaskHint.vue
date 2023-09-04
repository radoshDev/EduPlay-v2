<script setup lang="ts">
import { ButtonIcon } from '@/components/ui/buttons'
import { useTaskStore } from '@/stores/task/taskStore'
import { storeToRefs } from 'pinia'
const { currentTask } = storeToRefs(useTaskStore())
</script>

<template>
  <div
    v-if="currentTask && !currentTask.result"
    className="flex justify-center gap-3"
  >
    <ButtonIcon
      :href="`https://uk.wiktionary.org/wiki/${currentTask.value}`"
      target="_blank"
      :icon="{ name: 'fa-wikipedia-w' }"
      color="warning"
      round
    />
    <ButtonIcon
      :href="`https://www.google.com/search?q=${currentTask.value}&tbm=isch`"
      target="_blank"
      :icon="{ name: 'bi-image-fill' }"
      color="success"
      round
    />
  </div>
</template>
