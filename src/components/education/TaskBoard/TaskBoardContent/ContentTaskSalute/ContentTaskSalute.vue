<script setup lang="ts">
import { useStudentStoreValues } from '@/stores/student/studentStore'
import { useTaskStoreValues } from '@/stores/task/taskStore'
import { computed } from 'vue'
const { currentStudent } = useStudentStoreValues()
const { currentTaskRound, isRoundEnd, taskType } = useTaskStoreValues()
const creature = computed(() => currentTaskRound.value?.creature)
const cbQuery = computed(() =>
  encodeURI(`/education/${currentStudent.value?.id}/${taskType.value}`)
)
</script>

<template>
  <div
    v-if="creature"
    class="flex flex-col items-center gap-6"
    :class="{
      'opacity-0 pointer-events-none absolute left-1/2 -translate-x-1/2':
        !isRoundEnd
    }"
  >
    <v-image
      class="h-64"
      fit="contain"
      :src="creature.mainImage"
      :alt="creature.title"
      :width="300"
      :height="300"
    />
    <div class="text-2xl font-bold">{{ creature.title }}</div>

    <v-btn
      v-if="currentStudent"
      :icon="{ name: 'fa-question-circle', scale: 1.5 }"
      :href="`/creatures/${creature.categorySlug}/${creature.slug}?cb=${cbQuery}`"
      variant="warning"
    />
  </div>
</template>
