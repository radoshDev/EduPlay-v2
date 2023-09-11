<script setup lang="ts">
import { CategoryDeleteButton } from '@/components/creatures'
import { CreatureCategoryForm } from '@/components/forms'
import PageLayout from '@/components/layouts/PageLayout.vue'
import { AlertNotification, PageTitle } from '@/components/ui'
import type { CreatureCategoryInput } from '@/schemas/CreatureSchema'
import { useCreatureStoreValues } from '@/stores/creature/creatureStore'
import { computed } from 'vue'

const { currentCategory: category } = useCreatureStoreValues()
const backPath = computed(() => {
  if (!category.value) return '/creatures'
  return `/creatures/${category.value.slug}`
})
const defaultValues = computed<CreatureCategoryInput | undefined>(() => {
  if (!category.value) return
  return {
    ...category.value,
    description: category.value.description || undefined,
    imageUrl: category.value.imageUrl || undefined,
    sourceLink: category.value.imageUrl || undefined
  }
})
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle
        :title="`Редагування ${category?.title || 'категорії'}`"
        :back-href="backPath"
      >
        <template #right-action v-if="category">
          <CategoryDeleteButton :category="category" />
        </template>
      </PageTitle>
    </template>

    <CreatureCategoryForm
      v-if="category"
      action="updateCategory"
      :default-values="defaultValues"
    />
    <div v-else>
      <AlertNotification
        variant="error"
        message="Категорію для редагування не знайдено"
      />
    </div>
  </PageLayout>
</template>
