<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useStudentStore } from '@/stores/student/studentStore'
import { ButtonIcon } from '..'

const { currentStudent } = storeToRefs(useStudentStore())

const props = defineProps<{ type: string }>()
const href = computed(() => {
  if (!currentStudent.value?.id) {
    return '/students'
  } else {
    return `/education/${currentStudent.value.id}/${props.type}`
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
