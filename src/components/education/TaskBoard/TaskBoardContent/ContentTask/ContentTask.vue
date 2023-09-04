<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTaskStore } from '@/stores/task/taskStore'
import calcFontSize from '@/helpers/calcFontSize'

const { currentTask } = storeToRefs(useTaskStore())
</script>

<template>
  <div
    v-if="currentTask"
    className="text-center leading-[1.1]"
    :style="{ fontSize: calcFontSize(currentTask.value.length) }"
  >
    {{ currentTask.value }}
  </div>
</template>
