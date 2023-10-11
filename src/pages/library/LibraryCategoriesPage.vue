<script setup lang="ts">
import { CategoryList } from '@/components'
import PageLayout from '@/components/layouts/PageLayout.vue'
import { PageTitle } from '@/components/ui'
import { ButtonAdd, ButtonSearch } from '@/components/ui/buttons'
import { useLibraryStoreValues } from '@/stores/library/libraryStore'
import { useStudentStoreValues } from '@/stores/student/studentStore'
import { useUserStoreValues } from '@/stores/user/userStore'
import { computed } from 'vue'

const { currentStudent } = useStudentStoreValues()
const { categories } = useLibraryStoreValues()
const { user } = useUserStoreValues()
const backHref = computed(() =>
  currentStudent.value ? `/education/${currentStudent.value.id}` : '/account'
)
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle title="Бібліотека" :back-href="backHref">
        <template #right-action>
          <ButtonSearch v-if="user?.isAdmin" />
        </template>
      </PageTitle>
    </template>
    <v-loader v-if="categories.isLoading" size="lg" />
    <v-alert
      v-else-if="categories.error || !categories.data"
      variant="error"
      :message="categories.error || 'Категорії не завантажено'"
    />
    <div v-else class="flex w-full max-w-md flex-col items-center">
      <CategoryList
        hrefStart="library"
        :list="categories.data"
        :is-loading="categories.isLoading"
        :error="categories.error"
      />
      <ButtonAdd private href="/library/new" />
    </div>
  </PageLayout>
</template>
