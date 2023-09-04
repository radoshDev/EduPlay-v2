<script setup lang="ts">
import { ButtonIcon } from '@/components/ui/buttons'
import { useStudentStore } from '@/stores/student/studentStore'
import { useTaskStore } from '@/stores/task/taskStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
const { currentStudent } = storeToRefs(useStudentStore())
const { currentTaskRound, isRoundEnd } = storeToRefs(useTaskStore())
const creature = computed(() => currentTaskRound.value?.creature)
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
    <img
      class="h-64 object-contain"
      :src="creature.mainImage"
      :alt="creature.title"
      :width="300"
      :height="300"
    />
    <div class="text-2xl font-bold">{{ creature.title }}</div>

    <ButtonIcon
      v-if="currentStudent"
      :icon="{ name: 'fa-question-circle' }"
      :href="`/creatures/${creature.categorySlug}/${creature.slug}`"
      color="warning"
    />
  </div>
</template>
