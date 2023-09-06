<script setup lang="ts">
import { CategoryList } from '@/components'
import OverflowLayout from '@/components/layouts/OverflowLayout.vue'
import PageLayout from '@/components/layouts/PageLayout.vue'
import { AlertNotification, PageTitle, PreloaderBlock } from '@/components/ui'
import { ButtonAdd } from '@/components/ui/buttons'
import useLibraryStore from '@/stores/library/libraryStore'
import { useStudentStore } from '@/stores/student/studentStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const { currentStudent } = storeToRefs(useStudentStore())
const { categories } = storeToRefs(useLibraryStore())
const backHref = computed(() =>
  currentStudent.value ? `/education/${currentStudent.value.id}` : '/account'
)
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle title="Бібліотека" :back-href="backHref" />
    </template>
    <div className="flex w-full max-w-md flex-col items-center">
      <OverflowLayout>
        <PreloaderBlock v-if="categories.isLoading" size="lg" />
        <AlertNotification
          v-else-if="categories.error || !categories.data"
          variant="error"
          :message="categories.error || 'No categories'"
        />
        <CategoryList v-else :list="categories.data" hrefStart="library" />
      </OverflowLayout>
      <ButtonAdd private href="/library/new" />
    </div>
  </PageLayout>
</template>
