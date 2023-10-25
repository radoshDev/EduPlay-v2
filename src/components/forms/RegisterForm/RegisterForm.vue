<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { useToast } from 'vue-toast-notification'
import { useRouter } from 'vue-router'
import { toTypedSchema } from '@vee-validate/zod'
import { RegisterSchema } from '@/schemas/AuthSchema'
import { FormControl, InputField } from '@/components/ui/inputs'
import api from '@/api/api'
import { RouteName } from '@/utils/constants'

const loading = ref(false)
const router = useRouter()
const $toast = useToast({ position: 'top', duration: 5000 })

const { errors, defineComponentBinds, handleSubmit } = useForm({
  validationSchema: toTypedSchema(RegisterSchema)
})
const name = defineComponentBinds('name')
const email = defineComponentBinds('email')
const pwd = defineComponentBinds('password')

const onSubmit = handleSubmit(async (data) => {
  try {
    loading.value = true
    await api.register(data)
    $toast.success('Користувача зареєстровано!', {
      onDismiss: () => {
        router.push({ name: RouteName.STUDENTS })
      }
    })
  } catch (_error) {
    const error = _error as Error
    $toast.error(error.message)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <FormControl
    @submit="onSubmit"
    button-text="Зареєструватись"
    :loading="loading"
  >
    <InputField label="Ім'я" :error="errors.name" v-bind="name" />
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
