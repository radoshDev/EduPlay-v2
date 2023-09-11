<script setup lang="ts">
import { computed } from 'vue'
import { FieldControl } from '@/components/ui/inputs'

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
  <FieldControl class="max-w-xs" :label="label" :error="error">
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
  </FieldControl>
</template>
