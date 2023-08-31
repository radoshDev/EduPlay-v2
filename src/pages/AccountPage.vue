<script setup lang="ts">
import PageLayout from '@/components/layouts/PageLayout.vue'
import { PageTitle } from '@/components/ui'
import { ButtonLogout, ButtonText } from '@/components/ui/buttons'
import { useUserStore } from '@/stores/user/userStore'
const { user } = useUserStore()
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle title="Акаунт" back-href="/students">
        <template #right-action>
          <ButtonLogout />
        </template>
      </PageTitle>
    </template>
    <div className="flex w-full flex-col items-center">
      <div className="flex flex-col gap-3">
        <div>
          <span>{{ user?.name || user?.email }}</span>
          <div v-if="user?.isAdmin" className="badge badge-accent ml-2">
            admin
          </div>
        </div>
        <ButtonText size="sm" variant="neutral" href="/creatures">
          Істоти
        </ButtonText>
        <ButtonText size="sm" variant="warning" href="/library">
          Бібліотека
        </ButtonText>
      </div>
    </div>
  </PageLayout>
</template>
