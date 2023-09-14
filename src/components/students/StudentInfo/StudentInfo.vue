<script setup lang="ts">
import { useStudentStore } from '@/stores/student/studentStore'
import { StudentAvatar } from '..'
import { storeToRefs } from 'pinia'
import { BadgeTag } from '@/components/ui'
import { DIFFICULTY_TYPES } from '@/utils/constants'
const { currentStudent } = storeToRefs(useStudentStore())
</script>

<template>
  <div class="mb-4" v-if="currentStudent">
    <StudentAvatar
      :title="currentStudent.name"
      :imageSrc="currentStudent.avatar"
      size="lg"
      variant="success"
    />
    <div class="mt-5 font-bold">
      <span class="mr-2">Difficulty:</span>
      <BadgeTag
        :text="DIFFICULTY_TYPES[currentStudent.difficulty]"
        color="primary"
        size="lg"
        outline
      />
    </div>
    <div class="mt-5 font-bold">
      <span class="mr-2">Round Length:</span>
      <BadgeTag
        :text="`${currentStudent.roundLength}`"
        color="primary"
        size="lg"
        outline
      />
    </div>
  </div>
  <v-alert
    v-else
    variant="error"
    message="Інформацію про студента не знайдено 😢"
  />
</template>
