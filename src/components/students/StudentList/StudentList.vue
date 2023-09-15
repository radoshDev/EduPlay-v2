<script setup lang="ts">
import StudentAvatar from '../StudentAvatar/StudentAvatar.vue'
import { VARIANT_COLORS } from '@/utils/constants'
import type { Student } from '@/types/db'

defineProps<{ students: Student[] }>()
</script>

<template>
  <div className="flex flex-1 flex-wrap content-center justify-around gap-6">
    <v-alert
      v-if="students.length === 0"
      variant="info"
      message="Ще немає створених студентів"
    />
    <template v-else>
      <StudentAvatar
        v-for="(student, i) in students"
        :key="student.id"
        :href="`/education/${student.id}`"
        :title="student.name"
        :imageSrc="student.avatar"
        :variant="VARIANT_COLORS[i]"
        size="md"
      />
    </template>
  </div>
</template>
