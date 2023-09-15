<script setup lang="ts">
import PageLayout from '@/components/layouts/PageLayout.vue'
import { TasksList } from '@/components/library'
import { PageTitle } from '@/components/ui'
import { ButtonAdd, ButtonEdit, ButtonEducation } from '@/components/ui/buttons'
import { useLibraryStoreValues } from '@/stores/library/libraryStore'
import { useUserStoreValues } from '@/stores/user/userStore'
import { computed } from 'vue'

const { current, tasks, categories } = useLibraryStoreValues()

const { user } = useUserStoreValues()
const title = computed(() => {
  if (!current.value.subcategory) return 'Список завдань'
  return current.value.subcategory.title
})
const backHref = computed(() => {
  if (!current.value.subcategory) return '/library'
  return `/library/${current.value.subcategory.parentSlug}`
})
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle :title="title" :back-href="backHref">
        <template #right-action v-if="current.subcategory">
          <ButtonEdit
            v-if="user?.isAdmin"
            :href="`/library/${current.subcategory.parentSlug}/${current.subcategory.slug}/edit`"
          />
          <ButtonEducation v-else :task-type="current.subcategory.slug" />
        </template>
      </PageTitle>
    </template>
    <v-loader v-if="categories.isLoading || tasks.isLoading" size="lg" />
    <v-alert
      v-else-if="categories.error || tasks.error || !current.subcategory"
      variant="error"
      :message="categories.error || tasks.error || 'Список не знайдено'"
    />
    <div v-else class="flex w-full max-w-xl flex-col items-center">
      <TasksList
        :tasks="current.subcategory.tasks"
        :category-slug="current.subcategory.parentSlug"
      />
      <ButtonAdd
        :href="`/library/${current.subcategory.parentSlug}/${current.subcategory.slug}/new`"
        private
      />
    </div>
  </PageLayout>
</template>
