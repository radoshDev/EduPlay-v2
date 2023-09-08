<script setup lang="ts">
import { ButtonText } from '@/components/ui/buttons'
import type { Creature } from '@/types/db'

defineProps<{ creature: Creature }>()
</script>

<template>
  <div className="overflow-auto">
    <img :src="creature.mainImage" :alt="creature.title" />
    <div className="mt-4 flex flex-col gap-4">
      <img
        v-for="image in creature.media"
        :key="image"
        :src="image"
        :alt="creature.title"
      />
    </div>

    <ButtonText
      v-if="creature.source"
      variant="info"
      :href="creature.source"
      target="_blank"
    >
      More Info
      <v-icon name="io-link-sharp" />
    </ButtonText>

    <div v-if="creature.description" className="mt-6 md:mx-auto md:max-w-md">
      {{ creature.description }}
    </div>
  </div>
</template>
