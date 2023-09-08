<script setup lang="ts">
import { useLibraryStoreValues } from '@/stores/library/libraryStore'
import PageLayout from '@/components/layouts/PageLayout.vue'
import { PageTitle } from '@/components/ui'
import { ButtonAdd, ButtonEducation } from '@/components/ui/buttons'
import { CategoryList } from '@/components'
import { computed } from 'vue'

const { currentCategory, categories } = useLibraryStoreValues()
const subcategories = computed(() => {
  if (!currentCategory.value) return null
  return [...currentCategory.value.subcategories].sort((a, b) =>
    a.position < b.position ? -1 : 0
  )
})
</script>

<template>
  <PageLayout v-if="currentCategory">
    <template #title>
      <PageTitle :title="currentCategory.title" :back-href="`/library`">
        <template #right-action>
          <ButtonEducation :task-type="currentCategory.slug" />
        </template>
      </PageTitle>
    </template>
    <div className="flex w-full max-w-md flex-col items-center">
      <CategoryList
        :hrefStart="`library/${currentCategory.slug}`"
        :list="subcategories"
        :is-loading="categories.isLoading"
        :error="categories.error"
      />
      <ButtonAdd :href="`${currentCategory.slug}/new`" private />
    </div>
  </PageLayout>
</template>
