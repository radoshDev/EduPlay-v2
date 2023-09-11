<script setup lang="ts">
type Props = { label: string; error?: string }
defineProps<Props>()
</script>

<template>
  <div className="form-control mb-4 w-full">
    <label className="label">
      <span className="label-text">{{ label }}</span>
    </label>
    <slot />
    <div v-if="error" className="mt-1 text-error">{{ error }}</div>
  </div>
</template>
