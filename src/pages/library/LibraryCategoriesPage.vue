<script setup lang="ts">
import { CategoryList } from '@/components'
import PageLayout from '@/components/layouts/PageLayout.vue'
import { PageTitle } from '@/components/ui'
import { ButtonAdd } from '@/components/ui/buttons'
import { useLibraryStoreValues } from '@/stores/library/libraryStore'
import { useStudentStoreValues } from '@/stores/student/studentStore'
import { computed } from 'vue'

const { currentStudent } = useStudentStoreValues()
const { categories } = useLibraryStoreValues()
const backHref = computed(() =>
  currentStudent.value ? `/education/${currentStudent.value.id}` : '/account'
)
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle title="Бібліотека" :back-href="backHref" />
    </template>
    <div
      v-if="categories.data"
      class="flex w-full max-w-md flex-col items-center"
    >
      <CategoryList
        hrefStart="library"
        :list="categories.data"
        :is-loading="categories.isLoading"
        :error="categories.error"
      />
      <ButtonAdd private href="/library/new" />
    </div>
    <v-alert v-else variant="error" message="Категорії не завантажено" />
  </PageLayout>
</template>
