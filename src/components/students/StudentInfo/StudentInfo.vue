<script setup lang="ts">
import { StudentAvatar } from '..'
import { BadgeTag } from '@/components/ui'
import { DIFFICULTY_TYPES } from '@/utils/constants'
import type { Student } from '@/types/db'

defineProps<{ student: Student }>()
</script>

<template>
  <div class="mb-4 w-full">
    <StudentAvatar
      :title="student.name"
      :imageSrc="student.avatar"
      size="lg"
      variant="success"
    />
    <div class="mt-5 font-bold">
      <span class="mr-2">Difficulty:</span>
      <BadgeTag
        :text="DIFFICULTY_TYPES[student.difficulty]"
        color="primary"
        size="lg"
        outline
      />
    </div>
    <div class="mt-5 font-bold">
      <span class="mr-2">Round Length:</span>
      <BadgeTag
        :text="`${student.roundLength}`"
        color="primary"
        size="lg"
        outline
      />
    </div>
  </div>
</template>
