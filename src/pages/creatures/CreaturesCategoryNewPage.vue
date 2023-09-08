<script setup lang="ts">
import PageLayout from '@/components/layouts/PageLayout.vue'
import { PageTitle } from '@/components/ui'
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle title="Нова категорія істот" back-href="/creatures" />
    </template>
    <div>{{ `<NewCreatureCategoryForm />` }}</div>
  </PageLayout>
</template>
