<script setup lang="ts">
import { computed, ref } from 'vue'
import { SelectField } from '@/components/ui/inputs'
import { VerticalBar } from '@/components/ui/visualization'
import { transformStatData } from '@/helpers/transformStatData'
import { useStudentStoreValues } from '@/stores/student/studentStore'
import type { Progress, StudentsProgress } from '@/types/student'
import { GRAPH_COLORS, GRAPH_PERIOD_OPTIONS } from '@/utils/constants'
import { sortByDate } from '@/helpers/sortByDate'

const { students } = useStudentStoreValues()
const statPeriod = ref(GRAPH_PERIOD_OPTIONS[0].value)

const uniqueDates = computed(() => {
  if (!students.value.data) return []

  return [
    ...new Set(
      students.value.data
        .map((student) => student.progress)
        .flat()
        .map((progress) => progress.date)
    )
  ]
})

const studentsProgress = computed<StudentsProgress[]>(() => {
  if (!students.value.data) return []

  return students.value.data.map((student, i) => {
    const progress = uniqueDates.value.map((date) => {
      const entry = student.progress.find((item) => item.date === date)
      return { date, value: entry?.value || 0 }
    })

    progress.sort((a, b) => sortByDate(a.date, b.date))

    return {
      label: student.name,
      backgroundColor: GRAPH_COLORS[i],
      progress
    }
  })
})

const graphData = computed(() => {
  let period = 7
  if (statPeriod.value === 'month') period = 30
  if (statPeriod.value === 'year') period = 365

  const days = uniqueDates.value.length - period
  const startIndex = days > 0 ? days : 0

  let progress: Progress[] = []

  const filteredDataset = studentsProgress.value.map((item, i) => {
    const filteredProgress = item.progress.slice(startIndex)
    const transformedData = transformStatData(
      filteredProgress,
      statPeriod.value
    )
    if (i === 0) {
      progress = transformedData
    }
    return {
      ...item,
      data: transformedData.map(({ value }) => value)
    }
  })
  const filteredLabels = progress.map(({ date }) => date)

  return { dataset: filteredDataset, labels: filteredLabels }
})
</script>

<template>
  <div className="mb-4">
    <SelectField
      v-model="statPeriod"
      label="Період"
      :options="GRAPH_PERIOD_OPTIONS"
    />
  </div>
  <VerticalBar
    legend
    title="Виконано завдань"
    :labels="graphData.labels"
    :datasets="graphData.dataset"
  />
</template>
