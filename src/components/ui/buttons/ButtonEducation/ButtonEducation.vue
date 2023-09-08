<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useStudentStore } from '@/stores/student/studentStore'
import { ButtonIcon } from '..'

const { currentStudent } = storeToRefs(useStudentStore())

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
  <ButtonIcon
    :icon="{ name: 'io-rocket-sharp', scale: 1.5 }"
    color="primary"
    :href="href"
  />
</template>
