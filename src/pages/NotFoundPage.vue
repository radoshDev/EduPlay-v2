<script setup lang="ts">
import PageLayout from '@/components/layouts/PageLayout.vue'
import PageTitle from '@/components/ui/PageTitle/PageTitle.vue'
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle title="Такої сторінки не існує" back-href="/" />
    </template>
    <h1 class="text-4xl text-red-700">404 Not found</h1>
  </PageLayout>
</template>
