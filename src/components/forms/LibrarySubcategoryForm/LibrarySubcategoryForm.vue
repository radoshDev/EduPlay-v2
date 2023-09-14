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
  type TaskSubcategoryInput,
  TaskSubcategoryFormSchema
} from '@/schemas/TaskSchema'
import { useLibraryStore } from '@/stores/library/libraryStore'
import type { AtLeast } from '@/types'

type Props = {
  action: 'add' | 'update'
  defaultValues: AtLeast<TaskSubcategoryInput, 'parentSlug'>
}

const props = defineProps<Props>()
const { update } = useLibraryStore()
const isAdding = computed(() => props.action === 'add')
const loading = ref(false)
const $toast = useToast({ position: 'top' })
const router = useRouter()
const { errors, defineComponentBinds, handleSubmit } = useForm({
  validationSchema: toTypedSchema(TaskSubcategoryFormSchema),
  initialValues: props.defaultValues
})

const title = defineComponentBinds('title')
const imageUrl = defineComponentBinds('imageUrl')
const parentSlug = defineComponentBinds('parentSlug')
const difficulty = defineComponentBinds('difficulty')
const position = defineComponentBinds('position')

const onSubmit = handleSubmit(async (data) => {
  try {
    loading.value = true
    const slug = data.slug || slugify(data.title, { lower: true })
    const newSubcategory = await api.library.subcategory(props.action, {
      ...data,
      slug
    })

    update('subcategory', newSubcategory)
    $toast.success(
      `Підкатегорію "${data.title}" ${isAdding.value ? 'додано' : 'змінено'}!`
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
      v-bind="parentSlug"
      label="Parent slug"
      :error="errors.parentSlug"
      disabled
    />
    <InputField
      v-bind="difficulty"
      label="Складність"
      type="number"
      :error="errors.difficulty"
    />
    <InputField
      v-bind="position"
      label="Позиція"
      type="number"
      :error="errors.position"
    />
  </FormControl>
</template>
