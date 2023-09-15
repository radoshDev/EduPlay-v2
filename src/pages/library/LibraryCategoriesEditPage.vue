<script setup lang="ts">
import { LibraryCategoryForm } from '@/components/forms'
import PageLayout from '@/components/layouts/PageLayout.vue'
import { DeleteButton } from '@/components/library'
import { PageTitle } from '@/components/ui'
import type { TaskCategoryInput } from '@/schemas/TaskSchema'
import { useLibraryStoreValues } from '@/stores/library/libraryStore'
import { computed } from 'vue'

const { current, categories } = useLibraryStoreValues()
const title = computed(() => {
  if (!current.value.category) return 'Редагування категорії'
  return `Редагування '${current.value.category.title}'`
})
const backHref = computed(() => {
  if (!current.value.category) return '/library'
  return `/library/${current.value.category.slug}`
})
const defaultValues = computed<TaskCategoryInput | undefined>(() => {
  if (!current.value.category) return
  return {
    slug: current.value.category.slug,
    title: current.value.category.title,
    imageUrl: current.value.category.imageUrl ?? undefined,
    position: current.value.category.position ?? undefined
  }
})
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle :title="title" :back-href="backHref">
        <template #right-action v-if="current.category">
          <DeleteButton type="category" />
        </template>
      </PageTitle>
    </template>
    <v-loader v-if="categories.isLoading" size="lg" />
    <v-alert
      v-else-if="categories.error || !current.category"
      variant="error"
      :message="categories.error || 'Категорію не знайдено'"
    />
    <LibraryCategoryForm
      v-else
      action="update"
      :default-values="defaultValues"
    />
  </PageLayout>
</template>
