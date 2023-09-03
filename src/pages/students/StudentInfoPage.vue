<script setup lang="ts">
import PageLayout from '@/components/layouts/PageLayout.vue'
import { StudentInfo } from '@/components/students'
import { PageTitle } from '@/components/ui'
import { ButtonEdit } from '@/components/ui/buttons'
import { useStudentStore } from '@/stores/student/studentStore'
import { storeToRefs } from 'pinia'

const { currentStudent } = storeToRefs(useStudentStore())
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle
        title="Дані про студента"
        :back-href="currentStudent ? `/education/${currentStudent.id}` : '/'"
      >
        <template #right-action v-if="currentStudent">
          <ButtonEdit :href="`${currentStudent.id}/update`" />
        </template>
      </PageTitle>
    </template>
    <div className="w-full">
      <StudentInfo />
      <!-- <StudentStat dailyProgress={dailyProgress} /> -->
    </div>
  </PageLayout>
</template>
