<script setup lang="ts">
type Props = {
  label: string
  type?: 'email' | 'number' | 'password'
  modelValue?: string
  error?: string
}

defineProps<Props>()
defineEmits<{
  (e: 'update:modelValue', val: string): void
  (e: 'blur'): void
}>()
</script>

<template>
  <div className="form-control mb-4 w-full">
    <label className="label">
      <span className="label-text">{{ label }}</span>
    </label>
    <input
      :type="type || 'text'"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
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

<style scoped lang="scss"></style>
