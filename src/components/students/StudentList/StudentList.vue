<script setup lang="ts">
import { useStudentStore } from '@/stores/student/studentStore'
import StudentAvatar from '../StudentAvatar/StudentAvatar.vue'
import { VARIANT_COLORS } from '@/utils/constants'
import { AlertNotification, PreloaderBlock } from '@/components/ui'

const { students } = useStudentStore()
</script>

<template>
  <div className="flex flex-1 flex-wrap content-center justify-around gap-6">
    <PreloaderBlock v-if="students.isLoading || !students.data" size="lg" />
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
