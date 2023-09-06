<script setup lang="ts">
import PageLayout from '@/components/layouts/PageLayout.vue'
import { TasksList } from '@/components/library'
import { PageTitle } from '@/components/ui'
import { ButtonAdd, ButtonEducation } from '@/components/ui/buttons'
import useLibraryStore from '@/stores/library/libraryStore'
import { storeToRefs } from 'pinia'

const { currentSubcategory } = storeToRefs(useLibraryStore())
</script>

<template>
  <PageLayout v-if="currentSubcategory">
    <template #title>
      <PageTitle :title="currentSubcategory.title" back-href=".">
        <template #right-action>
          <ButtonEducation :type="currentSubcategory.slug" />
        </template>
      </PageTitle>
    </template>
    <div className="flex w-full max-w-xl flex-col items-center ">
      <TasksList />
      <ButtonAdd :href="`${currentSubcategory.slug}/new`" private />
    </div>
  </PageLayout>
</template>
