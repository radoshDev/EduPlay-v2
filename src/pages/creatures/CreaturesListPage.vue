<script setup lang="ts">
import { CreatureList } from '@/components/creatures'
import PageLayout from '@/components/layouts/PageLayout.vue'
import { AlertNotification, PageTitle } from '@/components/ui'
import { ButtonAdd, ButtonEducation, ButtonText } from '@/components/ui/buttons'
import { useCreatureStoreValues } from '@/stores/creature/creatureStore'

const { currentCategory } = useCreatureStoreValues()
</script>

<template>
  <PageLayout v-if="currentCategory">
    <template #title>
      <PageTitle :title="currentCategory.title" back-href="/creatures">
        <template #right-action>
          <ButtonEducation />
        </template>
      </PageTitle>
    </template>
    <div className="flex flex-1 flex-col items-center">
      <ButtonText
        v-if="currentCategory.sourceLink"
        :href="currentCategory.sourceLink"
        variant="warning"
        size="sm"
        target="_blank"
      >
        Source
      </ButtonText>
      <CreatureList />
      <ButtonAdd private :href="`/creatures/${currentCategory.slug}/new`" />
    </div>
  </PageLayout>
  <AlertNotification v-else variant="error" message="Категорію не знайдено" />
</template>
