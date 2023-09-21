<script setup lang="ts">
import { transformStatData } from '@/helpers/transformStatData'
import { useStudentStoreValues } from '@/stores/student/studentStore'
import { computed } from 'vue'
const { currentStudent } = useStudentStoreValues()

const maxDailyProgress = computed(() => {
  if (!currentStudent.value) return
  return currentStudent.value.progress.reduce((result, curr) => {
    if (curr.value > result.value) return curr
    return result
  })
})

const maxMonthlyProgress = computed(() => {
  if (!currentStudent.value) return
  return transformStatData(currentStudent.value.progress, 'year').reduce(
    (result, curr) => {
      if (curr.value > result.value) return curr
      return result
    }
  )
})
</script>

<template>
  <table
    class="table max-w-lg"
    v-if="currentStudent && currentStudent.progress.length > 0"
  >
    <thead>
      <tr>
        <th>Проміжок</th>
        <th>Дата</th>
        <th>Значення</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Денний</td>
        <td>{{ maxDailyProgress?.date }}</td>
        <td>{{ maxDailyProgress?.value }}</td>
      </tr>
      <tr>
        <td>Місячний</td>
        <td>{{ maxMonthlyProgress?.date }}</td>
        <td>{{ maxMonthlyProgress?.value }}</td>
      </tr>
    </tbody>
  </table>
</template>
