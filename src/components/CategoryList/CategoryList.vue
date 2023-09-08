<script setup lang="ts">
import type { Category } from '@/types'
import {
  AlertNotification,
  CategoryCard,
  PreloaderBlock
} from '@/components/ui'

type Props = {
  list: Category[] | null
  hrefStart: string
  isLoading?: boolean
  error?: string
}
defineProps<Props>()
</script>

<template>
  <div className="flex w-full flex-1 flex-col gap-4 overflow-auto p-3">
    <PreloaderBlock v-if="isLoading" size="lg" />
    <AlertNotification
      v-else-if="error || !list"
      variant="error"
      :message="error || 'No categories'"
    />
    <AlertNotification
      v-else-if="list.length === 0"
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
  </div>
</template>
