<script setup lang="ts">
import { LibraryTaskForm } from '@/components/forms'
import PageLayout from '@/components/layouts/PageLayout.vue'
import { PageTitle } from '@/components/ui'
import { useLibraryStore } from '@/stores/library/libraryStore'
import { computed, ref } from 'vue'

const store = useLibraryStore()
const subcategory = ref(store.current.subcategory)
const parentPath = computed(() => {
  if (!subcategory.value) return '/library'
  return `/library/${subcategory.value.parentSlug}/${subcategory.value.slug}`
})
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle title="Нове завдання" :back-href="parentPath" />
      <LibraryTaskForm
        v-if="subcategory"
        action="add"
        :default-values="{
          subcategorySlug: subcategory.slug,
          type: subcategory.parentSlug
        }"
      />
      <div v-else>
        <v-alert variant="error" message="Підкатегорію не знайдено" />
      </div>
    </template>
  </PageLayout>
</template>
