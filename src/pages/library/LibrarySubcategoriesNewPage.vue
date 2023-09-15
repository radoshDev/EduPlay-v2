<script setup lang="ts">
import { LibrarySubcategoryForm } from '@/components/forms'
import PageLayout from '@/components/layouts/PageLayout.vue'
import { PageTitle } from '@/components/ui'
import { useLibraryStoreValues } from '@/stores/library/libraryStore'
import { computed } from 'vue'

const { current, categories } = useLibraryStoreValues()

const backHref = computed(() => {
  if (!current.value.category) return '/library'
  return `/library/${current.value.category.slug}`
})
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle title="Нова підкатегорія" :back-href="backHref" />
    </template>
    <v-loader v-if="categories.isLoading" size="lg" />
    <v-alert
      v-else-if="categories.error || !current.category"
      variant="error"
      :message="categories.error || 'Категорію не знайдено'"
    />
    <LibrarySubcategoryForm
      v-else
      action="add"
      :default-values="{ parentSlug: current.category.slug }"
    />
  </PageLayout>
</template>
