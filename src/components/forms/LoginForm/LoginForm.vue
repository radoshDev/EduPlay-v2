<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { LoginSchema } from '@/schemas/AuthSchema'
import { InputField } from '@/components/ui'
import { ButtonText } from '@/components/ui/buttons'
import { supabase } from '@/lib/supabaseClient'

const { errors, defineComponentBinds, handleSubmit } = useForm({
  validationSchema: toTypedSchema(LoginSchema)
})
const email = defineComponentBinds('email')
const pwd = defineComponentBinds('password')

const onSubmit = handleSubmit(async (data) => {
  console.log({ data })
  const res = await supabase.auth.signInWithPassword({ email: data.email, password: data.password })
  console.log({ res })
})
</script>

<template>
  <form @submit="onSubmit">
    <InputField label="Ел. пошта" type="email" :error="errors.email" v-bind="email" />
    <InputField label="Пароль" type="password" :error="errors.password" v-bind="pwd" />
    <ButtonText type="submit" variant="success">Увійти</ButtonText>
  </form>
</template>
