<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { LoginSchema } from '@/schemas/AuthSchema'
import { InputField } from '@/components/ui'
import { ButtonText } from '@/components/ui/buttons'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'vue-router'
import { RouteName } from '@/utils/constants'
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'

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
    await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password
    })

    router.push(RouteName.STUDENTS)
  } catch (error) {
    console.error(error)
    $toast.error('Something went wrong. Try to reload page')
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <form @submit="onSubmit">
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
    <ButtonText :is-loading="isLoading" type="submit" variant="success"
      >Увійти</ButtonText
    >
  </form>
</template>
