<script setup lang="ts">
import { LibraryCategoryForm } from '@/components/forms'
import PageLayout from '@/components/layouts/PageLayout.vue'
import { PageTitle } from '@/components/ui'
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle title="Нова категорія завдань" back-href="/library" />
    </template>
    <LibraryCategoryForm action="add" />
  </PageLayout>
</template>
