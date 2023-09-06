<script setup lang="ts">
import type { Category } from '@/types'
import { AlertNotification, CategoryCard } from '@/components/ui'

type Props = {
  list: Category[]
  hrefStart: string
}
defineProps<Props>()
</script>

<template>
  <AlertNotification
    v-if="list.length === 0"
    variant="info"
    message="No items yet..."
  />
  <template v-else>
    <CategoryCard
      v-for="category in list"
      :key="category.slug"
      :href="`/${hrefStart}/${category.slug}`"
      :title="category.title"
      :imageSrc="category.imageUrl"
    />
  </template>
</template>
