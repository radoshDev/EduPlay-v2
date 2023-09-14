<script setup lang="ts">
import { LibraryCategoryForm } from '@/components/forms'
import PageLayout from '@/components/layouts/PageLayout.vue'
import { DeleteButton } from '@/components/library'
import { PageTitle } from '@/components/ui'
import type { TaskCategoryInput } from '@/schemas/TaskSchema'
import { useLibraryStore } from '@/stores/library/libraryStore'
import { computed, ref } from 'vue'

const store = useLibraryStore()
const category = ref(store.current.category)
const title = computed(() => {
  if (!category.value) return 'Редагування категорії'
  return `Редагування '${category.value.title}'`
})
const backHref = computed(() => {
  if (!category.value) return '/library'
  return `/library/${category.value.slug}`
})
const defaultValues = computed<TaskCategoryInput | undefined>(() => {
  if (!category.value) return
  return {
    slug: category.value.slug,
    title: category.value.title,
    imageUrl: category.value.imageUrl ?? undefined,
    position: category.value.position ?? undefined
  }
})
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle :title="title" :back-href="backHref">
        <template #right-action v-if="category">
          <DeleteButton type="category" />
        </template>
      </PageTitle>
    </template>
    <LibraryCategoryForm
      v-if="category"
      action="update"
      :default-values="defaultValues"
    />
    <div v-else>
      <v-alert variant="error" message="Категорію не знайдено" />
    </div>
  </PageLayout>
</template>
