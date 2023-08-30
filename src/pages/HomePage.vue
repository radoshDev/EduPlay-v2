<script setup lang="ts">
import PageLayout from '@/components/layouts/PageLayout.vue'
import PageTitle from '@/components/ui/PageTitle/PageTitle.vue'
import ButtonText from '@/components/ui/buttons/ButtonText/ButtonText.vue'
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle title="EduPlay: Learn & Earn Coins">
        <template #right-action>
          <ButtonText size="sm" variant="success" href="/login">Увійти</ButtonText>
        </template>
      </PageTitle>
    </template>
    <div className="flex flex-1 items-center justify-center">
      <ButtonText size="lg" variant="primary" href="/education/unknown/coins">
        До занять
      </ButtonText>
    </div>
  </PageLayout>
</template>
