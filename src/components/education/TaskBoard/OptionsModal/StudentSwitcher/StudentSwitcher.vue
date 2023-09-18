<script setup lang="ts">
import { StudentAvatar } from '@/components/students'
import { useStudentStoreValues } from '@/stores/student/studentStore'
import { useTaskStoreValues } from '@/stores/task/taskStore'
import { useRouter } from 'vue-router'

const { taskType } = useTaskStoreValues()
const { students, studentId } = useStudentStoreValues()
const router = useRouter()

const emits = defineEmits<{ (e: 'closeModal'): void }>()

function handleSwitchStudent(id: string) {
  if (id === studentId.value) return
  studentId.value = id
  emits('closeModal')
  router.push(`/education/${id}/${taskType.value}`)
}
</script>

<template>
  <div v-if="students.data">
    <div class="text-center font-bold text-xl">Студенти</div>
    <div class="flex gap-6 mt-4">
      <StudentAvatar
        v-for="student in students.data"
        :key="student.id"
        :title="student.name"
        :image-src="student.avatar"
        :variant="studentId === student.id ? 'success' : 'neutral'"
        size="xs"
        role="button"
        @click="handleSwitchStudent(student.id)"
      />
    </div>
  </div>
</template>
