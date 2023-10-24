<script setup lang="ts">
import { FormControl, InputField } from '@/components/ui/inputs'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { SearchSchema } from '@/schemas/SearchSchema'
import { useRouter } from 'vue-router'
import { useLibraryStoreValues } from '@/stores/library/libraryStore'

defineProps<{ row?: boolean }>()

const { search } = useLibraryStoreValues()
const router = useRouter()
const { errors, defineComponentBinds, handleSubmit } = useForm({
  validationSchema: toTypedSchema(SearchSchema),
  initialValues: { search: search.value }
})

const searchComponent = defineComponentBinds('search')

const onSubmit = handleSubmit((data) => {
  search.value = data.search
  router.push({ name: 'search', query: { q: data.search } })
})
</script>

<template>
  <FormControl @submit="onSubmit" button-text="Пошук" :row="row">
    <InputField
      v-bind="searchComponent"
      :label="row ? '' : 'Запит'"
      :error="errors.search"
    />
  </FormControl>
</template>
