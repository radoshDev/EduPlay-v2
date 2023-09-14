<script setup lang="ts">
import PageLayout from '@/components/layouts/PageLayout.vue'
import { TasksList } from '@/components/library'
import { AlertNotification, PageTitle } from '@/components/ui'
import { ButtonAdd, ButtonEdit, ButtonEducation } from '@/components/ui/buttons'
import { useLibraryStore } from '@/stores/library/libraryStore'
import { useUserStoreValues } from '@/stores/user/userStore'
import { computed, ref } from 'vue'

const store = useLibraryStore()
const subcategory = ref(store.current.subcategory) //May lost reactivity
const { user } = useUserStoreValues()
const title = computed(() => {
  if (!subcategory.value) return 'Список завдань'
  return subcategory.value.title
})
const backHref = computed(() => {
  if (!subcategory.value) return '/library'
  return `/library/${subcategory.value.parentSlug}`
})
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle :title="title" :back-href="backHref">
        <template #right-action v-if="subcategory">
          <ButtonEdit
            v-if="user?.isAdmin"
            :href="`/library/${subcategory.parentSlug}/${subcategory.slug}/edit`"
          />
          <ButtonEducation v-else :task-type="subcategory.slug" />
        </template>
      </PageTitle>
    </template>
    <div v-if="subcategory" class="flex w-full max-w-xl flex-col items-center">
      <TasksList
        :tasks="subcategory.tasks"
        :category-slug="subcategory.parentSlug"
      />
      <ButtonAdd :href="`${subcategory.slug}/new`" private />
    </div>
    <div v-else>
      <AlertNotification variant="error" message="Підкатегорію не знайдено" />
    </div>
  </PageLayout>
</template>
