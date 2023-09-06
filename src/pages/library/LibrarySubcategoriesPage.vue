<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useLibraryStore from '@/stores/library/libraryStore'
import PageLayout from '@/components/layouts/PageLayout.vue'
import { PageTitle } from '@/components/ui'
import { ButtonAdd, ButtonEducation } from '@/components/ui/buttons'
import { CategoryList } from '@/components'
import OverflowLayout from '@/components/layouts/OverflowLayout.vue'
import { computed } from 'vue'

const { currentCategory } = storeToRefs(useLibraryStore())
const subcategories = computed(() => {
  if (!currentCategory.value) return []
  return [...currentCategory.value.subcategories].sort((a, b) =>
    a.position < b.position ? -1 : 0
  )
})
</script>

<template>
  <PageLayout v-if="currentCategory">
    <template #title>
      <PageTitle :title="currentCategory.title" back-href=".">
        <template #right-action>
          <ButtonEducation :type="currentCategory.slug" />
        </template>
      </PageTitle>
    </template>
    <div className="flex w-full max-w-md flex-col items-center">
      <OverflowLayout>
        <CategoryList
          :list="subcategories"
          :hrefStart="`library/${currentCategory.slug}`"
        />
      </OverflowLayout>
      <ButtonAdd :href="`${currentCategory.slug}/new`" private />
    </div>
  </PageLayout>
</template>
