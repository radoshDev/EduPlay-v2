<script setup lang="ts">
type Props = { title: string; backHref?: string }
defineProps<Props>()
</script>

<template>
  <div className="mb-3 flex items-center gap-3">
    <v-btn
      v-if="backHref"
      variant="primary"
      :icon="{ name: 'bi-box-arrow-in-left', scale: 1.5 }"
      :href="backHref"
    />
    <slot name="left-action"></slot>
    <h3 className="flex-1 text-center text-2xl font-bold">{{ title }}</h3>
    <slot name="right-action"></slot>
  </div>
</template>
