<script setup lang="ts">
import ContentTask from './ContentTask/ContentTask.vue'
import ContentTaskHint from './ContentTaskHint/ContentTaskHint.vue'
import ContentTaskSalute from './ContentTaskSalute/ContentTaskSalute.vue'
import { useCreatureStoreValues } from '@/stores/creature/creatureStore'
import { useLibraryStoreValues } from '@/stores/library/libraryStore'

const { tasks } = useLibraryStoreValues()
const { creatureCategories: creatures } = useCreatureStoreValues()
</script>

<template>
  <div className="relative flex flex-1 flex-col justify-center items-center">
    <v-loader v-if="tasks.isLoading || creatures.isLoading" size="lg" />
    <v-alert
      v-else-if="tasks.error || creatures.error"
      variant="error"
      :message="tasks.error || creatures.error"
    />
    <template v-else>
      <ContentTask />
      <ContentTaskHint />
      <ContentTaskSalute />
    </template>
  </div>
</template>
