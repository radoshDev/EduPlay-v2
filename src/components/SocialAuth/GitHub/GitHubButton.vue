<script setup lang="ts">
import { ButtonText } from '@/components/ui/buttons'
import { supabase } from '@/lib/supabaseClient'

async function githubSignIn() {
  const res = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      scopes: 'repo gist notification'
    }
  })
  console.log({ res })
}
</script>

<template>
  <ButtonText variant="neutral" @click="githubSignIn">
    <v-icon name="bi-github" />
    Github
  </ButtonText>
</template>

<style scoped lang="scss"></style>
