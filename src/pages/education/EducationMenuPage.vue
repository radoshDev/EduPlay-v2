<script setup lang="ts">
import PageLayout from '@/components/layouts/PageLayout.vue'
import { TaskList } from '@/components/education'
import { StudentAvatar } from '@/components/students'
import { PageTitle } from '@/components/ui'
import { useStudentStoreValues } from '@/stores/student/studentStore'

const { currentStudent } = useStudentStoreValues()
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle title="Завдання" backHref="/students">
        <template #right-action v-if="currentStudent">
          <StudentAvatar
            :title="currentStudent.name"
            :imageSrc="currentStudent.avatar"
            :href="`/students/${currentStudent.id}`"
            size="xs"
            variant="primary"
          />
        </template>
      </PageTitle>
    </template>
    <TaskList />
  </PageLayout>
</template>
