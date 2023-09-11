<script setup lang="ts">
import { computed } from 'vue'
import { FieldControl } from '@/components/ui/inputs'

type Props = {
  label: string
  type?: 'email' | 'number' | 'password'
  modelValue?: string | number
  disabled?: boolean
  error?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', val?: string | number): void
  (e: 'blur'): void
  (e: 'input', val: string): void
}>()

const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    if (newValue && props.type === 'number') {
      newValue = +newValue
    }

    if (typeof newValue === 'string') emit('input', newValue)

    emit('update:modelValue', newValue)
  }
})
</script>

<template>
  <FieldControl :label="label" :error="error">
    <input
      v-model="inputValue"
      :type="type || 'text'"
      :disabled="disabled"
      @blur="$emit('blur')"
      :class="[
        'input-bordered input-info input w-full rounded-full',
        {
          ['input-error']: !!error
        }
      ]"
    />
  </FieldControl>
</template>
