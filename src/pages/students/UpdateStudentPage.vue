<script setup lang="ts">
import { computed } from 'vue'
import { StudentForm } from '@/components/forms'
import PageLayout from '@/components/layouts/PageLayout.vue'
import { PageTitle } from '@/components/ui'
import { useStudentStoreValues } from '@/stores/student/studentStore'

const { currentStudent, students } = useStudentStoreValues()
const title = computed(() => {
  if (!currentStudent.value) return 'Редагування студента'
  return `Редагування '${currentStudent.value.name}'`
})

const backHref = computed(() => {
  if (!currentStudent.value) return '/students'
  return `/students/${currentStudent.value.id}`
})
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle :title="title" :back-href="backHref" />
    </template>
    <v-loader v-if="students.isLoading" size="lg" />
    <v-alert
      v-else-if="students.error || !currentStudent"
      variant="error"
      :message="students.error || 'Студента не знайдено'"
    />
    <StudentForm
      v-else
      action="updateStudent"
      :default-values="currentStudent"
    />
  </PageLayout>
</template>
