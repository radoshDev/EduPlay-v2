<script setup lang="ts">
import { ImageCard } from '@/components/ui'
import { useCreatureStoreValues } from '@/stores/creature/creatureStore'

const { currentCategory } = useCreatureStoreValues()
</script>

<template>
  <div
    class="mb-6 mt-3 flex flex-1 flex-wrap content-start items-start justify-center gap-3 overflow-auto"
  >
    <v-alert
      v-if="!currentCategory"
      variant="error"
      message="Істот не знайдено"
    />
    <v-alert
      v-else-if="currentCategory.creatures.length === 0"
      variant="info"
      :message="`Список ${currentCategory.title} порожній.`"
    />
    <template v-else>
      <ImageCard
        v-for="creature in currentCategory.creatures"
        :key="creature.slug"
        :title="creature.title"
        :imageSrc="creature.mainImage"
        :href="`/creatures/${creature.categorySlug}/${creature.slug}`"
      />
    </template>
  </div>
</template>
