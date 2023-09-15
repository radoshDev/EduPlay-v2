<script setup lang="ts">
import { useLibraryStoreValues } from '@/stores/library/libraryStore'
import PageLayout from '@/components/layouts/PageLayout.vue'
import { PageTitle } from '@/components/ui'
import { ButtonAdd, ButtonEdit, ButtonEducation } from '@/components/ui/buttons'
import { CategoryList } from '@/components'
import { computed } from 'vue'
import { useUserStoreValues } from '@/stores/user/userStore'

const { current, categories } = useLibraryStoreValues()

const { user } = useUserStoreValues()
const subcategories = computed(() => {
  if (!current.value.category) return []
  return [...current.value.category.subcategories].sort((a, b) =>
    a.position < b.position ? -1 : 0
  )
})
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle
        :title="current.category?.title || 'Підкатегорії завдань'"
        :back-href="`/library`"
      >
        <template #right-action v-if="current.category">
          <ButtonEdit
            v-if="user?.isAdmin"
            :href="`/library/${current.category.slug}/edit`"
          />
          <ButtonEducation v-else :task-type="current.category.slug" />
        </template>
      </PageTitle>
    </template>
    <v-loader v-if="categories.isLoading" size="lg" />
    <v-alert
      v-else-if="categories.error || !current.category"
      variant="error"
      :message="categories.error || 'Підкатегорії не знайдено'"
    />
    <div v-else class="flex w-full max-w-md flex-col items-center">
      <CategoryList
        :hrefStart="`library/${current.category.slug}`"
        :list="subcategories"
        :is-loading="categories.isLoading"
        :error="categories.error"
      />
      <ButtonAdd :href="`/library/${current.category.slug}/new`" private />
    </div>
  </PageLayout>
</template>
