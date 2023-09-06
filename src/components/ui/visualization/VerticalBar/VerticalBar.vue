<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  type ChartData,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type Props = {
  title: string
  labels: string[]
  datasets: ChartData<'bar', number[]>['datasets']
  legend?: boolean
}

defineProps<Props>()
</script>

<template>
  <Bar
    :options="{
      responsive: true,
      plugins: {
        legend: { display: legend || false },
        title: {
          display: true,
          text: title
        }
      }
    }"
    :data="{
      labels,
      datasets
    }"
  />
</template>

<style scoped lang="scss"></style>
