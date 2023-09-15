<script setup lang="ts">
import { LibraryTaskForm } from '@/components/forms'
import PageLayout from '@/components/layouts/PageLayout.vue'
import { PageTitle } from '@/components/ui'
import { useLibraryStoreValues } from '@/stores/library/libraryStore'
import { computed } from 'vue'

const { current, categories } = useLibraryStoreValues()
const parentPath = computed(() => {
  if (!current.value.subcategory) return '/library'
  return `/library/${current.value.subcategory.parentSlug}/${current.value.subcategory.slug}`
})
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle title="Нове завдання" :back-href="parentPath" />
    </template>
    <v-loader v-if="categories.isLoading" size="lg" />
    <v-alert
      v-else-if="categories.error || !current.subcategory"
      variant="error"
      :message="categories.error || 'Підкатегорію не знайдено'"
    />
    <LibraryTaskForm
      v-else
      action="add"
      :default-values="{
        subcategorySlug: current.subcategory.slug,
        type: current.subcategory.parentSlug
      }"
    />
  </PageLayout>
</template>
