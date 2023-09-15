<script setup lang="ts">
import PageLayout from '@/components/layouts/PageLayout.vue'
import { StudentInfo } from '@/components/students'
import { PageTitle } from '@/components/ui'
import { ButtonEdit } from '@/components/ui/buttons'
import { useStudentStoreValues } from '@/stores/student/studentStore'

const { currentStudent, students } = useStudentStoreValues()
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle
        title="Дані про студента"
        :back-href="currentStudent ? `/education/${currentStudent.id}` : '/'"
      >
        <template #right-action v-if="currentStudent">
          <ButtonEdit :href="`/students/${currentStudent.id}/update`" />
        </template>
      </PageTitle>
    </template>
    <v-loader v-if="students.isLoading" size="lg" />
    <v-alert
      v-else-if="students.error || !currentStudent"
      variant="error"
      :message="students.error || 'Студента не знайдено'"
    />
    <StudentInfo v-else :student="currentStudent" />
  </PageLayout>
</template>
