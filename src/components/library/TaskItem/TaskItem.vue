<script setup lang="ts">
defineProps<{ value: string; href?: string }>()
</script>

<template>
  <component
    :is="href ? 'router-link' : 'div'"
    class="badge badge-ghost badge-lg text-lg font-bold"
    :to="href"
  >
    {{ value }}
  </component>
</template>
