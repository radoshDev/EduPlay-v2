<script setup lang="ts">
import { ButtonText } from '@/components/ui/buttons'
import type { Creature } from '@/types/db'

defineProps<{ creature: Creature }>()
</script>

<template>
  <div className="overflow-auto w-full text-center">
    <ButtonText
      v-if="creature.source"
      variant="info"
      :href="creature.source"
      target="_blank"
      size="sm"
    >
      Джерело
      <v-icon name="io-link-sharp" />
    </ButtonText>
    <v-image
      class="m-auto mt-6"
      :src="creature.mainImage"
      :alt="creature.title"
    />
    <div className="mt-4 flex flex-col gap-4 items-center">
      <v-image
        v-for="image in creature.media"
        :key="image"
        :src="image"
        :alt="creature.title"
      />
    </div>

    <div
      v-if="creature.description"
      className="text-start text-3xl leading-normal mt-6 "
    >
      {{ creature.description }}
    </div>
  </div>
</template>
