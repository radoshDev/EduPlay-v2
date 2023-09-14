<script setup lang="ts">
import { LibrarySubcategoryForm } from '@/components/forms'
import PageLayout from '@/components/layouts/PageLayout.vue'
import { DeleteButton } from '@/components/library'
import { PageTitle } from '@/components/ui'
import { useLibraryStore } from '@/stores/library/libraryStore'
import { computed, ref } from 'vue'

const store = useLibraryStore()
const subcategory = ref(store.current.subcategory)

const title = computed(() => {
  if (!subcategory.value) return 'Редагування підкатегорії'
  return `Редагування '${subcategory.value.title}'`
})
const backHref = computed(() => {
  if (!subcategory.value) return '/library'
  return `/library/${subcategory.value.parentSlug}`
})

const defaultValues = computed(() => {
  if (!subcategory.value) return { parentSlug: 'test' }
  return {
    ...subcategory.value,
    imageUrl: subcategory.value.imageUrl ?? undefined,
    position: subcategory.value.position ?? undefined
  }
})
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle :title="title" :back-href="backHref">
        <template #right-action v-if="subcategory">
          <DeleteButton type="subcategory" />
        </template>
      </PageTitle>
      <LibrarySubcategoryForm
        v-if="subcategory"
        action="update"
        :default-values="defaultValues"
      />
      <div v-else>
        <v-alert variant="error" message="Категорію не знайдено" />
      </div>
    </template>
  </PageLayout>
</template>
