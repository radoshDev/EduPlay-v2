<script setup lang="ts">
import { computed, ref } from 'vue'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import { toTypedSchema } from '@vee-validate/zod'
import slugify from 'slugify'
import { useCreatureStore } from '@/stores/creature/creatureStore'
import api from '@/api/api'
import {
  CreatureCategoryFormSchema,
  type CreatureCategoryInput
} from '@/schemas/CreatureSchema'
import { FormControl, InputField, TextAreaField } from '@/components/ui/inputs'

type Props = {
  action: Extract<keyof typeof api.creatures, 'updateCategory' | 'addCategory'>
  defaultValues?: Partial<CreatureCategoryInput>
}

const { updateCategory } = useCreatureStore()
const props = defineProps<Props>()
const isAdding = computed(() => props.action === 'addCategory')
const isLoading = ref(false)
const $toast = useToast({ position: 'top' })
const router = useRouter()
const { errors, defineComponentBinds, handleSubmit } = useForm({
  validationSchema: toTypedSchema(CreatureCategoryFormSchema),
  initialValues: props.defaultValues
})

const title = defineComponentBinds('title')
const sourceLink = defineComponentBinds('sourceLink')
const description = defineComponentBinds('description')
const imageUrl = defineComponentBinds('imageUrl')

const onSubmit = handleSubmit(async (data) => {
  try {
    isLoading.value = true
    const slug = data.slug || slugify(data.title, { lower: true })
    const newCategory = await api.creatures[props.action]({ ...data, slug })

    $toast.success(
      `Категорію "${data.title}" ${isAdding.value ? 'додано' : 'змінено'}!`
    )
    updateCategory(newCategory)
    router.push('.')
  } catch (_error) {
    const error = _error as Error
    $toast.error(error.message || 'Something went wrong. Try to reload page')
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <FormControl
    @submit="onSubmit"
    :button-text="isAdding ? 'Додати' : 'Оновити'"
    :is-loading="isLoading"
  >
    <InputField v-bind="title" label="Назва" :error="errors.title" />
    <InputField
      v-bind="sourceLink"
      label="Джерело"
      :error="errors.sourceLink"
    />
    <TextAreaField
      v-bind="description"
      label="Опис"
      :error="errors.description"
    />
    <InputField
      v-bind="imageUrl"
      label="URL зображення"
      :error="errors.imageUrl"
    />
  </FormControl>
</template>
