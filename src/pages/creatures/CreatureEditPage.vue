<script setup lang="ts">
import { CreatureDeleteButton } from '@/components/creatures'
import { CreatureForm } from '@/components/forms'
import PageLayout from '@/components/layouts/PageLayout.vue'
import { PageTitle } from '@/components/ui'
import { useCreatureStoreValues } from '@/stores/creature/creatureStore'
import { computed } from 'vue'

const { currentCreature: creature } = useCreatureStoreValues()
const backPath = computed(() => {
  if (!creature.value) return '/creatures'
  return `/creatures/${creature.value.categorySlug}/${creature.value.slug}`
})
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle
        :title="`Редагування ${creature?.title || 'істоти'}`"
        :back-href="backPath"
      >
        <template #right-action v-if="creature">
          <CreatureDeleteButton :creature="creature" />
        </template>
      </PageTitle>
    </template>
    <CreatureForm
      v-if="creature"
      action="updateCreature"
      :defaultValues="{
        ...creature,
        description: creature.description || undefined,
        source: creature.source || undefined
      }"
    />
    <div v-else>
      <v-alert variant="error" message="Істоту для редагування не знайдено" />
    </div>
  </PageLayout>
</template>
