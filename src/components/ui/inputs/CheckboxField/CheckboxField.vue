<script setup lang="ts">
import { computed } from 'vue'
import { FieldControl } from '@/components/ui/inputs'
import type { Variant } from '@/types/styles'

type Props = {
  label: string
  modelValue?: boolean
  disabled?: boolean
  error?: string
  color?: Variant
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', val?: boolean): void
}>()

const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  }
})
</script>

<template>
  <FieldControl
    class="flex-row items-center gap-6"
    :label="label"
    :error="error"
  >
    <input
      class="checkbox"
      :class="`checkbox-${color || 'info'}`"
      type="checkbox"
      v-model="inputValue"
      :disabled="disabled"
    />
  </FieldControl>
</template>
