<script setup lang="ts">
import { CategoryCard } from '@/components/ui'
import { useStudentStore } from '@/stores/student/studentStore'
import { EARN_TYPES } from '@/utils/constants'
import { storeToRefs } from 'pinia'

const { studentId } = storeToRefs(useStudentStore())
</script>

<template>
  <div className="flex w-full max-w-sm flex-col gap-4">
    <CategoryCard
      title="Бібліотека"
      icon-name="io-library-sharp"
      :href="`/library?studentId=${studentId}`"
    />

    <CategoryCard
      v-for="item in EARN_TYPES"
      :key="item.type"
      :href="`/education/${studentId}/${item.type}`"
      :title="item.title"
      :icon-name="item.icon"
      :fill="item.fill"
    />
  </div>
</template>
