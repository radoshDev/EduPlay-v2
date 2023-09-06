<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  label: string
  type?: 'email' | 'number' | 'password'
  modelValue?: string | number
  error?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', val?: string | number): void
  (e: 'blur'): void
}>()

const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    if (newValue && props.type === 'number') {
      newValue = +newValue
    }
    emit('update:modelValue', newValue)
  }
})
</script>

<template>
  <div className="form-control mb-4 w-full">
    <label className="label">
      <span className="label-text">{{ label }}</span>
    </label>
    <input
      :type="type || 'text'"
      v-model="inputValue"
      @blur="$emit('blur')"
      :class="[
        'input-bordered input-info input w-full rounded-full',
        {
          ['input-error']: !!error
        }
      ]"
    />
    <div v-if="error" className="mt-1 text-error">{{ error }}</div>
  </div>
</template>
