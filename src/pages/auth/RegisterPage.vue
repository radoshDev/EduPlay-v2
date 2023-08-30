<script setup lang="ts">
import { SocialAuth } from '@/components'
import { RegisterForm } from '@/components/forms'
import PageLayout from '@/components/layouts/PageLayout.vue'
import { PageTitle } from '@/components/ui'
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle title="Registration" back-href="/" />
    </template>
    <div class="w-full max-w-md">
      <RegisterForm />
      <div class="divider">or</div>
      <SocialAuth />
      <div class="mt-5">
        <span class="mr-2">Вже маєте акаунт?</span>
        <RouterLink to="/login" class="link-primary link">Увійти</RouterLink>
      </div>
    </div>
  </PageLayout>
</template>
