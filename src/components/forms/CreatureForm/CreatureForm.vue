<script setup lang="ts">
import { useForm } from 'vee-validate'
import { computed, ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import { toTypedSchema } from '@vee-validate/zod'
import { useRouter } from 'vue-router'
import slugify from 'slugify'
import { CreatureFormSchema } from '@/schemas/CreatureSchema'
import api from '@/api/api'
import type { CreatureInput } from '@/schemas/CreatureSchema'
import type { AtLeast } from '@/types'
import { ButtonText } from '@/components/ui/buttons'
import { InputField, TextAreaField } from '@/components/ui'
import MediaBlock from './MediaBlock/MediaBlock.vue'
import { useCreatureStore } from '@/stores/creature/creatureStore'

type Props = {
  action: Extract<keyof typeof api.creatures, 'updateCreature' | 'addCreature'>
  defaultValues: AtLeast<CreatureInput, 'categorySlug'>
}

const props = defineProps<Props>()
const { updateCreature } = useCreatureStore()
const isAdding = computed(() => props.action === 'addCreature')
const isLoading = ref(false)
const $toast = useToast({ position: 'top' })
const router = useRouter()
const { errors, defineComponentBinds, handleSubmit, values, setValues } =
  useForm({
    validationSchema: toTypedSchema(CreatureFormSchema),
    initialValues: props.defaultValues
  })

const title = defineComponentBinds('title')
const source = defineComponentBinds('source')
const description = defineComponentBinds('description')
const categorySlug = defineComponentBinds('categorySlug')
const mainImage = defineComponentBinds('mainImage')

const onSubmit = handleSubmit(async (data) => {
  try {
    isLoading.value = true
    const slug =
      data.slug ||
      slugify(`${data.title} ${data.categorySlug}`, { lower: true })
    const newCreature = await api.creatures[props.action]({ ...data, slug })

    updateCreature(newCreature)
    $toast.success(`${data.title} ${isAdding.value ? 'додано' : 'змінено'}!`)
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
  <form @submit="onSubmit" class="flex flex-col items-center w-full">
    <div class="overflow-auto w-full max-w-lg">
      <InputField v-bind="title" label="Ім'я" :error="errors.title" />
      <InputField v-bind="source" label="Джерело" :error="errors.source" />
      <TextAreaField
        v-bind="description"
        label="Опис"
        :error="errors.description"
      />
      <InputField
        v-bind="categorySlug"
        label="Категорія"
        disabled
        :error="errors.categorySlug"
      />
      <InputField
        v-bind="mainImage"
        label="Головне зображення"
        :error="errors.mainImage"
      />
      <MediaBlock
        :media="values.media"
        :main-image="values.mainImage"
        @main-image="(image) => setValues({ mainImage: image })"
        @media="(val) => setValues({ media: val })"
      />
    </div>
    <ButtonText
      class="mt-6"
      :is-loading="isLoading"
      variant="success"
      size="sm"
      type="submit"
    >
      {{ isAdding ? 'Add' : 'Update' }}
    </ButtonText>
  </form>
</template>
