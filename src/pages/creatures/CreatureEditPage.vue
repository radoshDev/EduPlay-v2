<script setup lang="ts">
import { CreatureForm } from '@/components/forms'
import PageLayout from '@/components/layouts/PageLayout.vue'
import { PageTitle } from '@/components/ui'
import { useCreatureStoreValues } from '@/stores/creature/creatureStore'
import { computed } from 'vue'
const { currentCreature: creature } = useCreatureStoreValues()

const backPath = computed(() => {
  if (!creature.value) return
  return `/creatures/${creature.value.categorySlug}/${creature.value.slug}`
})
</script>

<template>
  <PageLayout v-if="creature">
    <template #title>
      <PageTitle title="Edit Creature" :back-href="backPath" />
    </template>
    <CreatureForm
      action="updateCreature"
      :defaultValues="{
        ...creature,
        description: creature.description || undefined,
        source: creature.source || undefined
      }"
    />
  </PageLayout>
</template>
