<script setup lang="ts">
import { CreatureForm } from '@/components/forms'
import PageLayout from '@/components/layouts/PageLayout.vue'
import { AlertNotification, PageTitle } from '@/components/ui'
import { useCreatureStoreValues } from '@/stores/creature/creatureStore'
const { currentCategory } = useCreatureStoreValues()
</script>

<template>
  <PageLayout v-if="currentCategory">
    <template #title>
      <PageTitle title="Нова істота" back-href="." />
    </template>
    <CreatureForm
      action="addCreature"
      :default-values="{ categorySlug: currentCategory.slug }"
    />
  </PageLayout>
  <AlertNotification
    v-else
    variant="error"
    message="Категорія істоти не знайдена"
  />
</template>
