<script setup lang="ts">
import { setUITheme } from '@/helpers/setUITheme'
import { ref, watch } from 'vue'

const isLight = ref<boolean>(localStorage.getItem('theme') === 'light')

watch(isLight, () => {
  const theme = isLight.value ? 'light' : 'night'
  setUITheme(theme)
  localStorage.setItem('theme', theme)
})
</script>

<template>
  <div class="flex gap-2 items-center">
    <span>{{ isLight ? 'Світла' : 'Темна' }} тема:</span>
    <input type="checkbox" class="toggle" v-model="isLight" />
  </div>
</template>
