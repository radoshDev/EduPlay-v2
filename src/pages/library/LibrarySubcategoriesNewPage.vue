<script setup lang="ts">
import { LibrarySubcategoryForm } from '@/components/forms'
import PageLayout from '@/components/layouts/PageLayout.vue'
import { PageTitle } from '@/components/ui'
import { useLibraryStore } from '@/stores/library/libraryStore'
import { computed, ref } from 'vue'

const store = useLibraryStore()
const category = ref(store.current.category)

const backHref = computed(() => {
  if (!category.value) return '/library'
  return `/library/${category.value.slug}`
})
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle title="Нова підкатегорія" :back-href="backHref" />
      <LibrarySubcategoryForm
        v-if="category"
        action="add"
        :default-values="{ parentSlug: category.slug }"
      />
      <div v-else>
        <v-alert variant="error" message="Категорію не знайдено" />
      </div>
    </template>
  </PageLayout>
</template>
