<script setup lang="ts">
import type { Category } from '@/types'
import { CategoryCard } from '@/components/ui'

type Props = {
  list: Category[]
  hrefStart: string
  isLoading?: boolean
}
defineProps<Props>()
</script>

<template>
  <div className="flex w-full flex-1 flex-col gap-4 overflow-auto p-3">
    <v-loader v-if="isLoading" size="lg" />

    <v-alert
      v-else-if="list.length === 0"
      variant="info"
      message="No categories yet..."
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
  </div>
</template>
