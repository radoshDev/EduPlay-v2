<script setup lang="ts">
import PageLayout from '@/components/layouts/PageLayout.vue'
import PageTitle from '@/components/ui/PageTitle/PageTitle.vue'
import ButtonText from '@/components/ui/buttons/ButtonText/ButtonText.vue'
import { useUserStoreValues } from '@/stores/user/userStore'

const { user } = useUserStoreValues()
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle title="EduPlay: Learn & Earn Coins">
        <template v-if="!user" #right-action>
          <ButtonText size="sm" variant="success" href="/login">
            Увійти
          </ButtonText>
        </template>
      </PageTitle>
    </template>
    <div className="flex flex-1 items-center justify-center">
      <ButtonText
        size="lg"
        variant="primary"
        :href="user ? '/students' : '/education/unknown/coins'"
      >
        До занять
      </ButtonText>
    </div>
  </PageLayout>
</template>
