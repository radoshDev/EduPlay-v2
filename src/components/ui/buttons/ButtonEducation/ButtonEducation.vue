<script setup lang="ts">
import { computed } from 'vue'
import { useStudentStoreValues } from '@/stores/student/studentStore'

const { currentStudent } = useStudentStoreValues()

const props = defineProps<{ taskType?: string }>()
const href = computed(() => {
  if (!currentStudent.value?.id) {
    return '/students'
  } else if (!props.taskType) {
    return `/education/${currentStudent.value.id}`
  } else {
    return `/education/${currentStudent.value.id}/${props.taskType}`
  }
})
</script>

<template>
  <v-btn
    variant="primary"
    :icon="{ name: 'io-rocket-sharp', scale: 1.5 }"
    :href="href"
  />
</template>
