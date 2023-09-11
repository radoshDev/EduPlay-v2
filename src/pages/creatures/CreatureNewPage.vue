<script setup lang="ts">
import { CreatureForm } from '@/components/forms'
import PageLayout from '@/components/layouts/PageLayout.vue'
import { AlertNotification, PageTitle } from '@/components/ui'
import { useCreatureStoreValues } from '@/stores/creature/creatureStore'
import { computed } from 'vue'
const { currentCategory: category } = useCreatureStoreValues()

const backPath = computed(() => {
  if (!category.value) return '/creatures'
  return `/creatures/${category.value.slug}`
})
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle title="Нова істота" :back-href="backPath" />
    </template>
    <CreatureForm
      v-if="category"
      action="addCreature"
      :default-values="{ categorySlug: category.slug }"
    />
    <div v-else>
      <AlertNotification
        variant="error"
        message="Категорія істоти не знайдена"
      />
    </div>
  </PageLayout>
</template>
