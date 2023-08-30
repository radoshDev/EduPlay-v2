<script setup lang="ts">
import SocialAuth from '@/components/SocialAuth/SocialAuth.vue'
import { LoginForm } from '@/components/forms'
import PageLayout from '@/components/layouts/PageLayout.vue'
import { PageTitle } from '@/components/ui'
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle title="Вхід" back-href="/" />
    </template>
    <div class="w-full max-w-md">
      <LoginForm />
      <div class="divider">чи</div>
      <SocialAuth />
      <div class="mt-5">
        <span class="mr-2">Немає акауту?</span>
        <RouterLink to="/register" class="link-primary link">Реєстрація</RouterLink>
      </div>
    </div>
  </PageLayout>
</template>
