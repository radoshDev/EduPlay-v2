<script setup lang="ts">
import { CheckboxField } from '@/components/ui/inputs'
import { onMounted, ref } from 'vue'

const props = defineProps<{ studentId: string }>()
const primaryStudent = ref(false)

function handlePrimaryStudentChange(isPrimaryStudent?: boolean) {
  if (isPrimaryStudent) {
    localStorage.setItem('primaryStudentId', props.studentId)
  } else {
    localStorage.removeItem('primaryStudentId')
  }
}

onMounted(() => {
  const primaryStudentId = localStorage.getItem('primaryStudentId')

  if (primaryStudentId) {
    primaryStudent.value = true
  }
})
</script>

<template>
  <CheckboxField
    label="Основний учень"
    class="mt-5"
    :modelValue="primaryStudent"
    @update:modelValue="handlePrimaryStudentChange"
  />
</template>
