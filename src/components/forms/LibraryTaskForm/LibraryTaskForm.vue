<script setup lang="ts">
import { computed, ref } from 'vue'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import { toTypedSchema } from '@vee-validate/zod'
import api from '@/api/api'
import { CheckboxField, FormControl, InputField } from '@/components/ui/inputs'
import { type TaskForm, TaskFormSchema } from '@/schemas/TaskSchema'
import { useLibraryStore } from '@/stores/library/libraryStore'
import type { AtLeast } from '@/types'

type Props = {
  action: 'add' | 'update'
  defaultValues: AtLeast<TaskForm, 'subcategorySlug' | 'type'>
}

const props = defineProps<Props>()
const { update } = useLibraryStore()
const isAdding = computed(() => props.action === 'add')
const loading = ref(false)
const stayHere = ref(false)
const $toast = useToast({ position: 'top' })
const router = useRouter()
const { errors, defineComponentBinds, handleSubmit } = useForm({
  validationSchema: toTypedSchema(TaskFormSchema),
  initialValues: props.defaultValues
})

const value = defineComponentBinds('value')
const result = defineComponentBinds('result')
const type = defineComponentBinds('type')
const subcategorySlug = defineComponentBinds('subcategorySlug')

const onSubmit = handleSubmit(async (data) => {
  try {
    loading.value = true

    const task = await api.library.task(props.action, data)

    update('task', task)
    $toast.success(
      `Завдання "${task.value}" ${isAdding.value ? 'додано' : 'змінено'}!`
    )
    if (!stayHere.value) router.push('.')
  } catch (_error) {
    const error = _error as Error
    $toast.error(error.message || 'Something went wrong. Try to reload page')
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <FormControl
    @submit="onSubmit"
    :button-text="isAdding ? 'Додати' : 'Оновити'"
    :loading="loading"
  >
    <InputField v-bind="value" label="Завдання" :error="errors.value" />
    <InputField v-bind="result" label="Результат" :error="errors.result" />
    <InputField v-bind="type" label="Категорія" :error="errors.type" disabled />
    <InputField
      v-bind="subcategorySlug"
      label="Підкатегорія"
      :error="errors.subcategorySlug"
      disabled
    />
    <CheckboxField
      label="Залишитись після додавання?"
      v-model="stayHere"
      color="warning"
    />
  </FormControl>
</template>
