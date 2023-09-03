<script setup lang="ts">
import ButtonIcon from '../buttons/ButtonIcon/ButtonIcon.vue'
type Props = { title: string; backHref?: string }
defineProps<Props>()
</script>

<template>
  <div className="mb-3 flex items-center gap-3">
    <ButtonIcon
      v-if="backHref"
      :icon="{ name: 'bi-box-arrow-in-left', scale: 1.5 }"
      color="primary"
      :href="backHref"
    />
    <slot name="left-action"></slot>
    <h3 className="flex-1 text-center text-2xl font-bold">{{ title }}</h3>
    <slot name="right-action"></slot>
  </div>
</template>
