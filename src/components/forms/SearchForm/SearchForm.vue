<script setup lang="ts">
import { FormControl, InputField } from '@/components/ui/inputs'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { SearchSchema } from '@/schemas/SearchSchema'
import { useRouter } from 'vue-router'

defineProps<{ row?: boolean }>()

const router = useRouter()
const { errors, defineComponentBinds, handleSubmit } = useForm({
  validationSchema: toTypedSchema(SearchSchema)
})

const search = defineComponentBinds('search')

const onSubmit = handleSubmit((data) => {
  router.push({ name: 'search', query: { q: data.search } })
})
</script>

<template>
  <FormControl @submit="onSubmit" button-text="Пошук" :row="row">
    <InputField v-bind="search" label="Запит" :error="errors.search" />
  </FormControl>
</template>
