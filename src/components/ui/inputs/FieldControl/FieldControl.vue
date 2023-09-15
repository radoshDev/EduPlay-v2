<script setup lang="ts">
type Props = { label: string; error?: string }
defineProps<Props>()
</script>

<template>
  <div class="form-control mb-4 w-full">
    <label class="label">
      <span class="label-text">{{ label }}</span>
    </label>
    <slot />
    <div v-if="error" class="mt-1 text-error">{{ error }}</div>
  </div>
</template>
