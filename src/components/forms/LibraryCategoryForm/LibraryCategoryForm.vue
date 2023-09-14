<script setup lang="ts">
import { computed, ref } from 'vue'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import { toTypedSchema } from '@vee-validate/zod'
import slugify from 'slugify'
import api from '@/api/api'
import { FormControl, InputField } from '@/components/ui/inputs'
import {
  type TaskCategoryInput,
  TaskCategoryFormSchema
} from '@/schemas/TaskSchema'
import { useLibraryStore } from '@/stores/library/libraryStore'

type Props = {
  action: 'add' | 'update'
  defaultValues?: Partial<TaskCategoryInput>
}

const props = defineProps<Props>()
const { update } = useLibraryStore()
const isAdding = computed(() => props.action === 'add')
const loading = ref(false)
const $toast = useToast({ position: 'top' })
const router = useRouter()
const { errors, defineComponentBinds, handleSubmit } = useForm({
  validationSchema: toTypedSchema(TaskCategoryFormSchema),
  initialValues: props.defaultValues
})

const title = defineComponentBinds('title')
const imageUrl = defineComponentBinds('imageUrl')
const position = defineComponentBinds('position')

const onSubmit = handleSubmit(async (data) => {
  try {
    loading.value = true
    const slug = data.slug || slugify(data.title, { lower: true })
    const newCategory = await api.library.category(props.action, {
      ...data,
      slug
    })

    update('category', newCategory)
    $toast.success(
      `Категорію "${data.title}" ${isAdding.value ? 'додано' : 'змінено'}!`
    )
    router.push('.')
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
    <InputField v-bind="title" label="Назва" :error="errors.title" />
    <InputField
      v-bind="imageUrl"
      label="URL зображення"
      :error="errors.imageUrl"
    />
    <InputField
      v-bind="position"
      label="Позиція"
      type="number"
      :error="errors.position"
    />
  </FormControl>
</template>
