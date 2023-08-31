<script setup lang="ts">
import { useForm } from 'vee-validate'
import { useToast } from 'vue-toast-notification'
import { toTypedSchema } from '@vee-validate/zod'
import { RegisterSchema } from '@/schemas/AuthSchema'
import { InputField } from '@/components/ui'
import { ButtonText } from '@/components/ui/buttons'
import api from '@/api/api'

const $toast = useToast({ position: 'top', duration: 5000 })

const { errors, defineComponentBinds, handleSubmit } = useForm({
  validationSchema: toTypedSchema(RegisterSchema)
})
const name = defineComponentBinds('name')
const email = defineComponentBinds('email')
const pwd = defineComponentBinds('password')

const onSubmit = handleSubmit(async (data) => {
  try {
    console.log({ data })
    await api.register(data)
    $toast.success('Користувача зареєстровано!')
  } catch (_error) {
    const error = _error as Error
    $toast.error(error.message)
  }
})
</script>

<template>
  <form @submit="onSubmit">
    <InputField label="Ім'я" :error="errors.name" v-bind="name" />
    <InputField label="Ел. пошта" type="email" :error="errors.email" v-bind="email" />
    <InputField label="Пароль" type="password" :error="errors.password" v-bind="pwd" />
    <ButtonText type="submit" variant="success">Зареєструватись</ButtonText>
  </form>
</template>
