<script setup lang="ts">
import type { TaskWithDifficulty } from '@/types/db'

defineProps<{ task: TaskWithDifficulty }>()
</script>

<template>
  <div class="w-full max-w-sm mx-auto">
    <table class="table">
      <tbody>
        <tr>
          <th>Значення</th>
          <td>{{ task.value }}</td>
        </tr>
        <tr>
          <th>Результат</th>
          <td>{{ task.result || '-' }}</td>
        </tr>
        <tr>
          <th>Складність</th>
          <td>{{ task.subcategory?.difficulty ?? '-' }}</td>
        </tr>
        <tr>
          <th>Підкатегорія</th>
          <td>{{ task.subcategorySlug }}</td>
        </tr>
        <tr>
          <th>Категорія</th>
          <td>{{ task.type }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
