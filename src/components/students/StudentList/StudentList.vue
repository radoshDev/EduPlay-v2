<script setup lang="ts">
import { useStudentsStore } from '@/stores/students/studentsStore'
import StudentAvatar from '../StudentAvatar/StudentAvatar.vue'
import { VARIANT_COLORS } from '@/utils/constants'
import { AlertNotification } from '@/components/ui'

const { students } = useStudentsStore()
</script>

<template>
  <div className="flex flex-1 flex-wrap content-center justify-around gap-6">
    <div v-if="students.isLoading">Loading...</div>
    <AlertNotification
      v-else-if="students.error"
      :message="students.error"
      variant="error"
    />
    <template v-else>
      <StudentAvatar
        v-for="(student, i) in students.data"
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
..
