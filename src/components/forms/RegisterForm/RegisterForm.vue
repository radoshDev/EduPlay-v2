<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { RegisterSchema } from '@/schemas/AuthSchema'
import { InputField } from '@/components/ui'
import { ButtonText } from '@/components/ui/buttons'

const { errors, defineComponentBinds, handleSubmit } = useForm({
  validationSchema: toTypedSchema(RegisterSchema)
})
const name = defineComponentBinds('name')
const email = defineComponentBinds('email')
const pwd = defineComponentBinds('password')

const onSubmit = handleSubmit((data) => {
  console.log({ data })
})
</script>

<template>
  <form @submit="onSubmit">
    <InputField label="Name" :error="errors.name" v-bind="name" />
    <InputField label="Email" type="email" :error="errors.email" v-bind="email" />
    <InputField label="Password" type="password" :error="errors.password" v-bind="pwd" />
    <ButtonText type="submit" variant="success">Зареєструватись</ButtonText>
  </form>
</template>
