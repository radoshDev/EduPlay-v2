<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { CreatureInfo } from '@/components/creatures'
import PageLayout from '@/components/layouts/PageLayout.vue'
import { PageTitle } from '@/components/ui'
import { ButtonEdit } from '@/components/ui/buttons'
import { useCreatureStoreValues } from '@/stores/creature/creatureStore'
import { useUserStoreValues } from '@/stores/user/userStore'

const { currentCreature: creature } = useCreatureStoreValues()
const { user } = useUserStoreValues()
const categoryPath = computed(() => {
  if (!creature.value) return '/creatures'
  return `/creatures/${creature.value.categorySlug}`
})
const { query } = useRoute()
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle
        :title="creature?.title || 'Істота'"
        :back-href="(query.cb as string) || categoryPath"
      >
        <template #right-action v-if="creature">
          <ButtonEdit
            v-if="user?.isAdmin"
            :href="`${categoryPath}/${creature.slug}/edit`"
          />
        </template>
      </PageTitle>
    </template>
    <CreatureInfo v-if="creature" :creature="creature" />
    <div v-else>
      <v-alert variant="error" message="Істоту не знайдено" />
    </div>
  </PageLayout>
</template>
