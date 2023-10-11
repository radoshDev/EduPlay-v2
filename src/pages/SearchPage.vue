<script setup lang="ts">
import PageLayout from '@/components/layouts/PageLayout.vue'
import { PageTitle } from '@/components/ui'
import { useLibraryStoreValues } from '@/stores/library/libraryStore'
const { search } = useLibraryStoreValues()
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle title="Пошук" back-href="/library" />
    </template>
    <div>Search will be here: {{ search }}</div>
  </PageLayout>
</template>
