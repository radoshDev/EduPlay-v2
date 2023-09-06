<script setup lang="ts">
import { ButtonText } from '@/components/ui/buttons'
import { supabase } from '@/lib/supabaseClient'

async function githubSignIn() {
  await supabase.auth.signInWithOAuth({
    provider: 'github'
  })
}
</script>

<template>
  <ButtonText variant="neutral" @click="githubSignIn">
    <v-icon name="bi-github" />
    Github
  </ButtonText>
</template>
