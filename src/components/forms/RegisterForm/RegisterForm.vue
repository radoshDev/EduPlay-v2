<script setup lang="ts">
import { useForm } from 'vee-validate'
import { useToast } from 'vue-toast-notification'
import { useRouter } from 'vue-router'
import { toTypedSchema } from '@vee-validate/zod'
import { RegisterSchema } from '@/schemas/AuthSchema'
import { InputField } from '@/components/ui/inputs'
import api from '@/api/api'
import { RouteName } from '@/utils/constants'

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
    await api.register(data)
    $toast.success('Користувача зареєстровано!', {
      onDismiss: () => {
        router.push({ name: RouteName.STUDENTS })
      }
    })
  } catch (_error) {
    const error = _error as Error
    $toast.error(error.message)
  }
})
</script>

<template>
  <form @submit="onSubmit">
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
    <v-btn type="submit" variant="success">Зареєструватись</v-btn>
  </form>
</template>
