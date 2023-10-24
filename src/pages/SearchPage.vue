<script setup lang="ts">
import { SearchForm } from '@/components/forms'
import PageLayout from '@/components/layouts/PageLayout.vue'
import SearchResult from '@/components/search/SearchResult.vue'
import { PageTitle } from '@/components/ui'
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle title="Пошук" back-href="/library" />
    </template>
    <div class="flex flex-col gap-6 items-center w-full">
      <SearchForm row />
      <SearchResult />
    </div>
  </PageLayout>
</template>
