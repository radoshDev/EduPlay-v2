<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { LoginSchema } from '@/schemas/AuthSchema'
import { FormControl, InputField } from '@/components/ui/inputs'
import { useRouter } from 'vue-router'
import { RouteName } from '@/utils/constants'
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import api from '@/api/api'

const isLoading = ref(false)
const $toast = useToast({ position: 'top' })
const router = useRouter()
const { errors, defineComponentBinds, handleSubmit } = useForm({
  validationSchema: toTypedSchema(LoginSchema)
})
const email = defineComponentBinds('email')
const pwd = defineComponentBinds('password')

const onSubmit = handleSubmit(async (data) => {
  try {
    isLoading.value = true

    await api.login(data)

    router.push(RouteName.STUDENTS)
  } catch (_error) {
    const error = _error as Error
    $toast.error(error.message || 'Something went wrong. Try to reload page')
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <FormControl @submit="onSubmit" button-text="Увійти" :loading="isLoading">
    <InputField
      label="Ел. пошта"
      type="email"
      :error="errors.email"
      v-bind="email"
    />
    <InputField
      label="Пароль"
      type="password"
      :error="errors.password"
      v-bind="pwd"
    />
  </FormControl>
</template>
