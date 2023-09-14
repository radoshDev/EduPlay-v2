<script setup lang="ts">
import { useStudentStoreValues } from '@/stores/student/studentStore'
import StudentAvatar from '../StudentAvatar/StudentAvatar.vue'
import { VARIANT_COLORS } from '@/utils/constants'

const { students } = useStudentStoreValues()
</script>

<template>
  <div className="flex flex-1 flex-wrap content-center justify-around gap-6">
    <v-loader v-if="students.isLoading" size="lg" />
    <v-alert
      v-else-if="students.error || !students.data"
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
