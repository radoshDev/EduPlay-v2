<script setup lang="ts">
import { StudentForm } from '@/components/forms'
import PageLayout from '@/components/layouts/PageLayout.vue'
import { PageTitle } from '@/components/ui'
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle title="Новий студент" back-href="/students" />
    </template>
    <StudentForm
      action="addStudent"
      :default-values="{ difficulty: 0, roundLength: 5 }"
    />
  </PageLayout>
</template>
