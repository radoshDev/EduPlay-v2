<script setup lang="ts">
import { useForm } from 'vee-validate'
import { computed, ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import { toTypedSchema } from '@vee-validate/zod'
import { useRouter } from 'vue-router'
import { CreatureSchema } from '@/schemas/CreatureSchema'
import api from '@/api/api'
import type { CreatureInput } from '@/schemas/CreatureSchema'
import type { AtLeast } from '@/types'
import { ButtonText } from '@/components/ui/buttons'
import { InputField, TextAreaField } from '@/components/ui'
import MediaBlock from './MediaBlock/MediaBlock.vue'

type Props = {
  action: Extract<keyof typeof api.creatures, 'updateCreature' | 'addCreature'>
  defaultValues: AtLeast<CreatureInput, 'categorySlug'>
}

const props = defineProps<Props>()
const isAdding = computed(() => props.action === 'addCreature')
const isLoading = ref(false)
const $toast = useToast({ position: 'top' })
const router = useRouter()
const { errors, defineComponentBinds, handleSubmit, values, setValues } =
  useForm({
    validationSchema: toTypedSchema(CreatureSchema),
    initialValues: props.defaultValues
  })

const title = defineComponentBinds('title')
const source = defineComponentBinds('source')
const description = defineComponentBinds('description')
const categorySlug = defineComponentBinds('categorySlug')
const imageUrl = defineComponentBinds('imageUrl')

const onSubmit = handleSubmit(async (data) => {
  try {
    isLoading.value = true
    console.log({ data })

    // const newCreature = await api.creatures[props.action](data)

    // router.push('.')
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
        v-bind="imageUrl"
        label="Головне зображення"
        :error="errors.imageUrl"
      />
      <MediaBlock
        :media="values.media"
        :main-image="values.imageUrl"
        @main-image="
          (image) => {
            console.log({ image })

            setValues({ imageUrl: image })
          }
        "
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
