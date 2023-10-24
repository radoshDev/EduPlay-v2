<script setup lang="ts">
type Props = { label?: string; error?: string }
defineProps<Props>()
</script>

<template>
  <div class="form-control w-full">
    <label v-if="label" class="label">
      <span class="label-text">{{ label }}</span>
    </label>
    <slot />
    <div v-if="error" class="mt-1 text-error">{{ error }}</div>
  </div>
</template>
