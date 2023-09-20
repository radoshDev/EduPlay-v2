<script setup lang="ts">
import PageLayout from '@/components/layouts/PageLayout.vue'
import { StudentList } from '@/components/students'
import { PageTitle } from '@/components/ui'
import { ButtonAdd } from '@/components/ui/buttons'
import { useStudentStoreValues } from '@/stores/student/studentStore'

const { students } = useStudentStoreValues()
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle title="Студенти">
        <template #right-action>
          <v-btn
            variant="secondary"
            :icon="{ name: 'bi-gear-fill', scale: 1.5 }"
            href="/account"
            round
          />
        </template>
      </PageTitle>
    </template>
    <v-loader v-if="students.isLoading" size="lg" />
    <v-alert
      v-else-if="students.error || !students.data"
      variant="error"
      :message="students.error || 'Студентів не знайдено'"
    />
    <div v-else class="flex w-full max-w-md flex-col">
      <StudentList :students="students.data" />
      <div class="text-center">
        <ButtonAdd href="/students/add" />
      </div>
    </div>
  </PageLayout>
</template>
