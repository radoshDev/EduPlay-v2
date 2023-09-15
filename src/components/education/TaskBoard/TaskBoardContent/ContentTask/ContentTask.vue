<script setup lang="ts">
import { useTaskStoreValues } from '@/stores/task/taskStore'
import calcFontSize from '@/helpers/calcFontSize'

const { currentTask, currentTaskRound } = useTaskStoreValues()
</script>

<template>
  <div
    v-if="currentTask"
    className="text-center leading-[1.1]"
    :style="{ fontSize: calcFontSize(currentTask.value.length) }"
  >
    {{ currentTask.value }}
  </div>
  <v-alert
    v-else-if="currentTaskRound?.roundTasks.length === 0"
    variant="info"
    message="Немає завдань для вибраної складності"
    text-size="lg"
  />
</template>
