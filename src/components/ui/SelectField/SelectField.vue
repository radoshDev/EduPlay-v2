<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  label: string
  options: { value: string | number; label: string }[]
  modelValue?: number | string
  error?: string
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', val: number | string | undefined): void
}>()

const selectedValue = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  }
})
</script>

<template>
  <div class="form-control w-full max-w-xs mb-4">
    <label class="label">
      <span class="label-text">{{ label }}</span>
    </label>
    <select
      class="select-bordered select-info rounded-full select"
      v-model="selectedValue"
    >
      <option
        v-for="option in options"
        :value="option.value"
        :key="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <div v-if="error" class="mt-1 text-error">{{ error }}</div>
  </div>
</template>
