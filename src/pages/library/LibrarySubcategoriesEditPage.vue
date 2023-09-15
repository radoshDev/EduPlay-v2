<script setup lang="ts">
import { LibrarySubcategoryForm } from '@/components/forms'
import PageLayout from '@/components/layouts/PageLayout.vue'
import { DeleteButton } from '@/components/library'
import { PageTitle } from '@/components/ui'
import { useLibraryStoreValues } from '@/stores/library/libraryStore'
import { computed } from 'vue'

const { current, categories } = useLibraryStoreValues()

const title = computed(() => {
  if (!current.value.subcategory) return 'Редагування підкатегорії'
  return `Редагування '${current.value.subcategory.title}'`
})
const backHref = computed(() => {
  if (!current.value.subcategory) return '/library'
  return `/library/${current.value.subcategory.parentSlug}`
})

const defaultValues = computed(() => {
  if (!current.value.subcategory) return { parentSlug: 'test' }
  return {
    ...current.value.subcategory,
    imageUrl: current.value.subcategory.imageUrl ?? undefined,
    position: current.value.subcategory.position ?? undefined
  }
})
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle :title="title" :back-href="backHref">
        <template #right-action v-if="current.subcategory">
          <DeleteButton type="subcategory" />
        </template>
      </PageTitle>
    </template>
    <v-loader v-if="categories.isLoading" size="lg" />
    <v-alert
      v-else-if="categories.error || !current.subcategory"
      variant="error"
      :message="categories.error || 'Підкатегорію не знайдено'"
    />
    <LibrarySubcategoryForm
      v-else
      action="update"
      :default-values="defaultValues"
    />
  </PageLayout>
</template>
