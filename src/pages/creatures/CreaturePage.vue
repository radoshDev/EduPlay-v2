<script setup lang="ts">
import { CreatureInfo } from '@/components/creatures'
import PageLayout from '@/components/layouts/PageLayout.vue'
import { AlertNotification, PageTitle } from '@/components/ui'
import { ButtonEdit } from '@/components/ui/buttons'
import { useCreatureStoreValues } from '@/stores/creature/creatureStore'

const { currentCreature: creature } = useCreatureStoreValues()
</script>

<template>
  <PageLayout v-if="creature">
    <template #title>
      <PageTitle :title="creature.title" back-href=".">
        <template #right-action>
          <ButtonEdit :href="`${creature.slug}/edit`" />
        </template>
      </PageTitle>
    </template>
    <CreatureInfo :creature="creature" />
  </PageLayout>
  <AlertNotification v-else variant="error" message="Істоту не знайдено" />
</template>
