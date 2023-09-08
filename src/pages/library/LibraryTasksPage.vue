<script setup lang="ts">
import PageLayout from '@/components/layouts/PageLayout.vue'
import { TasksList } from '@/components/library'
import { PageTitle } from '@/components/ui'
import { ButtonAdd, ButtonEducation } from '@/components/ui/buttons'
import { useLibraryStoreValues } from '@/stores/library/libraryStore'

const { currentSubcategory } = useLibraryStoreValues()
</script>

<template>
  <PageLayout v-if="currentSubcategory">
    <template #title>
      <PageTitle :title="currentSubcategory.title" back-href=".">
        <template #right-action>
          <ButtonEducation :task-type="currentSubcategory.slug" />
        </template>
      </PageTitle>
    </template>
    <div className="flex w-full max-w-xl flex-col items-center ">
      <TasksList />
      <ButtonAdd :href="`${currentSubcategory.slug}/new`" private />
    </div>
  </PageLayout>
</template>
