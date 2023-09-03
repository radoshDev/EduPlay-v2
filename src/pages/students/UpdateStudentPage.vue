<script setup lang="ts">
import { StudentForm } from '@/components/forms'
import PageLayout from '@/components/layouts/PageLayout.vue'
import { PageTitle } from '@/components/ui'
import { useStudentStore } from '@/stores/student/studentStore'
import { storeToRefs } from 'pinia'

const { currentStudent } = storeToRefs(useStudentStore())
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle title="Edit student" back-href="." />
    </template>
    <StudentForm action="updateStudent" :default-values="currentStudent" />
  </PageLayout>
</template>
