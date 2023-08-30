<script setup lang="ts">
import { ButtonText } from '@/components/ui/buttons'

function githubSignIn() {
  console.log('Try to sign in with GitHub')
}
</script>

<template>
  <ButtonText variant="neutral" @click="githubSignIn">
    <v-icon name="bi-github" />
    Github
  </ButtonText>
</template>

<style scoped lang="scss"></style>
