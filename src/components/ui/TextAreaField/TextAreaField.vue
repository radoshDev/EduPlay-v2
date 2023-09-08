<script setup lang="ts">
import { computed } from 'vue'
import { FormControl } from '..'

type Props = {
  label: string
  modelValue?: string
  error?: string
  rows?: number
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', val?: string): void
  (e: 'blur'): void
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
  <FormControl :label="label" :error="error">
    <textarea
      v-model="inputValue"
      :rows="rows"
      @blur="$emit('blur')"
      :class="[
        'textarea-bordered textarea-info textarea h-24 resize-none',
        { 'textarea-error': !!error }
      ]"
    />
  </FormControl>
</template>
