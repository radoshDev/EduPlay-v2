<script setup lang="ts">
import { useLibraryStoreValues } from '@/stores/library/libraryStore'
import PageLayout from '@/components/layouts/PageLayout.vue'
import { PageTitle } from '@/components/ui'
import { ButtonAdd, ButtonEdit, ButtonEducation } from '@/components/ui/buttons'
import { CategoryList } from '@/components'
import { computed, ref } from 'vue'
import { useUserStoreValues } from '@/stores/user/userStore'

const { current, categories } = useLibraryStoreValues()
const category = ref(current.value.category)
const { user } = useUserStoreValues()
const subcategories = computed(() => {
  if (!category.value) return null
  return [...category.value.subcategories].sort((a, b) =>
    a.position < b.position ? -1 : 0
  )
})
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle
        :title="category?.title || 'Підкатегорії завдань'"
        :back-href="`/library`"
      >
        <template #right-action v-if="category">
          <ButtonEdit
            v-if="user?.isAdmin"
            :href="`/library/${category.slug}/edit`"
          />
          <ButtonEducation v-else :task-type="category.slug" />
        </template>
      </PageTitle>
    </template>
    <div
      className="flex w-full max-w-md flex-col items-center"
      v-if="category && subcategories"
    >
      <CategoryList
        :hrefStart="`library/${category.slug}`"
        :list="subcategories"
        :is-loading="categories.isLoading"
        :error="categories.error"
      />
      <ButtonAdd :href="`${category.slug}/new`" private />
    </div>
    <v-alert v-else variant="error" message="Категорію не знайдено" />
  </PageLayout>
</template>
